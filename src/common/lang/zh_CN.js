module.exports = {
    menu: {
        logSystem: 'MULE ESB 日志管理系统',
        logQuery: 'MULE ESB 日志查询',
        itfLogQuery: 'MULE ESB接口日志查询',
        taskLogQuery: 'MULE ESB定时任务日志查询',
        confManage: '接口/定时任务 配置管理',
        itfConfig: 'MULE ESB接口配置',
        itfLogQueryDetail: '接口调用日志详情',
        taskLogQueryDetail: '任务日志调用详情',
        taskConfig: 'MULE ESB定时任务配置',
        userGroupManage: '用户组管理',
        userManage: '用户管理'
    },
    common: {
        loading: '加载中。。。',
        search: '查询',
        to: '至',
        startTime: '开始时间',
        endTime: '结束时间',
        createDate: '创建时间',
        error: {
            positiveInteger: '请输入正整数'
        },
        status: '状态',
        apply: '申请',
        operation: '操作',
        request: {
            error: '后台交互异常'
        },
        detail: '查看详情',
        save: '保存',
        pass: '通过',
        refuse: '拒绝',
        user: '用户',
        create: '新增',
        confirm: "确定",
        cancel: "取消",
        resend: "重试",
        remark: "备注",
        refresh: '刷新',
        edit: '编辑',
        yes: '是',
        no: '否',
        createSuccess: '创建成功',
        updateSuccess: '修改成功',
        back: '返回',
        switchlan:'中/EN',
    },
    cache: {
        cacheId: '缓存ID',
        implClass: '缓存实现类',
        expireTime: '超时时间'
    },
    date: {
        latestWeek: '最近一周',
        latestMonth: '最近一个月',
        latest3Months: '最近三个月'
    },
    itfLog: {
        flowId: '接口编码',
        flowName: '接口名称',
        requestId: '请求ID',
        createDate: '创建时间',
        exeState: '执行状态',
        requestBody: '请求体',
        queryParams: '请求参数',
        updateTime: '更新时间',
        srcSys: '源系统',
        destSys: '目标系统',
        confirmResend: '此操作将重新调用该接口, 是否继续?',
        tip: '提示',
        resendSuccess: '重试成功',
        resendCancel: '重试已取消',
        protocol: '协议',
        ipAddr: 'IP地址',
        port: '端口',
        method: '请求方式',
        api: '请求路径',
        process: '当前步骤',
        message: '异常信息',
        createItfConf: '新增接口配置',
        updateItfConf: '修改接口配置',
        logProcess:'接口调用明细',
        logDetail:'接口详情'
    },
    taskLog:{
        taskCode: '任务编码',
        logId: '日志ID',
        taskName: '任务名称',
        cron: '执行周期',
        extraMinutes: '预估执行时间(分)',
        logProcess:'任务调用明细',
        taskDetail:'任务详情',
        createTaskConf: '新增接口配置',
        updateTaskConf: '修改接口配置'
    },
    itfRules: {
        flowIdNotNull: '接口编码不能为空',
        flowNameNotNull: '接口名称不能为空',
        protocolNotNull: '接口协议不能为空',
        ipAddrNotNull: '接口IP地址不能为空',
        portNotNull: '端口不能为空',
        methodNotNull: '请求类型不能为空',
        portIsNumber: '接口编码应为0~65535之间的整数',
        apiNotNull: '请求路径不能为空',
        resendNotNull: '是否重试不能为空',
        statusNotNull: '状态不能为空',
        remarkNotNull: '接口描述不能为空'
    },
    taskRules: {
        taskCodeNotNull: '定时任务编码不能为空',
        taskNameNotNull: '定时任务名称不能为空',
        cronNotNull: '执行周期不能为空',
        cronNotValid: '执行周期不合法',
        extraMinutesIsNumber: '执行时间必须为数字',
        statusNotNull: '状态不能为空',
        remarkNotNull: '任务描述不能为空'
    },
    exeState: {
        IN_PROCESS: '处理中',
        FINISH: '调用成功',
        RESEND: '已重试',
        EXCEPTION: '调用异常'
    },
    status: {
        available: '可用',
        del: '不可用'
    },
    login: {
        login: '登录',
        rememberPwd: '记住密码',
        pwd: '密码',
        account: '账号'
    },
    user:{
        userId: '用户ID',
        userName: '用户名',
        email: '邮件地址',
        updateUser: '修改用户信息',
        createUser: '创建用户'
    },
    userRules: {
        userNameNotNull: '用户名不能为空',
        emailNotNull: '邮件地址不能为空',
        statusNotNull: '状态不能为空',
        emailNotRegex: '邮件地址格式不正确'
    },
    usergroup: {
        name: '用户组',
        createUserGroup: '创建用户组',
        updateUserGroup: '更新用户组',
        groupId: '用户组ID',
        groupName: '用户组名称',
        userIds: '用户清单',
        selectedUser: '已选择',
        unSelectedUser: '未选择'
    },
    userGroupRules:{
        groupNameNotNull: '用户组名称不能为空'
    }
};
