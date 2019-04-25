<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">
                <el-form-item class=".filters-items-25">
                    <el-input
                        type="text"
                        v-model="filters.goodsName"
                        :placeholder="$t('stockIn.goodsName')"></el-input>
                </el-form-item>
                <el-form-item class=".filters-items-25">
                    <el-input
                        type="text"
                        v-model="filters.goodsType"
                        :placeholder="$t('stockIn.goodsType')"></el-input>
                </el-form-item>
                <el-form-item class=".filters-items-25">
                    <el-input
                        type="text"
                        v-model="filters.goodsColor"
                        :placeholder="$t('stockIn.goodsColor')"></el-input>
                </el-form-item>
                <el-form-item class="filters-button">
                    <el-button type="primary" v-on:click="handleSearch">{{$t('common.search')}}</el-button>
                </el-form-item>
                <el-form-item v-if="user && 1== user.userType" class="filters-button">
                    <el-button type="primary" @click="preCreate">{{$t('common.create')}}</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <!--列表-->
        <el-table
            :data="goods"
            highlight-current-row="highlight-current-row"
            v-loading="listLoading"
            @selection-change="selsChange"
            style="width: 100%;">
            <el-table-column prop="goodsName" :label="$t('stockIn.goodsName')" width="170"></el-table-column>
            <el-table-column prop="goodsPic" :label="$t('common.preview')" width="120">
                <template slot-scope="scope">
                    <el-button
                        @click="previewPic(scope.row)"
                        type="warning"
                        class="fa fa-search-plus"
                        circle="circle"></el-button>
                    <el-dialog
                        :visible.sync="dialogListPicVisible"
                        :close-on-click-modal="true"
                        :close-on-press-escape="true"
                        :show-close="false">
                        <img class="listPic" :src="dialogListPicUrl" alt=""></el-dialog>
                    </template>
                </el-table-column>
                <el-table-column prop="goodsNums" :label="$t('stockIn.goodsNums')" width="120"></el-table-column>
                <el-table-column prop="goodsType" :label="$t('stockIn.goodsType')" width="120"></el-table-column>
                <el-table-column
                    prop="goodsColor"
                    :label="$t('stockIn.goodsColor')"
                    width="120"></el-table-column>
                <el-table-column
                    prop="goodsPrice"
                    :formatter="formatPrice"
                    :label="$t('stockIn.goodsPrice')"
                    width="160"></el-table-column>
                <el-table-column
                    prop="goodsUsePoints"
                    :formatter="formatUsePoints"
                    :label="$t('stockIn.usePoints')"
                    width="120"></el-table-column>
                <el-table-column
                    v-if="user && 1== user.userType"
                    prop="goodsInPrice"
                    :formatter="formatPrice"
                    :label="$t('stockIn.goodsInPrice')"
                    width="160"></el-table-column>
                <el-table-column
                    v-if="user && 1== user.userType"
                    prop="goodsFrom"
                    :label="$t('stockIn.goodsFrom')"
                    width="180"></el-table-column>
                <el-table-column
                    v-if="user && 1== user.userType"
                    :label="$t('common.operation')"
                    width="240">
                    <template slot-scope="scope">
                        <el-button
                            type="primary"
                            size="mini"
                            icon="fa fa-edit"
                            width="100"
                            @click="setCurrent(scope.row)">
                            {{$t('common.edit')}}</el-button>
                        <el-button
                            type="danger"
                            size="mini"
                            width="100"
                            icon="fa fa-trash-o"
                            @click="preDelete(scope.row)">
                            {{$t('common.delete')}}</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <!--工具条-->
            <el-col :span="24" class="toolbar">
                <el-pagination
                    layout="total, prev, pager, next"
                    @current-change="handleCurrentChange"
                    :page-size="this.limit"
                    :total="total"
                    style="float:right;"
                    :current-page="this.page"></el-pagination>
            </el-col>

            <!-- Dialog提示-->
            <el-dialog
                :title="$t('stockIn.create')"
                :visible="dialogCreateVisible"
                :close-on-click-modal="false"
                :close-on-press-escape="false"
                :show-close="false">
                <el-form
                    id="#create"
                    :model="create"
                    :rules="createRules"
                    ref="create"
                    label-width="100px">
                    <el-form-item :label="$t('stockIn.goodsName')" prop="goodsName">
                        <el-input v-model="create.goodsName" type="text"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('stockIn.goodsType')" prop="goodsType">
                        <el-input v-model="create.goodsType" type="text"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('stockIn.goodsColor')" prop="goodsColor">
                        <el-input v-model="create.goodsColor" type="text"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('stockIn.goodsInPrice')" prop="goodsInPrice">
                        <el-input v-model="create.goodsInPrice" type="text">
                            <template slot="append">¥</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item :label="$t('stockIn.goodsPrice')" prop="goodsPrice">
                        <el-input v-model="create.goodsPrice" type="text">
                            <template slot="append">¥</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item :label="$t('stockIn.goodsFrom')" prop="goodsFrom">
                        <el-input v-model="create.goodsFrom" type="text"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('stockIn.goodsNums')" prop="goodsNums">
                        <el-input-number v-model="create.goodsNums" :min="0" type="number"></el-input-number>
                    </el-form-item>
                    <el-form-item :label="$t('stockIn.usePoints')" prop="goodsUsePoints">
                        <el-radio v-model="create.goodsUsePoints" :label="0">{{$t('common.yes')}}</el-radio>
                        <el-radio v-model="create.goodsUsePoints" :label="1">{{$t('common.no')}}</el-radio>
                    </el-form-item>
                    <el-form-item :label="$t('common.preview')">
                        <el-upload
                            ref='createWithPic'
                            :on-preview="handlePictureCardPreview"
                            :before-upload="createWithPic"
                            :on-change="changeFile"
                            action=""
                            list-type="picture-card"
                            :auto-upload="false"
                            :limit="1">
                            <i class="el-icon-plus"></i>
                        </el-upload>

                        <el-dialog :visible.sync="dialogVisible">
                            <img class="listPic" :src="dialogImageUrl" alt=""></el-dialog>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogCreateVisible =
        false">{{$t('common.cancel')}}</el-button>
                        <el-button type="primary" :loading="createLoading" @click="createGoods">{{$t('common.confirm')}}
                        </el-button>
                    </div>
                </el-dialog>

                <el-dialog
                    :title="$t('stockIn.update')"
                    :visible.sync="dialogUpdateVisible"
                    :close-on-click-modal="false"
                    :close-on-press-escape="false">
                    <el-form
                        id="#update"
                        :model="update"
                        :rules="createRules"
                        ref="update"
                        label-width="100px">
                        <el-form-item :label="$t('stockIn.goodsName')" prop="goodsName">
                            <el-input v-model="update.goodsName" type="text"></el-input>
                        </el-form-item>
                        <el-form-item :label="$t('stockIn.goodsType')" prop="goodsType">
                            <el-input v-model="update.goodsType" type="text"></el-input>
                        </el-form-item>
                        <el-form-item :label="$t('stockIn.goodsColor')" prop="goodsColor">
                            <el-input v-model="update.goodsColor" type="text"></el-input>
                        </el-form-item>
                        <el-form-item :label="$t('stockIn.goodsInPrice')" prop="goodsInPrice">
                            <el-input v-model="update.goodsInPrice" type="text">
                                <template slot="append">¥</template>
                            </el-input>
                        </el-form-item>
                        <el-form-item :label="$t('stockIn.goodsPrice')" prop="goodsPrice">
                            <el-input v-model="update.goodsPrice" type="text">
                                <template slot="append">¥</template>
                            </el-input>
                        </el-form-item>
                        <el-form-item :label="$t('stockIn.goodsFrom')" prop="goodsFrom">
                            <el-input v-model="update.goodsFrom" type="text"></el-input>
                        </el-form-item>
                        <el-form-item :label="$t('stockIn.goodsNums')" prop="goodsNums">
                            <el-input-number v-model="update.goodsNums" :min="0" type="number"></el-input-number>
                        </el-form-item>
                        <el-form-item :label="$t('stockIn.usePoints')" prop="goodsUsePoints">
                            <el-radio v-model="update.goodsUsePoints" :label="0">{{$t('common.yes')}}</el-radio>
                            <el-radio v-model="update.goodsUsePoints" :label="1">{{$t('common.no')}}</el-radio>
                        </el-form-item>
                        <el-form-item :label="$t('common.preview')">
                            <el-upload
                                ref='updateWithPic'
                                :on-preview="handlePictureCardPreview"
                                :before-upload="updateWithPic"
                                :on-change="changeFile"
                                action=""
                                :file-list="updateFiles"
                                list-type="picture-card"
                                :auto-upload="false"
                                :limit="1">
                                <i class="el-icon-plus"></i>
                            </el-upload>

                            <el-dialog :visible.sync="dialogVisible">
                                <img class="listPic" :src="dialogImageUrl" alt=""></el-dialog>
                            </el-form-item>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="dialogUpdateVisible = false">{{$t('common.cancel')}}</el-button>
                            <el-button type="primary" :loading="updateLoading" @click="updateGoods">{{$t('common.confirm')}}
                            </el-button>
                        </div>
                    </el-dialog>

                    <el-dialog
                        :title="$t('stockIn.delete')"
                        :visible.sync="dialogDeleteVisible"
                        :close-on-click-modal="false"
                        :close-on-press-escape="false">
                        <span>{{$t('stockIn.deleteGoods')}}</span>
                        <span slot="footer" class="dialog-footer">
                            <el-button @click="dialogDeleteVisible = false">{{$t('common.cancel')}}</el-button>
                            <el-button type="primary" @click="deleteGoods">{{$t('common.confirm')}}</el-button>
                        </span>
                    </el-dialog>

                </section>
            </template>

            <script>
                //import NProgress from 'nprogress'
                import stockIn from '../../api/stockIn/stockIn';
                import commConst from '../../constants/commConst';
                import util from '../../common/js/util';

                export default {
                    data() {
                        return {
                            filters: {
                                goodsId: '',
                                goodsName: '',
                                goodsType: '',
                                goodsColor: ''
                            },
                            create: {
                                goodsName: '',
                                goodsType: '',
                                goodsColor: '',
                                goodsPic: {},
                                goodsFrom: '',
                                goodsPrice: '',
                                goodsInPrice: '',
                                goodsNums: 0,
                                goodsUsePoints: 0
                            },
                            update: {
                                goodsId: '',
                                goodsName: '',
                                goodsType: '',
                                goodsColor: '',
                                goodsPic: {},
                                goodsFrom: '',
                                goodsPrice: '',
                                goodsInPrice: '',
                                goodsNums: 0,
                                goodsUsePoints: 0
                            },
                            deleteGoodsId: '',
                            createRules: {
                                goodsName: [
                                    {
                                        required: true,
                                        message: this.$t('stockInRules.goodsNameNotNull'),
                                        trigger: 'blur'
                                    }
                                ],
                                goodsPrice: [
                                    {
                                        required: true,
                                        message: this.$t('stockInRules.goodsPriceNotNull'),
                                        trigger: 'blur'
                                    }, {
                                        validator: this.isPrice,
                                        trigger: 'blur',
                                        message: this.$t('stockInRules.goodsPriceRegex')
                                    }
                                ],
                                goodsInPrice: [
                                    {
                                        required: true,
                                        message: this.$t('stockInRules.goodsInPriceNotNull'),
                                        trigger: 'blur'
                                    }, {
                                        validator: this.isPrice,
                                        trigger: 'blur',
                                        message: this.$t('stockInRules.goodsInPriceRegex')
                                    }
                                ]
                            },
                            user: JSON.parse(sessionStorage.getItem('user')),
                            goods: [],
                            total: 0,
                            page: 1,
                            listLoading: false,
                            createLoading: false,
                            updateLoading: false,
                            dialogCreateVisible: false,
                            dialogUpdateVisible: false,
                            dialogVisible: false,
                            dialogListPicVisible: false,
                            dialogListPicUrl: '',
                            deleteLoading: false,
                            dialogDeleteVisible: false,
                            dialogImageUrl: '',
                            limit: 5,
                            updateFiles: [],
                            sels: [] //列表选中列
                        }
                    },
                    methods: {
                        handleCurrentChange(val) {
                            this.page = val;
                            this.getGoods();
                        },
                        selsChange: function (sels) {
                            this.sels = sels;
                        },
                        handleSearch() {
                            this.total = 0;
                            this.page = 1;
                            this.getGoods();
                        },
                        setCurrent(row) {
                            let that = this
                            that.update = row;
                            that.update.goodsPrice = util.formatPrice(row.goodsPrice)
                            that.update.goodsInPrice = util.formatPrice(row.goodsInPrice)
                            that.dialogUpdateVisible = true;
                            that.updateLoading = false;
                            that.updateFiles = []
                            if (row.goodsPic) {
                                that.updateFiles = [
                                    {
                                        name: "",
                                        url: "data:image/jpeg;base64," + row.goodsPic
                                    }
                                ]
                            }
                        },
                        preDelete(row) {
                            let that = this
                            that.dialogDeleteVisible = true;
                            that.deleteLoading = false;
                            that.deleteGoodsId = row.goodsId;
                        },
                        reset() {
                            this
                                .$refs
                                .create
                                .resetFields();
                        },
                        preCreate() {
                            this.dialogCreateVisible = true;
                            this.createLoading = false;
                            this.dialogImageUrl = '';
                        },
                        getGoods() {
                            let that = this;
                            let para = {
                                page: that.page,
                                limit: that.limit,
                                goodsId: that.filters.goodsId,
                                goodsName: that.filters.goodsName,
                                goodsType: that.filters.goodsType,
                                goodsColor: that.filters.goodsColor
                            };
                            that.listLoading = true;
                            stockIn
                                .queryGoods(para)
                                .then(function (result) {
                                    that.listLoading = false;
                                    if (result) {
                                        that.total = result.total;
                                        that.goods = result.list;
                                    }
                                }, function (err) {
                                    that.listLoading = false;
                                    that
                                        .$message
                                        .error({showClose: true, message: err.response.data, duration: 2000});
                                });
                        },
                        createGoods() {
                            let that = this;
                            if ('' == that.dialogImageUrl) {
                                that.createWithPic(null);
                            } else {
                                that
                                    .$refs
                                    .createWithPic
                                    .submit();
                            }
                        },
                        updateGoods() {
                            let that = this;
                            if ('' == that.dialogImageUrl) {
                                that.updateWithPic(null);
                            } else {
                                that
                                    .$refs
                                    .updateWithPic
                                    .submit();
                            }
                        },
                        formatPrice(row, column, value) {
                            return util.formatPrice(value)
                        },
                        formatUsePoints(row, column, value) {
                            return util.formatUsePoints(this, value)
                        },
                        isPrice(rule, value, callback) {
                            var regPrice = /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/;
                            if (!regPrice.test(value)) {
                                return callback(new Error());
                            }
                            return callback();
                        },
                        handlePictureCardPreview(file) {
                            this.dialogVisible = true;
                        },
                        changeFile(file) {
                            this.dialogImageUrl = file.url;
                        },
                        createWithPic(file) {
                            let that = this
                            const formData = new FormData()
                            if (null != file) {

                                const isJPG = file.type === 'image/jpeg';
                                const isLt2M = file.size / 1024 / 1024 < 2;

                                if (!isJPG) {
                                    that
                                        .$message
                                        .error(that.$t('error.picJPGOnly'));
                                    return false;
                                }
                                if (!isLt2M) {
                                    that
                                        .$message
                                        .error(that.$t('error.picLessThanTwo'));
                                    return false;
                                }
                                formData.append('file', file)
                            }

                            Object
                                .keys(that.create)
                                .forEach(key => {
                                    let value = that.create[key]
                                    if ('goodsPrice' == key || 'goodsInPrice' == key) {
                                        value = that.create[key] * 100
                                    }
                                    formData.append(key, value)
                                })

                            that
                                .$refs
                                .create
                                .validate((valid) => {
                                    if (valid) {
                                        that.createLoading = true;
                                        stockIn
                                            .createGoods(formData)
                                            .then(res => {
                                                that
                                                    .$message
                                                    .success(that.$t('common.createSuccess'));
                                                that.dialogCreateVisible = false;
                                                that.createLoading = false;
                                                that.reset();
                                                that.handleSearch();
                                            })
                                            .catch((res) => {
                                                that
                                                    .$message
                                                    .error(res.response.data);
                                                that.createLoading = false;
                                            });
                                    } else {
                                        return false;
                                    }
                                });
                        },
                        previewPic(row) {
                            this.dialogListPicVisible = true;
                            if (row.goodsPic) {
                                this.dialogListPicUrl = "data:image/jpeg;base64," + row.goodsPic;
                            } else {
                                this.dialogListPicUrl = commConst.notFoundPic
                            }
                        },
                        updateWithPic(file) {
                            let that = this
                            const formData = new FormData()
                            if (null != file) {

                                const isJPG = file.type === 'image/jpeg';
                                const isLt2M = file.size / 1024 / 1024 < 2;

                                if (!isJPG) {
                                    that
                                        .$message
                                        .error(that.$t('error.picJPGOnly'));
                                    return false;
                                }
                                if (!isLt2M) {
                                    that
                                        .$message
                                        .error(that.$t('error.picLessThanTwo'));
                                    return false;
                                }
                                formData.append('file', file)
                            }

                            Object
                                .keys(that.update)
                                .forEach(key => {
                                    let value = that.update[key]
                                    if ('goodsPrice' == key || 'goodsInPrice' == key) {
                                        value = that.update[key] * 100
                                    }
                                    formData.append(key, value)
                                })

                            that
                                .$refs
                                .update
                                .validate((valid) => {
                                    if (valid) {
                                        that.updateLoading = true;
                                        stockIn
                                            .updateGoods(formData)
                                            .then(res => {
                                                that
                                                    .$message
                                                    .success(that.$t('common.updateSuccess'));
                                                that.dialogUpdateVisible = false;
                                                that.updateLoading = false;
                                                that.handleSearch();
                                            })
                                            .catch((res) => {
                                                that
                                                    .$message
                                                    .error(res.response.data);
                                                that.updateLoading = false;
                                            });
                                    } else {
                                        return false;
                                    }
                                });
                        },
                        deleteGoods() {
                            let that = this
                            that.deleteLoading = true;
                            let param = {
                                'goodsId': that.deleteGoodsId
                            }
                            stockIn
                                .deleteGoods(param)
                                .then(res => {
                                    that
                                        .$message
                                        .success(that.$t('common.deleteSuccess'));
                                    that.dialogDeleteVisible = false;
                                    that.deleteLoading = false;
                                    that.deleteGoodsId = '';
                                    that.handleSearch();
                                })
                                .catch((res) => {
                                    that
                                        .$message
                                        .error(res.response.data);
                                    that.deleteLoading = false;
                                    that.deleteGoodsId = '';
                                });
                        }
                    },
                    mounted() {
                        this.getGoods();
                    }
                }
            </script>