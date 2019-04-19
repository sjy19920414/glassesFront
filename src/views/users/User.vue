<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">
                <el-form-item>
                    <el-input type="text" v-model="filters.userId" :placeholder="$t('user.userId')" style="width:280px">
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-input type="text" v-model="filters.userName" :placeholder="$t('user.userName')"
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
                    <el-button type="primary" @click="dialogCreateVisible = true">{{$t('common.create')}}</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <!--列表-->
        <el-table :data="users" highlight-current-row v-loading="listLoading" @selection-change="selsChange"
             style="width: 100%;">
            <el-table-column prop="userId" :label="$t('user.userId')" width="280">
            </el-table-column>
            <el-table-column prop="userName" :label="$t('user.userName')" width="170">
            </el-table-column>
            <el-table-column prop="email" :label="$t('user.email')" width="320">
            </el-table-column>
            <el-table-column prop="status" :formatter="formatStatus" :label="$t('common.status')" width="150" sortable>
            </el-table-column>
            <el-table-column :label="$t('common.operation')" width="80">
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

        <el-dialog :title="$t('user.createUser')" :visible="dialogCreateVisible" :close-on-click-modal="false"
            :close-on-press-escape="false" :show-close= "false">
            <el-form id="#create" :model="create" :rules="createRules" ref="create" label-width="100px">
                <el-form-item :label="$t('user.userName')" prop="userName">
                    <el-input v-model="create.userName" type="text"></el-input>
                </el-form-item>
                <el-form-item :label="$t('user.email')" prop="email">
                    <el-input v-model="create.email" type="text"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogCreateVisible = false">{{$t('common.cancel')}}</el-button>
                <el-button type="primary" :loading="createLoading" @click="createUser">{{$t('common.confirm')}}
                </el-button>
            </div>
        </el-dialog>

        <!-- 修改用户 begin-->
        <el-dialog :title="$t('user.updateUser')" :visible.sync="dialogUpdateVisible" :close-on-click-modal="false"
            :close-on-press-escape="false">
            <el-form id="#update" :model="update" :rules="updateRules" ref="update" label-width="100px">
                <el-form-item :label="$t('user.userId')" prop="userId">
                    <el-input v-model="update.userId" type="text" readonly="readonly"></el-input>
                </el-form-item>
                <el-form-item :label="$t('user.userName')" prop="userName">
                    <el-input v-model="update.userName" type="text"></el-input>
                </el-form-item>
                <el-form-item :label="$t('user.email')" prop="email">
                    <el-input v-model="update.email" type="text"></el-input>
                </el-form-item>
                <el-form-item :label="$t('common.status')" prop="status">
                    <el-select v-model="update.status" clearable>
                        <el-option v-for="item in status" :key="item.value" :label="$t(item.name)" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogUpdateVisible = false">{{$t('common.cancel')}}</el-button>
                <el-button type="primary" :loading="updateLoading" @click="updateUser">{{$t('common.confirm')}}
                </el-button>
            </div>
        </el-dialog>

    </section>
</template>

<script>
    //import NProgress from 'nprogress'
    import user from '../../api/user/user';
    import commConst from '../../constants/commConst';
    import util from '../../common/js/util';

    export default {
        data() {
            return {
                filters: {
                    userId: '',
                    userName: '',
                    email: '',
                    status: ''
                },
                create: {
                    userName: '',
                    email: ''
                },
                update: {
                    userId: '',
                    userName: '',
                    email: '',
                    status: ''
                },
                createRules: {
                    userName: [{
                        required: true,
                        message: this.$t('userRules.userNameNotNull'),
                        trigger: 'blur'
                    }],
                    email: [{
                        required: true,
                        message: this.$t('userRules.emailNotNull'),
                        trigger: 'blur'
                    }, {
                        validator: this.isEmail,
                        trigger: 'blur',
                        message: this.$t('userRules.emailNotRegex')
                    }]
                },
                updateRules: {
                    userName: [{
                        required: true,
                        message: this.$t('userRules.userNameNotNull'),
                        trigger: 'blur'
                    }],
                    email: [{
                        required: true,
                        message: this.$t('userRules.emailNotNull'),
                        trigger: 'blur'
                    }, {
                        validator: this.isEmail,
                        trigger: 'blur',
                        message: this.$t('userRules.emailNotRegex')
                    }],
                    status: [{
                        required: true,
                        message: this.$t('userRules.statusNotNull'),
                        trigger: 'blur'
                    }]
                },
                status: [],
                users: [],
                total: 0,
                page: 1,
                listLoading: false,
                createLoading: false,
                updateLoading: false,
                dialogCreateVisible: false, //创建对话框的显示状态
                dialogUpdateVisible: false, //编辑对话框的显示状态1
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
                this.update = row;
                this.dialogUpdateVisible = true;
            },
            // 重置表单
            reset() {
                this.$refs.create.resetFields();
            },
            handleSearch() {
                this.total = 0;
                this.page = 1;
                this.getUsers();
            },
            getUsers() {
                let that = this;
                let para = {
                    page: that.page,
                    limit: that.limit,
                    userId: that.filters.userId,
                    userName: that.filters.userName,
                    status: that.filters.status,
                };
                that.listLoading = true;
                user.queryUsers(para).then(function (result) {
                    that.listLoading = false;
                    if (result) {
                        that.total = result.total;
                        that.users = result.list;
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
            createUser() {
                let that = this;
                that.$refs.create.validate((valid) => {
                    if (valid) {
                        that.createLoading = true;
                        user.createUser(this.create).then(res => {
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
                        return false;
                    }
                });
            },
            updateUser() {
                let that = this;
                that.$refs.update.validate((valid) => {
                    if (valid) {
                        that.updateLoading = true;
                        user.updateUser(that.update).then(res => {
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
            this.getUsers();
        }
    }
</script>