<template>
  <el-row class="warp">
    <el-col :span="24" class="warp-main" v-loading="loading" :element-loading-text="$t('common.loading')">
      <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
        <el-form :inline="true" :model="filters">
          <el-form-item>
            <el-input type="text" v-model.number="filters.flowId" :placeholder="$t('itfLog.flowId')"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input type="text" v-model.number="filters.flowName" :placeholder="$t('itfLog.flowName')"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input type="text" v-model.number="filters.srcSys" :placeholder="$t('itfLog.srcSys')"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input type="text" v-model.number="filters.destSys" :placeholder="$t('itfLog.destSys')"></el-input>
          </el-form-item>
          <el-form-item>
            <el-select v-model="filters.state" :placeholder="$t('common.status')" clearable>
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

        <el-table-column prop="flowId" v-if="false" :label="$t('itfLog.flowId')" width="200"></el-table-column>
        <el-table-column prop="flowName" :label="$t('itfLog.flowName')" width="160"></el-table-column>
        <el-table-column prop="protocol" :label="$t('itfLog.protocol')" width="80"></el-table-column>
        <el-table-column prop="ipAddr" :label="$t('itfLog.ipAddr')" width="150"></el-table-column>
        <el-table-column prop="port" :label="$t('itfLog.port')" width="150"></el-table-column>
        <el-table-column prop="method" :label="$t('itfLog.method')" width="150"></el-table-column>
        <el-table-column prop="api" :label="$t('itfLog.api')" width="150"></el-table-column>
        <el-table-column prop="srcSystem" :label="$t('itfLog.srcSys')" width="150"></el-table-column>
        <el-table-column prop="destSystem" :label="$t('itfLog.destSys')" width="150"></el-table-column>
        <el-table-column prop="userGroup" :label="$t('usergroup.name')" width="200"></el-table-column>
        <el-table-column prop="status" :formatter="formatState" :label="$t('common.status')" width="150">
        </el-table-column>
        <el-table-column prop="resend" :formatter="formatResend" :label="$t('common.resend')" width="150">
        </el-table-column>
        <el-table-column prop="remark" :label="$t('common.remark')" width="150"></el-table-column>
        <el-table-column prop="createDate" :label="$t('itfLog.createDate')" width="150"></el-table-column>
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
        :total="total" :current-page="this.page" style="float:right;">
      </el-pagination>
    </el-col>

    <!--新增接口配置-->
    <el-dialog :title="$t('itfLog.createItfConf')" :visible="dialogCreateVisible" :close-on-click-modal="false"
      :close-on-press-escape="false" @close="reset">
      <el-form id="#create" :model="create" :rules="rules" ref="create" label-width="100px">
        <el-form-item :label="$t('itfLog.flowId')" prop="flowId">
          <el-input v-model="create.flowId" type="text"></el-input>
        </el-form-item>
        <el-form-item :label="$t('itfLog.flowName')" prop="flowName">
          <el-input v-model="create.flowName" type="text"></el-input>
        </el-form-item>
        <el-form-item :label="$t('itfLog.protocol')" clearable prop="protocol">
          <el-select v-model="create.protocol" clearable>
            <el-option v-for="protocol in protocols" :key="protocol.value" :label="protocol.name"
              :value="protocol.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('itfLog.ipAddr')" prop="ipAddr">
          <el-input v-model="create.ipAddr" type="text"></el-input>
        </el-form-item>
        <el-form-item :label="$t('itfLog.port')" prop="port">
          <el-input v-model.number="create.port" type="text"></el-input>
        </el-form-item>
        <el-form-item :label="$t('itfLog.method')" prop="method">
          <el-select v-model="create.method" clearable>
            <el-option v-for="method in methods" :key="method.value" :label="method.name" :value="method.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('itfLog.api')" prop="api">
          <el-input v-model="create.api" type="text"></el-input>
        </el-form-item>
        <el-form-item :label="$t('itfLog.srcSys')" prop="srcSystem">
          <el-input v-model="create.srcSystem" type="text"></el-input>
        </el-form-item>
        <el-form-item :label="$t('itfLog.destSys')" prop="destSystem">
          <el-input v-model="create.destSystem" type="text"></el-input>
        </el-form-item>
        <el-form-item :label="$t('usergroup.name')" prop="usergroups">
          <el-select v-model="create.userGroup" clearable>
            <el-option v-for="usergroup in usergroups" :key="usergroup.groupId" :label="usergroup.groupName"
              :value="usergroup.groupId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('common.resend')" prop="resend">
          <el-select v-model="create.resend" clearable>
            <el-option v-for="resend in trueOrFalse" :key="resend.value" :label="$t(resend.name)" :value="resend.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('common.remark')" prop="remark">
          <el-input v-model="create.remark" type="text" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogCreateVisible = false">{{$t('common.cancel')}}</el-button>
        <el-button type="primary" :loading="createLoading" @click="createItfConf">{{$t('common.confirm')}}</el-button>
      </div>
    </el-dialog>

    <!-- 修改发件人配置 begin-->
    <el-dialog :title="$t('itfLog.updateItfConf')" :visible.sync="dialogUpdateVisible" :close-on-click-modal="false"
      :close-on-press-escape="false">
      <el-form id="#update" :model="update" :rules="updateRules" ref="update" label-width="100px">
        <el-form-item :label="$t('itfLog.flowId')" prop="flowId">
          <el-input v-model="update.flowId" type="text"></el-input>
        </el-form-item>
        <el-form-item :label="$t('itfLog.flowName')" prop="flowName">
          <el-input v-model="update.flowName" type="text"></el-input>
        </el-form-item>
        <el-form-item :label="$t('itfLog.protocol')" clearable prop="protocol">
          <el-select v-model="update.protocol" clearable>
            <el-option v-for="protocol in protocols" :key="protocol.value" :label="protocol.name"
              :value="protocol.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('itfLog.ipAddr')" prop="ipAddr">
          <el-input v-model="update.ipAddr" type="text"></el-input>
        </el-form-item>
        <el-form-item :label="$t('itfLog.port')" prop="port">
          <el-input v-model.number="update.port" type="text"></el-input>
        </el-form-item>
        <el-form-item :label="$t('itfLog.method')" prop="method">
          <el-select v-model="update.method" clearable>
            <el-option v-for="method in methods" :key="method.value" :label="method.name" :value="method.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('itfLog.api')" prop="api">
          <el-input v-model="update.api" type="text"></el-input>
        </el-form-item>
        <el-form-item :label="$t('itfLog.srcSys')" prop="srcSystem">
          <el-input v-model="update.srcSystem" type="text"></el-input>
        </el-form-item>
        <el-form-item :label="$t('itfLog.destSys')" prop="destSystem">
          <el-input v-model="update.destSystem" type="text"></el-input>
        </el-form-item>
        <el-form-item :label="$t('itfLog.api')" prop="api">
          <el-input v-model="update.api" type="text"></el-input>
        </el-form-item>
        <el-form-item :label="$t('usergroup.name')" prop="usergroups">
          <el-select v-model="update.userGroup" clearable>
            <el-option v-for="usergroup in usergroups" :key="usergroup.groupId" :label="usergroup.groupName"
              :value="usergroup.groupId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('common.resend')" prop="resend">
          <el-select v-model="update.resend" clearable>
            <el-option v-for="resend in trueOrFalse" :key="resend.value" :label="$t(resend.name)" :value="resend.value">
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
        <el-button type="primary" :loading="updateLoading" @click="updateItfConf">{{$t('common.confirm')}}</el-button>
      </div>
    </el-dialog>

  </el-row>

</template>




<script>
  import usergroup from '../../api/usergroup/usergroup';
  import API from '../../api/itflog/itfLog';
  import commConst from '../../constants/commConst';
  import util from '../../common/js/util';

  export default {
    data() {

      return {
        usergroups: [],
        filters: {
          flowId: '',
          flowName: '',
          srcSys: '',
          destSys: '',
          state: ''
        },
        create: {
          flowId: '',
          flowName: '',
          protocol: '',
          ipAddr: '',
          port: '',
          method: '',
          api: '',
          srcSystem: '',
          destSystem: '',
          resend: '',
          remark: '',
          userGroup: ''
        },
        update: {
          flowId: '',
          flowName: '',
          protocol: '',
          ipAddr: '',
          port: '',
          method: '',
          api: '',
          srcSystem: '',
          destSystem: '',
          resend: '',
          status: '',
          remark: '',
          userGroup: ''
        },
        rules: {
          flowId: [{
            required: true,
            message: this.$t('itfRules.flowIdNotNull'),
            trigger: 'blur'
          }],
          flowName: [{
            required: true,
            message: this.$t('itfRules.flowNameNotNull'),
            trigger: 'blur'
          }],
          protocol: [{
            required: true,
            message: this.$t('itfRules.protocolNotNull'),
            trigger: 'blur'
          }],
          ipAddr: [{
            required: true,
            message: this.$t('itfRules.ipAddrNotNull'),
            trigger: 'blur'
          }],
          api: [{
            required: true,
            message: this.$t('itfRules.apiNotNull'),
            trigger: 'blur'
          }],
          remark: [{
            required: true,
            message: this.$t('itfRules.remarkNotNull'),
            trigger: 'blur'
          }],
          port: [{
            required: true,
            type: 'number',
            min: 0,
            max: 65535,
            message: this.$t('itfRules.portIsNumber'),
            trigger: 'blur'
          }],
          method: [{
            required: true,
            message: this.$t('itfRules.methodNotNull'),
            trigger: 'blur'
          }],
          resend: [{
            required: true,
            message: this.$t('itfRules.protocolNotNull'),
            trigger: 'blur'
          }]
        },
        updateRules: {
          flowId: [{
            required: true,
            message: this.$t('itfRules.flowIdNotNull'),
            trigger: 'blur'
          }],
          flowName: [{
            required: true,
            message: this.$t('itfRules.flowNameNotNull'),
            trigger: 'blur'
          }],
          protocol: [{
            required: true,
            message: this.$t('itfRules.protocolNotNull'),
            trigger: 'blur'
          }],
          ipAddr: [{
            required: true,
            message: this.$t('itfRules.ipAddrNotNull'),
            trigger: 'blur'
          }],
          api: [{
            required: true,
            message: this.$t('itfRules.apiNotNull'),
            trigger: 'blur'
          }],
          remark: [{
            required: true,
            message: this.$t('itfRules.remarkNotNull'),
            trigger: 'blur'
          }],
          port: [{
            required: true,
            type: 'number',
            min: 0,
            max: 65535,
            message: this.$t('itfRules.portIsNumber'),
            trigger: 'blur'
          }],
          method: [{
            required: true,
            message: this.$t('itfRules.methodNotNull'),
            trigger: 'blur'
          }],
          status: [{
            required: true,
            message: this.$t('itfRules.statusNotNull'),
            trigger: 'blur'
          }],
          resend: [{
            required: true,
            message: this.$t('itfRules.protocolNotNull'),
            trigger: 'blur'
          }]
        },
        total: 0,
        page: 1,
        limit: 20,
        loading: false,
        sels: [], //列表选中列
        states: [],
        protocols: [],
        methods: [],
        trueOrFalse: [],
        records: [],
        dialogCreateVisible: false, //创建对话框的显示状态
        dialogUpdateVisible: false, //编辑对话框的显示状态
        createLoading: false,
        updateLoading: false
      }
    },
    methods: {
      preCreate() {
        this.getUserGroups();
        this.dialogCreateVisible = true;
      },
      handleCurrentChange(val) {
        this.page = val;
        this.search();
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
      formatResend: function (row, column) {
        return util.formatTrueFalse(this, row.resend);
      },
      search() {
        let that = this
        let params = {
          page: that.page,
          limit: that.limit,
          flowId: that.filters.flowId,
          destSystem: that.filters.destSys,
          srcSystem: that.filters.srcSys,
          status: that.filters.state,
          flowName: that.filters.flowName
        };


        that.loading = true;
        API.queryItfConfs(params).then(function (result) {
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
      createItfConf() {
        let that = this;
        that.$refs.create.validate((valid) => {
          if (valid) {
            that.createLoading = true;
            API.createItfConf(this.create).then(res => {
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
      updateItfConf() {
        let that = this;

        that.$refs.update.validate((valid) => {
          if (valid) {
            that.updateLoading = true;
            API.updateItfConf(that.update).then(res => {
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
        this.usergroups = []
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
      this.protocols = commConst.protocol;
      this.methods = commConst.methods;
      this.trueOrFalse = commConst.trueOrFalse;

      this.handleSearch();
    }
  }
</script>

<style>
  .demo-table-expand label {
    font-weight: bold;
  }
</style>