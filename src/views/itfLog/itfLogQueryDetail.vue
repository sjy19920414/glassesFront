<template>

  <el-row class="warp">
    <el-col :span="24" class="warp-main" v-loading="dataLoading" :element-loading-text="$t('common.loading')">
      <el-row class="warp">
        <el-col :span="24"><h1 align="center"> {{$t('itfLog.logDetail')}}</h1></el-col>
      </el-row>
      <el-row class="warp">
        <el-col :span="6"><span>{{$t('itfLog.flowId')}}:{{confData.flowId}}</span> </el-col>
        <el-col :span="6"><span>{{$t('itfLog.flowName')}}:{{confData.flowName}}</span></el-col>
        <el-col :span="6"><span>{{$t('common.status')}}:{{confData.status}}</span></el-col>
        <el-col :span="6"><span>{{$t('common.createDate')}}:{{confData.createDate}}</span></el-col>
      </el-row>
        <el-row class="warp">
            <el-col :span="6"><span>{{$t('itfLog.protocol')}}:{{confData.protocol}}</span></el-col>
            <el-col :span="6"><span>{{$t('itfLog.ipAddr')}}:{{confData.ipAddr}}</span></el-col>
            <el-col :span="6"><span>{{$t('itfLog.port')}}:{{confData.port}}</span></el-col>
            <el-col :span="6"><span>{{$t('itfLog.method')}}:{{confData.method}}</span></el-col>
      </el-row>
        <el-row class="warp">
            <el-col :span="6"><span>{{$t('itfLog.api')}}:{{confData.api}}</span></el-col>
            <el-col :span="6"><span>{{$t('itfLog.srcSys')}}:{{confData.srcSystem}}</span></el-col>
            <el-col :span="6"><span>{{$t('itfLog.destSys')}}:{{confData.destSystem}}</span></el-col>
            <el-col :span="6"><span>{{$t('common.resend')}}:{{confData.resend}}</span></el-col>
      </el-row>
        <el-row class="warp">
            <el-col :span="24"><span>{{$t('common.remark')}}:{{confData.remark}}</span></el-col>
      </el-row>


    </el-col>


    <el-col :span="24" class="warp-main" v-loading="listLoading" :element-loading-text="$t('common.loading')">
      <!--列表-->
      <h3> {{$t('itfLog.logProcess')}}</h3>
      <el-table :data="records" highlight-current-row style="width: 100%;">
        <el-table-column prop="requestId" :label="$t('itfLog.requestId')"></el-table-column>
        <el-table-column prop="createDate" :label="$t('common.createDate')" sortable></el-table-column>
        <el-table-column prop="process" :label="$t('itfLog.process')"></el-table-column>
        <el-table-column prop="message" :label="$t('itfLog.message')"></el-table-column>
      </el-table>
    </el-col>
    <el-col align="center">
       <el-button type="info" size="mini" icon="el-icon-message" @click="goback()">{{$t('common.back')}}</el-button>

    </el-col>

  </el-row>
</template>
<script>
  import API from '../../api/itflog/itfLog';
  import util from '../../common/js/util';

  export default {
    data() {

      return {
        records: [],
        listLoading: false,
          confData:{},
          dataLoading:false
      }
    },
    methods: {
        handleCurrentChange(val) {
        this.logDetailSearch();
      },
      handleItfConfSearch() {
        this.itfConfigSearch();
      },
        formatState: function (val) {

            return util.formatExeState(this,val);
        },
      handleItfLogSearch() {
        this.logDetailSearch();
      },
      logDetailSearch() {
        let that = this;
        let params = {
            requestId : that.$route.query.requestId,
        };
        that.listLoading = true;
        API.queryItfLog(params).then(function (result) {
          that.listLoading = false;

            if (result) {
             that.records = result;
          }
        }, function (err) {
          that.listLoading = false;
          that.$message.error({
            showClose: true,
            message: err.toString(),
            duration: 2000
          });
        }).catch(function (error) {
          that.inLoading = false;
          that.$message.error({
            showClose: true,
            message: that.$t('common.request.error'),
            duration: 2000
          });
        });
      },
      itfConfigSearch() {
        let that = this
        let params = {
            flowId: that.$route.query.flowId
        };
        that.dataLoading = true;
        API.queryItfConfs(params).then(function (result) {
          that.dataLoading = false;
          if (result && result.list.length>0) {
              that.confData = result.list[0];
              that.confData.status = util.formatState(that,that.confData.status);
              that.confData.resend = util.formatTrueFalse(that,that.confData.resend);
          }
        }, function (err) {
          that.dataLoading = false;
          that.$message.error({
            showClose: true,
            message: err.toString(),
            duration: 2000
          });
        }).catch(function (error) {
          that.dataLoading = false;
          that.$message.error({
            showClose: true,
            message: that.$t('common.request.error'),
            duration: 2000
          });
        });
      },
        goback(){
            this.$router.back(-1);
        }
    },
    mounted() {
      this.handleItfConfSearch()
      this.handleItfLogSearch()
    },
  }

</script>

<style>
  .demo-table-expand label {
    font-weight: bold;
  }
  .el-row {
      margin-top: 10px;
  }
</style>
