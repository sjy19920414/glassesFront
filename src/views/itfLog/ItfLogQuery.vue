<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">
                <el-form-item>
                    <el-input type="text" v-model="filters.requestId" :placeholder="$t('itfLog.requestId')">
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-select v-model="filters.exeState" :placeholder="$t('common.status')" clearable>
                        <el-option value="" />
                        <el-option v-for="state in exeStates" :key="state.value" :label="$t(state.name)"
                            :value="state.value">
                            <span style="float: left">{{ $t(state.name) }}</span>
                            <span style="float: right; color: #8492a6; font-size: 13px">{{ state.value }}</span>
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-select v-model="filters.flowId" :placeholder="$t('itfLog.flowId')" clearable>
                        <el-option value="" />
                        <el-option v-for="flow in flowIds" :key="flow.flowId" :label="flow.flowName"
                            :value="flow.flowId">
                            <span style="float: left">{{ flow.flowName }}</span>
                            <span style="float: right; color: #8492a6; font-size: 13px">{{ flow.flowId }}</span>
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-date-picker v-model="filters.startCreateTime" type="datetimerange"
                        :picker-options="pickerOptions" :range-separator="$t('common.to')"
                        :start-placeholder="$t('common.startTime')" :end-placeholder="$t('common.endTime')"
                        align="right" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" v-on:click="search">{{$t('common.search')}}</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <!--列表-->
        <el-table :data="itfLogs" highlight-current-row v-loading="listLoading" @selection-change="selsChange"
             style="width: 100%;">
            <el-table-column prop="requestId" :label="$t('itfLog.requestId')" width="120">
            </el-table-column>
            <el-table-column prop="flowId" :label="$t('itfLog.flowId')" width="150">
            </el-table-column>
            <el-table-column prop="flowName" :formatter="formatFlowName" :label="$t('itfLog.flowName')" width="150">
            </el-table-column>
            <el-table-column prop="createDate" :label="$t('common.createDate')" width="200">
            </el-table-column>
            <el-table-column prop="exeState" :formatter="formatExeState" :label="$t('itfLog.exeState')" width="150"
                sortable>
            </el-table-column>
            <el-table-column prop="updateTime" :label="$t('itfLog.updateTime')" min-width="120">
            </el-table-column>
            <el-table-column prop="requestBody" :label="$t('itfLog.requestBody')" min-width="280">
            </el-table-column>
            <el-table-column prop="queryParams" :label="$t('itfLog.queryParams')" min-width="180">
            </el-table-column>
            <el-table-column fixed="right" :label="$t('common.operation')" width="110">
                <template slot-scope="scope">
                    <el-button type="info" size="mini" icon="el-icon-message"
                        @click="viewDetail(scope.$index, scope.row)">{{$t('common.detail')}}</el-button>
                    <el-button v-if="scope.row.resend=='true' && scope.row.exeState=='EXCEPTION' " type="danger"
                        size="mini" icon="el-icon-message" @click="retry(scope.$index, scope.row)">
                        {{$t('common.resend')}}</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--工具条-->
        <el-col :span="24" class="toolbar">
            <el-pagination layout="total, prev, pager, next" @current-change="handleCurrentChange" :current-page="this.page" :page-size="this.limit"
                :total="total" style="float:right;">
            </el-pagination>
        </el-col>

    </section>
</template>

<script>
    //import NProgress from 'nprogress'
    import itfLog from '../../api/itflog/itfLog';
    import commConst from '../../constants/commConst';
    import util from '../../common/js/util';

    export default {
        data() {
            return {
                filters: {
                    flowId: '',
                    requestId: '',
                    startCreateTime: '',
                    endCreateTime: '',
                    exeState: ''
                },
                itfLogs: [],
                flowIds: [],
                exeStates: [],
                total: 0,
                page: 1,
                listLoading: false,
                flowLoading: false,
                limit: 20,
                pickerOptions: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近3个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                sels: [] //列表选中列
            }
        },
        methods: {
            search(){
                this.total = 0;
                this.page = 1;
                this.getItfLogs();
            },
            handleCurrentChange(val) {
                this.page = val;
                this.getItfLogs();
            },
            selsChange: function (sels) {
                this.sels = sels;
            },
            formatExeState: function (row, column) {

                return util.formatExeState(this, row.exeState);
            },
            formatFlowName: function (row, column) {
                for (let i = 0; i < this.flowIds.length; i++) {
                    if (this.flowIds[i].flowId == row.flowId) {
                        return this.flowIds[i].flowName;
                    }
                }

                return '';
            },
            //获取所有接口配置信息
            getFlowIds() {
                let para = {};
                let that = this;
                that.flowLoading = true;
                itfLog.queryItfConfs(para).then(function (result) {
                    //NProgress.start();
                    that.flowLoading = false;
                    if (result) {
                        that.flowIds = result.list;
                    }
                }, function (err) {
                    that.flowLoading = false;
                    that.$message.error({
                        showClose: true,
                        message: err.toString(),
                        duration: 2000
                    });
                });
            },
            //获取接口日志
            getItfLogs() {
                let that = this;
                let para = {
                    page: that.page,
                    limit: that.limit,
                    flowId: that.filters.flowId,
                    requestId: that.filters.requestId,
                    exeState: that.filters.exeState,
                };
                if (that.filters.startCreateTime && that.filters.startCreateTime.length > 0 && that.filters
                    .startCreateTime[0]) {
                    para.startCreateTime = that.filters.startCreateTime[0];
                    para.endCreateTime = that.filters.startCreateTime[1];
                }
                that.listLoading = true;
                itfLog.queryItfLogs(para).then(function (result) {
                    //NProgress.start();
                    that.listLoading = false;
                    if (result) {
                        that.total = result.total;
                        that.itfLogs = result.itfLogs;
                    }
                }, function (err) {
                    that.listLoading = false;
                    that.$message.error({
                        showClose: true,
                        message: err.response.data,
                        duration: 2000
                    });
                });
            },
            viewDetail(index, row) {
                let that = this
                that.$router.push({
                    path: "/itfLogQueryDetail",
                    query: {
                        requestId: row.requestId,
                        flowId: row.flowId
                    }
                })
            },
            retry(index, row) {
                let that = this;
                let para = {
                    requestId: row.requestId
                };
                that.$confirm(that.$t('itfLog.confirmResend'), that.$t('itfLog.tip'), {
                    confirmButtonText: that.$t('common.confirm'),
                    cancelButtonText: that.$t('common.cancel'),
                    type: 'warning'
                }).then(() => {
                    itfLog.retry(para).then(function (result) {
                        //NProgress.start();
                        that.listLoading = false;
                        that.$message({
                            type: 'success',
                            message: that.$t('itfLog.resendSuccess')
                        });
                    }, function (err) {
                        that.listLoading = false;
                        that.$message.error({
                            showClose: true,
                            message: err.response.data,
                            duration: 2000
                        });
                    });

                }).catch(() => {
                    that.$message({
                        type: 'info',
                        message: that.$t('itfLog.resendCancel')
                    });
                });
            }



        },
        mounted() {
            this.exeStates = commConst.exeStatus;
            this.getFlowIds();
            this.getItfLogs();
        }
    }
</script>