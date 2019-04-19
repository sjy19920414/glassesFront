<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input type="text" v-model="filters.logId" :placeholder="$t('taskLog.logId')"></el-input>
				</el-form-item>
				<el-form-item>
                    <el-select v-model="filters.exeState" :placeholder="$t('common.status')" clearable>
                        <el-option value="" />
                        <el-option v-for="state in exeStates" :key="state.value" :label="$t(state.name)" :value="state.value">
                        </el-option>
                    </el-select>
				</el-form-item>
                <el-form-item>
                    <el-select v-model="filters.taskCode" :placeholder="$t('taskLog.taskCode')" clearable>
                        <el-option value="" />
                        <el-option v-for="task in tasks" :key="task.taskCode" :label="task.taskName" :value="task.taskCode">
                            <span style="float: left">{{ task.taskName }}</span>
                            <span style="float: right; color: #8492a6; font-size: 13px">{{ task.taskCode }}</span>
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-date-picker v-model="filters.startCreateTime" type="datetimerange" :picker-options="pickerOptions"
                                    :range-separator="$t('common.to')" :start-placeholder="$t('common.startTime')" :end-placeholder="$t('common.endTime')"
                                    align="right" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" >
                    </el-date-picker>
                </el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="handleSearch">{{$t('common.search')}}</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="records" highlight-current-row v-loading="listLoading" @selection-change="selsChange"
				 style="width: 100%;">
			<el-table-column prop="logId" :label="$t('taskLog.logId')" width="120">
			</el-table-column>
			<el-table-column prop="taskCode"   :label="$t('taskLog.taskCode')"  width="150">
			</el-table-column>
			<el-table-column prop="createDate"  :label="$t('common.createDate')"  width="200">
			</el-table-column>
			<el-table-column prop="exeState" :formatter="formatExeState"  :label="$t('itfLog.exeState')"  width="150" sortable>
			</el-table-column>
			<el-table-column prop="updateTime" :label="$t('itfLog.updateTime')" min-width="120">
			</el-table-column>
			<el-table-column fixed="right" :label="$t('common.operation')" width="110">
				<template slot-scope="scope">
					<el-button type="info" size="mini" icon="el-icon-message" @click="viewDetail(scope.$index, scope.row)">{{$t('common.detail')}}</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-pagination layout="total, prev, pager, next" @current-change="handleCurrentChange" :page-size="this.limit" :total="total" style="float:right;" :current-page="this.page">
			</el-pagination>
		</el-col>

	</section>
</template>

<script>
	import taskLog from '../../api/tasklog/taskLog';
	import commConst from '../../constants/commConst';
	import util from '../../common/js/util';

	export default {
		data() {
			return {
				filters: {
                    logId: '',
                    taskCode: '',
                    startCreateTime: '',
                    endCreateTime: '',
                    exeState:''
				},
                records: [],
                tasks:[],
                exeStates:[],
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
				sels: []//列表选中列
			}
		},
		methods: {
            handleSearch(){
                this.total = 0
                this.page = 1;
				this.getTaskLogs();
            },
			handleCurrentChange(val) {
				this.page = val;
				this.getTaskLogs();
			},
			selsChange: function (sels) {
				this.sels = sels;
			},
            formatExeState: function (row, column) {

                return util.formatExeState(this,row.exeState);
            },
            //获取所有接口配置信息
            getTasks() {
                let para = {
                };
                let that = this;
                that.flowLoading = true;
                taskLog.queryTaskConfs(para).then(function (result) {
                    //NProgress.start();
                    that.flowLoading = false;
                    if(result){
                        that.tasks = result.list;
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
            getTaskLogs() {
			    let that=this;
                let para = {
                    page: that.page,
                    limit: that.limit,
                    taskCode: that.filters.taskCode,
                    logId: that.filters.logId,
                    exeState:that.filters.exeState,
                };
                if (that.filters.startCreateTime&&that.filters.startCreateTime.length>0&&that.filters.startCreateTime[0]) {
                    para.startCreateTime = that.filters.startCreateTime[0];
                    para.endCreateTime = that.filters.startCreateTime[1];
                }
                that.listLoading = true;
                taskLog.queryTaskLogs(para).then(function (result) {
                    //NProgress.start();
                    that.listLoading = false;
                    if(result ){
                        that.total = result.total;
                        that.records = result.taskLogs;
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
            viewDetail(index,row){
                let that = this
                that.$router.push({path: "/taskLogQueryDetail", query: {logId: row.logId,taskCode:row.taskCode}})
            }
        },
		mounted() {
            this.exeStates = commConst.exeStatus;
            this.getTasks();
			this.getTaskLogs();
		}
	}

</script>
