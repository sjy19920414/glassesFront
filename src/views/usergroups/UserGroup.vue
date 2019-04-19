<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">
                <el-form-item>
                    <el-input type="text" v-model="filters.groupId" :placeholder="$t('usergroup.groupId')"
                        style="width:280px">
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-input type="text" v-model="filters.groupName" :placeholder="$t('usergroup.groupName')"
                        style="width:170px"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-select v-model="filters.status" :placeholder="$t('common.status')" clearable>
                        <el-option value="" />
                        <el-option v-for="item in status" :key="item.value" :label="$t(item.name)" :value="item.value">
                            <span style="float: left">{{ $t(item.name) }}</span>
                            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" v-on:click="handleSearch">{{$t('common.search')}}</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="prepareUsers">{{$t('common.create')}}</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <!--列表-->
        <el-table :data="usergroups" highlight-current-row v-loading="listLoading" @selection-change="selsChange"
            style="width: 100%;">
            <el-table-column prop="groupId" :label="$t('usergroup.groupId')" width="300">
            </el-table-column>
            <el-table-column prop="groupName" :label="$t('usergroup.groupName')" width="230">
            </el-table-column>
            <el-table-column prop="status" :formatter="formatStatus" :label="$t('common.status')" width="150" sortable>
            </el-table-column>
            <el-table-column  :label="$t('common.operation')" width="80">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" icon="fa fa-edit" @click="setCurrent(scope.row)">
                        {{$t('common.edit')}}</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--工具条-->
        <el-col :span="24" class="toolbar">
            <el-pagination layout="total, prev, pager, next" @current-change="handleCurrentChange" :page-size="this.limit"
                :total="total" style="float:right;" :current-page="this.page">
            </el-pagination>
        </el-col>

        <el-dialog :title="$t('usergroup.createUserGroup')" :visible="dialogCreateVisible" :close-on-click-modal="false"
            :close-on-press-escape="false" :show-close="false">
            <el-form id="#create" :model="create" :rules="createRules" ref="create" label-width="100px">
                <el-form-item :label="$t('usergroup.groupName')" prop="groupName">
                    <el-input v-model="create.groupName" type="text"></el-input>
                </el-form-item>
                <template>
                    <el-transfer id="createTran" v-model="create.userIds" :data="createPre.unSelectedUser"
                        :titles="[$t('usergroup.unSelectedUser'), $t('usergroup.selectedUser')]"></el-transfer>
                </template>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogCreateVisible = false">{{$t('common.cancel')}}</el-button>
                <el-button type="primary" :loading="createLoading" @click="createUserGroup">{{$t('common.confirm')}}
                </el-button>
            </div>
        </el-dialog>

        <!-- 修改用户 begin-->
        <el-dialog :title="$t('usergroup.updateUserGroup')" :visible.sync="dialogUpdateVisible"
            :close-on-click-modal="false" :close-on-press-escape="false">
            <el-form id="#update" :model="update" :rules="updateRules" ref="update" label-width="100px">
                <el-form-item :label="$t('usergroup.groupId')" prop="groupId">
                    <el-input v-model="update.groupId" type="text" readonly="readonly"></el-input>
                </el-form-item>
                <el-form-item :label="$t('usergroup.groupName')" prop="groupName">
                    <el-input v-model="update.groupName" type="text"></el-input>
                </el-form-item>
                <el-form-item :label="$t('common.status')" prop="status">
                    <el-select v-model="update.status" clearable>
                        <el-option v-for="item in status" :key="item.value" :label="$t(item.name)" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <template>
                    <el-transfer id="updateTran" v-model="update.userIds" :data="createPre.unSelectedUser"
                        :titles="[$t('usergroup.unSelectedUser'), $t('usergroup.selectedUser')]"></el-transfer>
                </template>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogUpdateVisible = false">{{$t('common.cancel')}}</el-button>
                <el-button type="primary" :loading="updateLoading" @click="updateUserGroup">{{$t('common.confirm')}}
                </el-button>
            </div>
        </el-dialog>

    </section>
</template>

<script>
    //import NProgress from 'nprogress'
    import usergroup from '../../api/usergroup/usergroup';
    import user from '../../api/user/user';
    import commConst from '../../constants/commConst';
    import util from '../../common/js/util';

    export default {
        data() {
            return {
                filters: {
                    groupId: '',
                    groupName: '',
                    status: ''
                },
                createPre: {
                    unSelectedUser: []
                },
                create: {
                    groupName: '',
                    userIds: []
                },
                update: {
                    groupName: '',
                    userIds: [],
                    status: ''
                },
                createRules: {
                    groupName: [{
                        required: true,
                        message: this.$t('userGroupRules.groupNameNotNull'),
                        trigger: 'blur'
                    }]
                },
                updateRules: {
                    groupName: [{
                        required: true,
                        message: this.$t('userGroupRules.groupNameNotNull'),
                        trigger: 'blur'
                    }],
                    status: [{
                        required: true,
                        message: this.$t('userRules.statusNotNull'),
                        trigger: 'blur'
                    }]
                },
                status: [],
                usergroups: [],
                total: 0,
                page: 1,
                listLoading: false,
                createLoading: false,
                updateLoading: false,
                dialogCreateVisible: false, //创建对话框的显示状态
                dialogUpdateVisible: false, //编辑对话框的显示状态1
                userAllLoading: false,
                userSelectAllLoading: false,
                limit: 20,
                sels: [] //列表选中列
            }
        },
        methods: {
            handleCurrentChange(val) {
                this.page = val;
                this.getUsers();
            },
            selsChange: function (sels) {
                this.sels = sels;
            },
            formatStatus: function (row, column) {
                return util.formatState(this, row.status);
            },
            setCurrent(row) {
                this.update.status = row.status;
                this.update.groupId = row.groupId;
                this.update.groupName = row.groupName;
                this.reset();
                this.getGroupUsers(row.groupId);
                this.dialogUpdateVisible = true;
            },
            prepareUsers() {
                this.reset();
                this.getUsers();
                this.dialogCreateVisible = true;
            },
            reset() {
                this.createPre.unSelectedUser = [];
                this.create.userIds = [];
                this.create.groupName = '';
                this.update.userIds = [];
            },
            handleSearch() {
                this.total = 0;
                this.page = 1;
                this.getUserGroups();
            },
            //获取接口日志
            getUserGroups() {
                let that = this;
                let para = {
                    page: that.page,
                    limit: that.limit,
                    groupId: that.filters.groupId,
                    groupName: that.filters.groupName,
                    status: that.filters.status,
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
            },
            isEmail(rule, value, callback) {
                var regEmail = /^[\.A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
                if (!regEmail.test(value)) {
                    return callback(new Error());
                }
                return callback();
            },
            createUserGroup() {
                let that = this;
                that.$refs.create.validate((valid) => {
                    if (valid) {
                        that.createLoading = true;
                        usergroup.createUserGroup(this.create).then(res => {
                            that.$message.success(that.$t('common.createSuccess'));
                            that.dialogCreateVisible = false;
                            that.createLoading = false;
                            that.handleSearch();
                        }).catch((res) => {
                            that.$message.error(res.response.data);
                            that.createLoading = false;
                        });
                    } else {
                        return false;
                    }
                });
            },
            async getUsers() {
                let that = this;
                let para = {
                };
                that.userAllLoading = true;
                await user.queryUsers(para).then(function (result) {
                        that.userAllLoading = false;
                        if (result) {
                            result.list.forEach(element => {
                                that.createPre.unSelectedUser.push({
                                    label: element.userName,
                                    key: element.userId,
                                    pinyin: element.userName,
                                    disabled: element.status === "D"
                                })
                            });
                        }
                    },
                    function (err) {
                        that.userAllLoading = false;
                        that.$message.error({
                            showClose: true,
                            message: err.response.data,
                            duration: 2000
                        });
                    });
            },
            async getGroupUsers(id) {
                let that = this;
                that.userSelectAllLoading = true;
                let param = {
                    groupId: id
                }
                await usergroup.queryGroupUsers(param).then(function (result) {
                        that.getUsers();
                        that.userSelectAllLoading = false;
                        if (result) {
                            result.forEach(element => {
                                that.update.userIds.push(element.userId);
                            });
                        }
                    },
                    function (err) {
                        that.userSelectAllLoading = false;
                        that.$message.error({
                            showClose: true,
                            message: err.response.data,
                            duration: 2000
                        });
                    });
            },
            isEmail(rule, value, callback) {
                var regEmail = /^[\.A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
                if (!regEmail.test(value)) {
                    return callback(new Error());
                }
                return callback();
            },
            updateUserGroup() {
                let that = this;
                that.$refs.update.validate((valid) => {
                    if (valid) {
                        that.updateLoading = true;
                        usergroup.updateUserGroup(that.update).then(res => {
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
            }
        },
        mounted() {
            this.status = commConst.status;
            this.getUserGroups();
        }
    }
</script>