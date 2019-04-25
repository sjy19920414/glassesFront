<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">
                <el-form-item class=".filters-items-25">
                    <el-input
                        type="text"
                        v-model="filters.vipName"
                        :placeholder="$t('vip.vipName')"></el-input>
                </el-form-item>
                <el-form-item class=".filters-items-25">
                    <el-input
                        type="text"
                        v-model="filters.vipPhone"
                        :placeholder="$t('vip.vipPhone')"></el-input>
                </el-form-item>
                <el-form-item class="filters-button">
                    <el-button type="primary" v-on:click="handleSearch">{{$t('common.search')}}</el-button>
                </el-form-item>
                <el-form-item class="filters-button">
                    <el-button type="primary" @click="preCreate">{{$t('common.create')}}</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <!--列表-->
        <el-table
            :data="vip"
            highlight-current-row="highlight-current-row"
            v-loading="listLoading"
            @selection-change="selsChange"
            style="width: 100%;">
            <el-table-column prop="vipName" :label="$t('vip.vipName')" width="200"></el-table-column>
            <el-table-column prop="vipPhone" :label="$t('vip.vipPhone')" width="160"></el-table-column>
            <el-table-column
                prop="vipBirthTime"
                :label="$t('vip.vipBirthDate')"
                :formatter="formatDate"
                width="160"></el-table-column>
            <el-table-column prop="vipPoints" :label="$t('vip.vipPoints')" width="160"></el-table-column>
            <el-table-column prop="vipRemark" :label="$t('vip.vipRemark')" width="200">
                <template slot-scope="scope">
                    <el-popover
                        placement="bottom"
                        width="120"
                        trigger="click"
                        height="20"
                        :content="scope.row.vipRemark ? scope.row.vipRemark : $t('vip.noRemark')">
                        <el-button style="font: 12px/1.5 Tahoma,Helvetica,Arial,'宋体',sans-serif; padding:5px 20px;" slot="reference">{{$t('vip.showRemark')}}</el-button>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column :label="$t('common.operation')" width="240">
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
            :title="$t('vip.create')"
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
                <el-form-item :label="$t('vip.vipName')" prop="vipName">
                    <el-input v-model="create.vipName" type="text"></el-input>
                </el-form-item>
                <el-form-item :label="$t('vip.vipPhone')" prop="vipPhone">
                    <el-input v-model="create.vipPhone" type="text"></el-input>
                </el-form-item>
                <el-form-item :label="$t('vip.vipBirthDate')">
                    <el-date-picker v-model="create.vipBirthTime" type="date" align="center"></el-date-picker>
                </el-form-item>
                <el-form-item :label="$t('vip.vipRemark')" prop="vipRemark">
                    <el-input v-model="create.vipRemark" type="textarea"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogCreateVisible =
        false">{{$t('common.cancel')}}</el-button>
                <el-button type="primary" :loading="createLoading" @click="createVip">{{$t('common.confirm')}}
                </el-button>
            </div>
        </el-dialog>

        <el-dialog
            :title="$t('vip.update')"
            :visible.sync="dialogUpdateVisible"
            :close-on-click-modal="false"
            :close-on-press-escape="false">
            <el-form
                id="#update"
                :model="update"
                :rules="createRules"
                ref="update"
                label-width="100px">
                   <el-form-item :label="$t('vip.vipName')" prop="vipName">
                    <el-input v-model="update.vipName" type="text"></el-input>
                </el-form-item>
                <el-form-item :label="$t('vip.vipPhone')" prop="vipPhone">
                    <el-input v-model="update.vipPhone" type="text"></el-input>
                </el-form-item>
                <el-form-item :label="$t('vip.vipBirthDate')">
                    <el-date-picker v-model="update.vipBirthTime" type="date" align="center"></el-date-picker>
                </el-form-item>
                <el-form-item :label="$t('vip.vipRemark')" prop="vipRemark">
                    <el-input v-model="update.vipRemark" type="textarea"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogUpdateVisible = false">{{$t('common.cancel')}}</el-button>
                <el-button type="primary" :loading="updateLoading" @click="updateVip">{{$t('common.confirm')}}
                </el-button>
            </div>
        </el-dialog>

        <el-dialog
            :title="$t('vip.delete')"
            :visible.sync="dialogDeleteVisible"
            :close-on-click-modal="false"
            :close-on-press-escape="false">
            <span>{{$t('vip.deleteVip')}}</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogDeleteVisible = false">{{$t('common.cancel')}}</el-button>
                <el-button type="primary" @click="deleteVip">{{$t('common.confirm')}}</el-button>
            </span>
        </el-dialog>

    </section>
</template>

<script>
    //import NProgress from 'nprogress'
    import vip from '../../api/vip/vip';
    import commConst from '../../constants/commConst';
    import util from '../../common/js/util';

    export default {
        data() {
            return {
                filters: {
                    vipPhone: '',
                    vipName: ''
                },
                create: {
                    vipName: '',
                    vipPhone: '',
                    vipBirthTime: new Date(),
                    vipRemark: ''
                },
                update: {
                    vipId: '',
                    vipName: '',
                    vipPhone: '',
                    vipBirthTime: '',
                    vipRemark: ''
                },
                deleteVipId: '',
                createRules: {
                    vipName: [
                        {
                            required: true,
                            message: this.$t('vipRules.vipNameNotNull'),
                            trigger: 'blur'
                        }
                    ],
                    vipPhone: [
                        {
                            required: true,
                            message: this.$t('vipRules.vipPhoneNotNull'),
                            trigger: 'blur'
                        }, {
                            validator: this.isPhone,
                            trigger: 'blur',
                            message: this.$t('vipRules.vipPhoneNotRegex')
                        }
                    ]
                },
                user: JSON.parse(sessionStorage.getItem('user')),
                vip: [],
                total: 0,
                page: 1,
                listLoading: false,
                createLoading: false,
                updateLoading: false,
                dialogCreateVisible: false,
                dialogUpdateVisible: false,
                dialogVisible: false,
                deleteLoading: false,
                dialogDeleteVisible: false,
                limit: 5,
                sels: [] //列表选中列
            }
        },
        methods: {
            handleCurrentChange(val) {
                this.page = val;
                this.getVip();
            },
            selsChange: function (sels) {
                this.sels = sels;
            },
            handleSearch() {
                this.total = 0;
                this.page = 1;
                this.getVip();
            },
            setCurrent(row) {
                let that = this
                that.update = row;
                that.dialogUpdateVisible = true;
                that.updateLoading = false;
            },
            formatDate(row, column, value) {
                return value == ""
                    ? "-"
                    : util
                        .formatDate
                        .format(new Date(value), 'yyyy-MM-dd')
            },
            preDelete(row) {
                let that = this
                that.dialogDeleteVisible = true;
                that.deleteLoading = false;
                that.deleteVipId = row.vipId;
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
            },
            getVip() {
                let that = this;
                let para = {
                    page: that.page,
                    limit: that.limit,
                    vipName: that.filters.vipName,
                    vipPhone: that.filters.vipPhone
                };
                that.listLoading = true;
                vip
                    .queryVip(para)
                    .then(function (result) {
                        that.listLoading = false;
                        if (result) {
                            that.total = result.total;
                            that.vip = result.list;
                        }
                    }, function (err) {
                        that.listLoading = false;
                        that
                            .$message
                            .error({showClose: true, message: err.response.data, duration: 2000});
                    });
            },
            createVip() {
                let that = this;
                if (that.create.vipBirthTime) {
                    that.create.vipBirthTime = util.formatDate.format(new Date(that.create.vipBirthTime), 'yyyy-MM-dd')
                }
                that
                    .$refs
                    .create
                    .validate((valid) => {
                        if (valid) {
                            that.createLoading = true;
                            vip
                                .createVip(that.create)
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
            updateVip() {
                let that = this;
                if (that.update.vipBirthTime) {
                    that.update.vipBirthTime = util.formatDate.format(new Date(that.update.vipBirthTime), 'yyyy-MM-dd')
                }
                that
                    .$refs
                    .update
                    .validate((valid) => {
                        if (valid) {
                            that.updateLoading = true;
                            vip
                                .updateVip(that.update)
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
            formatUsePoints(row, column, value) {
                return util.formatUsePoints(this, value)
            },
            isPhone(rule, value, callback) {
                var regPhone = /^1[\d]{10}$/;
                if (!regPhone.test(value)) {
                    return callback(new Error());
                }
                return callback();
            },
            deleteVip() {
                let that = this
                that.deleteLoading = true;
                let param = {
                    'vipId': that.deleteVipId
                }
                vip
                    .deleteVip(param)
                    .then(res => {
                        that
                            .$message
                            .success(that.$t('common.deleteSuccess'));
                        that.dialogDeleteVisible = false;
                        that.deleteLoading = false;
                        that.deleteVipId = '';
                        that.handleSearch();
                    })
                    .catch((res) => {
                        that
                            .$message
                            .error(res.response.data);
                        that.deleteLoading = false;
                        that.deleteVipId = '';
                    });
            }
        },
        mounted() {
            this.getVip();
        }
    }
</script>