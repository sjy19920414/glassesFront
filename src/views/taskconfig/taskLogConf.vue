<template>
  <el-row class="warp">
    <el-col :span="24" class="warp-main" v-loading="loading" :element-loading-text="$t('common.loading')">
      <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
        <el-form :inline="true" :model="filters">
          <el-form-item>
            <el-input type="text" v-model.number="filters.taskCode" :placeholder="$t('taskLog.taskCode')" clearable>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-input type="text" v-model.number="filters.taskName" :placeholder="$t('taskLog.taskName')" clearable>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-select v-model="filters.state" :placeholder="$t('common.status')">
              <el-option value="" />
              <el-option v-for="state in states" :key="state.value" :label="$t(state.name)" :value="state.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" v-on:click="handleSearch">{{$t('common.search')}}</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="preCreate">{{$t('common.create')}}</el-button>
          </el-form-item>
        </el-form>
      </el-col>

      <!--列表-->
      <el-table :data="records" highlight-current-row @selection-change="selsChange" style="width: 100%;">

        <el-table-column prop="taskCode" :label="$t('taskLog.taskCode')" width="200"></el-table-column>
        <el-table-column prop="taskName" :label="$t('taskLog.taskName')" width="160"></el-table-column>
        <el-table-column prop="cron" :label="$t('taskLog.cron')" width="150"></el-table-column>
        <el-table-column prop="extraMinutes" :label="$t('taskLog.extraMinutes')" width="150"></el-table-column>
        <el-table-column prop="status" :formatter="formatState" :label="$t('common.status')" width="150">
        </el-table-column>
        <el-table-column prop="createDate" :label="$t('common.createDate')" width="150"></el-table-column>
        <el-table-column prop="userGroup" :label="$t('usergroup.name')" width="200"></el-table-column>
        <el-table-column prop="remark" :label="$t('common.remark')" width="150"></el-table-column>
        <el-table-column fixed="right" :label="$t('common.operation')" width="80">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="setCurrent(scope.row)">{{$t('common.edit')}}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-col>

    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <el-pagination layout="total, prev, pager, next" @current-change="handleCurrentChange" :page-size="this.limit"
        :total="total" style="float:right;" :current-page="this.page">
      </el-pagination>
    </el-col>

    <!--新增接口配置-->
    <el-dialog :title="$t('taskLog.createTaskConf')" :visible="dialogCreateVisible" :close-on-click-modal="false"
      :close-on-press-escape="false" @close="reset">
      <el-form id="#create" :model="create" :rules="rules" ref="create" label-width="100px">
        <el-form-item :label="$t('taskLog.taskCode')" prop="taskCode">
          <el-input v-model="create.taskCode" type="text"></el-input>
        </el-form-item>
        <el-form-item :label="$t('taskLog.taskName')" prop="taskName">
          <el-input v-model="create.taskName" type="text"></el-input>
        </el-form-item>
        <el-form-item :label="$t('taskLog.cron')" prop="cron">
          <el-input v-model="create.cron" type="text"></el-input>
        </el-form-item>
        <el-form-item :label="$t('taskLog.extraMinutes')" prop="extraMinutes">
          <el-input v-model.number="create.extraMinutes" type="text"></el-input>
        </el-form-item>
        <el-form-item :label="$t('common.remark')" prop="remark">
          <el-input v-model="create.remark" type="text" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item :label="$t('usergroup.name')" prop="usergroups">
          <el-select v-model="create.userGroup" clearable>
            <el-option v-for="usergroup in usergroups" :key="usergroup.groupId" :label="usergroup.groupName" :value="usergroup.groupId">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogCreateVisible = false">{{$t('common.cancel')}}</el-button>
        <el-button type="primary" :loading="createLoading" @click="createTaskConf">{{$t('common.confirm')}}</el-button>
      </div>
    </el-dialog>

    <!-- 修改发件人配置 begin-->
    <el-dialog :title="$t('itfLog.updateItfConf')" :visible.sync="dialogUpdateVisible" :close-on-click-modal="false"
      :close-on-press-escape="false">
      <el-form id="#update" :model="update" :rules="updateRules" ref="update" label-width="100px">
        <el-form-item :label="$t('taskLog.taskCode')" prop="taskCode">
          <el-input v-model="update.taskCode" type="text"></el-input>
        </el-form-item>
        <el-form-item :label="$t('taskLog.taskName')" prop="taskName">
          <el-input v-model="update.taskName" type="text"></el-input>
        </el-form-item>
        <el-form-item :label="$t('taskLog.cron')" prop="cron">
          <el-input v-model="update.cron" type="text"></el-input>
        </el-form-item>
        <el-form-item :label="$t('taskLog.extraMinutes')" prop="extraMinutes">
          <el-input v-model.number="update.extraMinutes" type="text"></el-input>
        </el-form-item>
        <el-form-item :label="$t('usergroup.name')" prop="usergroups">
          <el-select v-model="update.userGroup" clearable>
            <el-option v-for="usergroup in usergroups" :key="usergroup.groupId" :label="usergroup.groupName" :value="usergroup.groupId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('common.status')" prop="status">
          <el-select v-model="update.status" clearable>
            <el-option v-for="status in states" :key="status.value" :label="$t(status.name)" :value="status.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('common.remark')" prop="remark">
          <el-input v-model="update.remark" type="text" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogUpdateVisible = false">{{$t('common.cancel')}}</el-button>
        <el-button type="primary" :loading="updateLoading" @click="updateTaskConf">{{$t('common.confirm')}}</el-button>
      </div>
    </el-dialog>

  </el-row>

</template>




<script>
  import usergroup from '../../api/usergroup/usergroup';
  import API from '../../api/tasklog/taskLog';
  import commConst from '../../constants/commConst';
  import util from '../../common/js/util';

  export default {
    data() {

      return {
        usergroups: [],
        filters: {
          taskCode: '',
          taskName: '',
          state: ''
        },
        create: {
          taskCode: '',
          taskName: '',
          cron: '',
          extraMinutes: '',
          remark: '',
          userGroup: ''
        },
        update: {
          taskCode: '',
          taskName: '',
          cron: '',
          extraMinutes: '',
          status: '',
          remark: '',
          userGroup: ''
        },
        rules: {
          taskCode: [{
            required: true,
            message: this.$t('taskRules.taskCodeNotNull'),
            trigger: 'blur'
          }],
          taskName: [{
            required: true,
            message: this.$t('taskRules.taskNameNotNull'),
            trigger: 'blur'
          }],
          cron: [{
              required: true,
              message: this.$t('taskRules.cronNotNull'),
              trigger: 'blur'
            },
            {
              validator: this.isCron,
              trigger: 'blur',
              message: this.$t('taskRules.cronNotValid')
            }
          ],
          extraMinutes: [{
            required: true,
            type: 'number',
            min: 0,
            message: this.$t('taskRules.extraMinutesIsNumber'),
            trigger: 'blur'
          }],
          remark: [{
            required: true,
            message: this.$t('taskRules.remarkNotNull'),
            trigger: 'blur'
          }]
        },
        updateRules: {
          taskCode: [{
            required: true,
            message: this.$t('taskRules.taskCodeNotNull'),
            trigger: 'blur'
          }],
          taskName: [{
            required: true,
            message: this.$t('taskRules.taskNameNotNull'),
            trigger: 'blur'
          }],
          cron: [{
              required: true,
              message: this.$t('taskRules.cronNotNull'),
              trigger: 'blur'
            },
            {
              validator: this.isCron,
              trigger: 'blur',
              message: this.$t('taskRules.cronNotValid')
            }
          ],
          extraMinutes: [{
            required: true,
            type: 'number',
            min: 0,
            message: this.$t('taskRules.extraMinutesIsNumber'),
            trigger: 'blur'
          }],
          status: [{
            required: true,
            message: this.$t('taskRules.statusNotNull'),
            trigger: 'blur'
          }],
          remark: [{
            required: true,
            message: this.$t('taskRules.remarkNotNull'),
            trigger: 'blur'
          }]
        },
        total: 0,
        page: 1,
        limit: 20,
        loading: false,
        sels: [], //列表选中列
        states: [],
        records: [],
        dialogCreateVisible: false, //创建对话框的显示状态
        dialogUpdateVisible: false, //编辑对话框的显示状态
        createLoading: false,
        updateLoading: false
      }
    },
    methods: {
      preCreate(){
        this.getUserGroups();
        this.dialogCreateVisible = true;
      },
      handleCurrentChange(val) {
        this.page = val;
        this.search();
      },
      async isCron(rule, value, callback) {
        let that = this;
        let params = {
          cron: value,
        };
        let flag = false;
        await API.checkCron(params).then(res => {
          flag = res;
        }).catch((res) => {
          that.$message.error(res.response.data);
          this.updateLoading = false;
        });
        if (!flag) {
          return callback(new Error());
        }
        return callback();
      },
      handleSearch() {
        this.total = 0;
        this.page = 1;
        this.search();
      },
      setCurrent(row) {
        this.getUserGroups();
        this.update = row;
        this.dialogUpdateVisible = true;
      },
      // 重置表单
      reset() {
        this.$refs.create.resetFields();
      },
      formatState: function (row, column) {
        return util.formatState(this, row.status);
      },
      search() {
        let that = this
        let params = {
          page: that.page,
          limit: that.limit,
          taskCode: that.filters.taskCode,
          status: that.filters.state,
          taskName: that.filters.taskName
        };


        that.loading = true;
        API.queryTaskConfs(params).then(function (result) {
          that.loading = false;
          if (result && result.list) {
            that.total = result.total;
            that.records = result.list;
          }
        }, function (err) {
          that.loading = false;
          that.$message.error({
            showClose: true,
            message: err.toString(),
            duration: 2000
          });
        }).catch(function (error) {
          that.loading = false;
          console.log(error);
          that.$message.error({
            showClose: true,
            message: that.$t('common.request.error'),
            duration: 2000
          });
        });
      },
      selsChange: function (sels) {
        this.sels = sels;
      },
      createTaskConf() {
        let that = this;
        that.$refs.create.validate((valid) => {
          if (valid) {
            that.createLoading = true;
            API.createTaskConf(this.create).then(res => {
              that.$message.success(that.$t('common.createSuccess'));
              that.dialogCreateVisible = false;
              that.createLoading = false;
              that.reset();
              that.handleSearch();
            }).catch((res) => {
              that.$message.error(res.response.data);
              that.createLoading = false;
            });
          } else {
            //this.$message.error('存在输入校验错误!');
            return false;
          }
        });
      },
      updateTaskConf() {
        let that = this;

        that.$refs.update.validate((valid) => {
          if (valid) {
            that.updateLoading = true;
            API.updateTaskConf(that.update).then(res => {
              that.$message.success(that.$t('common.updateSuccess'));
              that.dialogUpdateVisible = false;
              that.updateLoading = false;
              that.handleSearch();
            }).catch((res) => {
              that.$message.error(res.response.data);
              this.updateLoading = false;
            });
          } else {
            return false;
          }
        });
      },
      getUserGroups() {
        let that = this;
        let para = {
          status: "A"
        };
        that.listLoading = true;
        usergroup.queryUserGroups(para).then(function (result) {
          that.listLoading = false;
          if (result) {
            that.total = result.total;
            that.usergroups = result.list;
          }
        }, function (err) {
          that.listLoading = false;
          that.$message.error({
            showClose: true,
            message: err.response.data,
            duration: 2000
          });
        });
      }
    },
    mounted() {
      this.states = commConst.status;
      this.handleSearch();
    }
  }
</script>

<style>
  .demo-table-expand label {
    font-weight: bold;
  }
</style>