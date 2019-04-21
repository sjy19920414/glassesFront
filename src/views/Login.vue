<template>
    <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-position="left"
        label-width="0px"
        class="demo-ruleForm login-container">
        <h3 class="title">系统登录</h3>
        <el-form-item prop="account">
            <el-input
                type="text"
                v-model="ruleForm.account"
                auto-complete="off"
                :placeholder="$t('login.account')"></el-input>
        </el-form-item>
        <el-form-item prop="checkPass">
            <el-input
                type="password"
                v-model="ruleForm.checkPass"
                auto-complete="off"
                :placeholder="$t('login.pwd')"></el-input>
        </el-form-item>
        <el-checkbox v-model="checked" checked="checked" class="remember">{{$t('login.rememberPwd')}}</el-checkbox>
        <el-form-item style="width:100%;">
            <el-button
                type="primary"
                style="width:100%;"
                @click.native.prevent="handleSubmit"
                :loading="logining">{{$t('login.login')}}</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    import login from '../api/login';
    export default {
        data() {
            return {
                logining: false,
                ruleForm: {
                    account: '',
                    checkPass: ''
                },
                rules: {
                    account: [
                        {
                            required: true,
                            message: '请输入账号',
                            trigger: 'blur'
                        },
                        //{ validator: validaePass }
                    ],
                    checkPass: [
                        {
                            required: true,
                            message: '请输入密码',
                            trigger: 'blur'
                        },
                        //{ validator: validaePass2 }
                    ]
                },
                checked: true
            };
        },
        methods: {
            handleSubmit(ev) {
                var _this = this;
                this
                    .$refs
                    .ruleForm
                    .validate((valid) => {
                        if (valid) {
                            //_this.$router.replace('/table');
                            _this.logining = true;
                            var loginParams = {
                                username: this.ruleForm.account,
                                password: this.ruleForm.checkPass
                            };
                            login
                                .login(loginParams)
                                .then(data => {
                                    _this.logining = false;
                                    if (data && data.userId) {
                                        sessionStorage.setItem('user', JSON.stringify(data));
                                        _this
                                            .$router
                                            .push({path: '/stockIn'});
                                    }
                                }, function (err) {
                                    _this.logining = false;
                                    _this
                                        .$message
                                        .error({showClose: true, message: err.response.data, duration: 2000});
                                });
                        } else {
                            console.log('error submit!!');
                            return false;
                        }
                    });
            }
        }
    }
</script>