<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">
                <el-form-item class=".filters-items-25">
                    <el-input type="text" v-model="filters.vipPhone" :placeholder="$t('vip.vipPhone')"></el-input>
                </el-form-item>
                <el-form-item class=".filters-items-25" v-if="user && 1== user.userType">
                    <el-select v-model="filters.saleUserId" clearable="clearable" filterable="filterable"
                        :placeholder="$t('order.userName')">
                        <el-option v-for="item in userList" :key="item.userId" :label="item.userName"
                            :value="item.userId"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class=".filters-items-25">
                    <el-input type="text" v-model="filters.orderId" :placeholder="$t('order.orderId')"></el-input>
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
        <el-table :data="order" highlight-current-row="highlight-current-row" v-loading="listLoading"
            @selection-change="selsChange" style="width: 100%;">
            <el-table-column prop="orderId" :label="$t('order.orderId')" width="200"></el-table-column>
            <el-table-column :label="$t('order.detail')" width="200">
                <template slot-scope="scope">
                    <el-popover placement="bottom" width="600" trigger="click" height="20">
                        <el-table :data="orderDetail">
                            <el-table-column width="200" property="goodsName" :label="$t('stockIn.goodsName')">
                            </el-table-column>
                            <el-table-column width="100" property="goodsNum" :label="$t('order.goodsNum')">
                            </el-table-column>
                            <el-table-column width="120" property="goodsPrice" :formatter="formatPrice"
                                :label="$t('order.payMoney')"></el-table-column>
                            <el-table-column width="120" property="goodsOff" :formatter="formatOff"
                                :label="$t('order.payOff')"></el-table-column>
                            <el-table-column width="120" property="goodsOffPrice" :formatter="formatPrice"
                                :label="$t('order.payOffMoney')"></el-table-column>
                            <el-table-column width="120" property="goodsUsePoints" :formatter="formatUsePoints"
                                :label="$t('stockIn.usePoints')"></el-table-column>
                        </el-table>
                        <el-button @click="getDetail(scope.row.orderId)"
                            style="font: 12px/1.5 Tahoma,Helvetica,Arial,'宋体',sans-serif; padding:5px 20px;"
                            slot="reference">{{$t('order.showDetail')}}</el-button>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column prop="vipName" :label="$t('order.vipName')" width="160"></el-table-column>
            <el-table-column prop="userName" :label="$t('order.userName')" width="160"></el-table-column>
            <el-table-column prop="createDate" :label="$t('order.createDate')" :formatter="formatDate" width="160">
            </el-table-column>
            <el-table-column prop="payMoney" :label="$t('order.payMoney')" :formatter="formatPrice" width="160">
            </el-table-column>
            <el-table-column prop="payOff" :label="$t('order.payOff')" :formatter="formatOff" width="200">
            </el-table-column>
            <el-table-column prop="payOffMoney" :label="$t('order.payOffMoney')" :formatter="formatPrice" width="160">
            </el-table-column>
            <el-table-column prop="usePoints" :label="$t('order.usePoints')" width="160"></el-table-column>
            <el-table-column prop="realPayMoney" :label="$t('order.realPayMoney')" :formatter="formatPrice" width="160">
            </el-table-column>
            <el-table-column prop="getPoints" :label="$t('order.getPoints')" width="160"></el-table-column>
            <el-table-column :label="$t('common.operation')" width="120" v-if="user && 1== user.userType">
                <template slot-scope="scope">
                    <el-button type="danger" size="mini" width="100" icon="fa fa-trash-o" @click="preDelete(scope.row)">
                        {{$t('common.refund')}}</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--工具条-->
        <el-col :span="24" class="toolbar">
            <el-pagination layout="total, prev, pager, next" @current-change="handleCurrentChange"
                :page-size="this.limit" :total="total" style="float:right;" :current-page="this.page"></el-pagination>
        </el-col>

        <!-- Dialog提示-->
        <el-dialog :title="$t('order.create')" :visible="dialogCreateVisible" :close-on-click-modal="false"
            :close-on-press-escape="false" :show-close="false">
            <el-form id="#create" :model="create" ref="create" label-width="100px">
                <el-form-item :label="$t('order.userName')">
                    <el-input :disabled="true" :placeholder="user.userName" type="text"></el-input>
                </el-form-item>
                <el-form-item :label="$t('vip.vipPhone')">
                    <el-select v-model="create.buyUserId" clearable="clearable" filterable="filterable"
                        :placeholder="$t('vip.vipPhone')">
                        <el-option v-for="item in vipList" :key="item.vipId" :label="item.vipPhone" :value="item.vipId">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('order.goodsDetail')">
                    <el-autocomplete class="inline-input" v-model="preAddGoodsName" value-key="goodsName"
                        :placeholder="$t('stockIn.goodsName')" :fetch-suggestions="querySearch" @select="handleSelect">
                    </el-autocomplete>
                    <el-button type="primary" style="font: 12px/1.5 Tahoma,Helvetica,Arial,'宋体',sans-serif;"
                        @click="addGoods">{{$t('common.add')}}</el-button>
                </el-form-item>
                <el-table :data="create.goodsList" border="border" show-summary="show-summary"
                    :summary-method="getSummaries" height="300" style="width: 100%;">
                    <el-table-column prop="goodsName" :label="$t('stockIn.goodsName')" width="180"></el-table-column>
                    <el-table-column :label="$t('order.goodsNum')" width="220">
                        <template slot-scope="scope">
                            <el-input-number controls-position="right" v-model="scope.row.goodsNum"
                                :max="Number(scope.row.goodsNums)" :min="1" @change="changeNum($event, scope)">
                            </el-input-number>
                        </template>
                    </el-table-column>
                    <el-table-column width="110" prop="goodsPrice" sortable="sortable" :formatter="formatPrice"
                        :label="$t('order.payMoney')"></el-table-column>
                    <el-table-column width="120" prop="goodsPrice" sortable="sortable" :formatter="formatPrice"
                        :label="$t('order.payOffMoney')"></el-table-column>
                    <el-table-column prop="goodsUsePoints" :formatter="formatUsePoints"
                        :label="$t('stockIn.usePoints')"></el-table-column>
                </el-table>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogCreateVisible =
        false">{{$t('common.cancel')}}</el-button>
                <el-button type="primary" :loading="createLoading" @click="createOrder">{{$t('common.confirm')}}
                </el-button>
            </div>
        </el-dialog>

        <el-dialog :title="$t('common.refund')" :visible.sync="dialogDeleteVisible" :close-on-click-modal="false"
            :close-on-press-escape="false">
            <span>{{$t('order.refundOrder')}}</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogDeleteVisible = false">{{$t('common.cancel')}}</el-button>
                <el-button type="primary" @click="deleteOrder">{{$t('common.confirm')}}</el-button>
            </span>
        </el-dialog>

    </section>
</template>

<script>
    //import NProgress from 'nprogress'
    import order from '../../api/order/order';
    import vip from '../../api/vip/vip';
    import stockIn from '../../api/stockIn/stockIn';
    import user from '../../api/user/user';
    import commConst from '../../constants/commConst';
    import util from '../../common/js/util';

    export default {
        data() {
            return {
                filters: {
                    vipPhone: '',
                    saleUserId: '',
                    orderId: '',
                    startDate: '',
                    endDate: ''
                },
                create: {
                    saleUserId: user.userId,
                    buyUserId: '',
                    payMoney: '',
                    payOff: '',
                    payOffMoney: '',
                    usePoints: '',
                    getPoints: '',
                    realPayMoney: '',
                    goodsList: []
                },
                deleteOrderId: '',
                user: JSON.parse(sessionStorage.getItem('user')),
                order: [],
                userList: [],
                orderDetail: [],
                goodsList: [],
                vipList: [],
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
                sels: [], //列表选中列
                preAddGoodsName: '',
                preAddGoods: {}
            }
        },
        methods: {
            handleCurrentChange(val) {
                this.page = val;
                this.getOrder();
            },
            selsChange: function (sels) {
                this.sels = sels;
            },
            handleSearch() {
                this.total = 0;
                this.page = 1;
                this.getOrder();
            },
            setCurrent(row) {
                let that = this
                that.update = row;
                that.dialogUpdateVisible = true;
                that.updateLoading = false;
            },
            formatDate(row, column, value) {
                return value == "" ?
                    "-" :
                    util
                    .formatDate
                    .format(new Date(value), 'yyyy-MM-dd hh:mm:ss')
            },
            formatPrice(row, column, value) {
                return util.formatPrice(value)
            },
            preDelete(row) {
                let that = this
                that.dialogDeleteVisible = true;
                that.deleteLoading = false;
                that.deleteOrderId = row.orderId;
            },
            reset() {
                this
                    .$refs
                    .create
                    .resetFields();
            },
            preCreate() {
                this.getGoods();
                this.getVip();
                this.dialogCreateVisible = true;
                this.createLoading = false;
            },
            getOrder() {
                let that = this;
                let para = {
                    page: that.page,
                    limit: that.limit,
                    vipPhone: that.filters.vipPhone,
                    saleUserId: that.user && 1 == that.user.userType ?
                        that.filters.saleUserId :
                        that.user.userId,
                    orderId: that.filters.orderId
                };
                that.listLoading = true;
                order
                    .queryOrder(para)
                    .then(function (result) {
                        that.listLoading = false;
                        if (result) {
                            that.total = result.total;
                            that.order = result.list;
                        }
                    }, function (err) {
                        that.listLoading = false;
                        that
                            .$message
                            .error({
                                showClose: true,
                                message: err.response.data,
                                duration: 2000
                            });
                    });
            },
            getUsers() {
                let that = this;
                let para = {};
                that.listLoading = true;
                user
                    .queryUser(para)
                    .then(function (result) {
                        that.listLoading = false;
                        if (result) {
                            that.total = result.total;
                            that.userList = result.list;
                        }
                    }, function (err) {
                        that.listLoading = false;
                        that
                            .$message
                            .error({
                                showClose: true,
                                message: err.response.data,
                                duration: 2000
                            });
                    });
            },
            async getGoods() {
                let that = this;
                let para = {};
                await stockIn
                    .queryGoods(para)
                    .then(function (result) {
                        if (result) {
                            that.total = result.total;
                            that.goodsList = result.list;
                        }
                    }, function (err) {
                        that
                            .$message
                            .error({
                                showClose: true,
                                message: err.response.data,
                                duration: 2000
                            });
                    });
            },
            async getVip() {
                let that = this;
                let para = {};
                await vip
                    .queryVip(para)
                    .then(function (result) {
                        if (result) {
                            that.total = result.total;
                            that.vipList = result.list;
                        }
                    }, function (err) {
                        that
                            .$message
                            .error({
                                showClose: true,
                                message: err.response.data,
                                duration: 2000
                            });
                    });
            },
            getDetail(orderId) {
                let that = this;
                let para = {
                    'orderId': orderId
                };
                that.listLoading = true;
                order
                    .queryOrderDetail(para)
                    .then(function (result) {
                        that.listLoading = false;
                        if (result) {
                            that.orderDetail = result;
                        }
                    }, function (err) {
                        that.listLoading = false;
                        that
                            .$message
                            .error({
                                showClose: true,
                                message: err.response.data,
                                duration: 2000
                            });
                    });
            },
            createOrder() {
                let that = this;

                that.createLoading = true;
                order
                    .createOrder(that.create)
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
            deleteOrder() {
                let that = this
                that.deleteLoading = true;
                let param = {
                    'orderId': that.deleteOrderId
                }
                order
                    .refundOrder(param)
                    .then(res => {
                        that
                            .$message
                            .success(that.$t('common.deleteSuccess'));
                        that.dialogDeleteVisible = false;
                        that.deleteLoading = false;
                        that.deleteOrderId = '';
                        that.handleSearch();
                    })
                    .catch((res) => {
                        that
                            .$message
                            .error(res.response.data);
                        that.deleteLoading = false;
                        that.deleteOrderId = '';
                    });
            },
            formatOff(row, column, value) {
                return value + '%'
            },
            querySearch(queryString, cb) {
                var goodsList = this.goodsList;
                var results = queryString ?
                    goodsList.filter(this.createFilter(queryString)) :
                    goodsList;
                // 调用 callback 返回建议列表的数据
                cb(results);
            },
            createFilter(queryString) {
                return (goods) => {
                    return (goods.goodsName.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                };
            },
            handleSelect(item) {
                if (item) {
                    this.preAddGoods = item;
                }
            },
            addGoods() {
                let that = this;
                if (Object.keys(that.preAddGoods).length != 0) {
                    that
                        .create
                        .goodsList
                        .push({
                            goodsId: that.preAddGoods.goodsId,
                            goodsPrice: that.preAddGoods.goodsPrice,
                            goodsUsePoints: that.preAddGoods.goodsUsePoints,
                            goodsName: that.preAddGoods.goodsName,
                            goodsNums: that.preAddGoods.goodsNums,
                            goodsNum: 1
                        });
                    that
                        .create
                        .goodsList.map((column, index) => {
                            that.$set(column, 'goodsNum', column.goodsNum)
                        });
                    that.preAddGoods = {};
                    that.preAddGoodsName = '';
                }
            },
            getSummaries(param) {
                const {
                    columns,
                    data
                } = param;
                const sums = [];
                columns.forEach((column, index) => {
                    if (index === 0) {
                        sums[index] = '总价';
                        return;
                    }
                    if (index === 1 || index === 4) {
                        sums[index] = '';
                        return;
                    }
                    const values = data.map(item => Number(item[column.property]));
                    if (!values.every(value => isNaN(value))) {
                        sums[index] = util.formatPrice(values.reduce((prev, curr) => {
                            const value = Number(curr);
                            if (!isNaN(value)) {
                                return prev + curr;
                            } else {
                                return prev;
                            }
                        }, 0));
                        sums[index] += this.$t('order.signal');
                    } else {
                        sums[index] = 'N/A';
                    }
                });
                return sums;
            },
            changeNum(value, scope) {
                scope.row.goodsPrice = scope.row.goodsPrice * value;
            }
        },
        mounted() {
            this.getOrder();
            if (this.user && 1 == this.user.userType) {
                this.getUsers();
            }
        }
    }
</script>