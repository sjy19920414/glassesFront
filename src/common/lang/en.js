module.exports = {
    menu: {
        logQuery: 'LOG QUERY',
        logSystem: 'MULE ESB LOG MANAGE SYSTEM',
        itfLogQuery: 'MULE ESB INTERFACE LOG QUERY',
        taskLogQuery: 'MULE ESB TASK LOG QUERY',
        itfLogQueryDetail: 'INTERFACE LOG QUERY DETAIL',
        taskLogQueryDetail: 'TASK LOG QUERY DETAIL',
        confManage: 'CONFIGURATION',
        itfConfig: 'MULE ESB INTERFACE CONFIGURATION',
        taskConfig: 'MULE ESB TASK CONFIGURATION',
        userGroupManage: 'USER GROUP MANAGEMENT',
        userManage: 'USER MANAGEMENT'
    },
    common: {
        loading: 'Loading...',
        search: 'Search',
        to: 'To',
        startTime: 'Start Time',
        endTime: 'End Time',
        createDate: 'CREATE DATE',
        error: {
            positiveInteger: 'Please input positive integer.'
        },
        status: 'Status',
        apply: 'Apply',
        operation: 'Operation',
        request: {
            error: 'Send request to backend error.'
        },
        detail: 'VIEW DETAIL',
        save: 'Save',
        pass: 'Pass',
        refuse: 'Refuse',
        user: 'User',
        create: 'CREATE',
        confirm: "CONFIRM",
        cancel: "CANCEL",
        resend: "RESEND",
        remark: "REMARK",
        refresh: 'REFRESH',
        edit: 'EDIT',
        yes: 'YES',
        no: 'NO',
        createSuccess: 'CREATE SUCCESS',
        updateSuccess: 'UPDATE SUCCESS',
        back: 'BACK',
        switchlan:'中/EN',
    },
    cache: {
        cacheId: 'CACHE ID',
        implClass: 'IMPL CLASS',
        expireTime: 'EXPIRE TIME'
    },
    date: {
        latestWeek: 'LATEST WEEK',
        latestMonth: 'LATEST MONTH',
        latest3Months: 'LATEST 3 MONTHS'
    },
    itfLog: {
        flowId: 'INTERFACE ID',
        flowName: 'INTERFACE NAME',
        requestId: 'REQUEST ID',
        exeState: 'EXE STATE',
        requestBody: 'REQUEST BODY',
        queryParams: 'QUERY PARAMS',
        updateTime: 'UPDATE TIME',
        srcSys: 'SOURCE SYSTEM',
        destSys: 'DESTINATION SYSTEM',
        confirmResend: 'The interface will be recalled, confirm?',
        tip: 'Tips',
        resendSuccess: 'Recalled Success',
        resendCancel: 'Recalled Canceled',
        protocol: 'PROTOCOL',
        ipAddr: 'IP ADDRESS',
        port: 'PORT',
        method: 'METHOD',
        api: 'PATH',
        process: 'PROCESS',
        message: 'EXCEPTION MESSAGE',
        createItfConf: 'CREATE INTERFACE CONFIG',
        updateItfConf: 'UPDATE INTERFACE CONFIG',
        logProcess:'INTERFACE CALL PROCESS',
        logDetail:'INTERFACE DETAIL'
    },
    taskLog:{
        taskCode: 'TASK CODE',
        logId: 'LOG ID',
        taskName: 'TASK NAME',
        cron: 'CRON',
        extraMinutes: 'EXTRA MINUTES(UNIT:MIN)',
        logProcess:'TASK CALL PROCESS',
        taskDetail:'TASK DETAIL',
        createTaskConf: 'CREATE TASK CONFIG',
        updateTaskConf: 'UPDATE TASK CONFIG'
    },
    exeState: {
        IN_PROCESS: 'IN PROCESSING',
        FINISH: 'FINISH',
        RESEND: 'RESEND',
        EXCEPTION: 'EXCEPTION'
    },
    status: {
        available: 'AVAILABLE',
        del: 'DISABLED'
    },
    login: {
        login: 'Login',
        rememberPwd: 'REMEMBER PASSWORD',
        pwd: 'PASSWORD',
        account: 'ACCOUNT'
    },
    itfRules: {
        flowIdNotNull: 'INTERFACE CODE SHOULD NOT BE NULL',
        flowNameNotNull: 'INTERFACE NAME SHOULD NOT BE NULL',
        protocolNotNull: 'PROTOCOL SHOULD NOT BE NULL',
        ipAddrNotNull: 'IP ADDRESS SHOULD NOT BE NULL',
        portNotNull: 'PORT SHOULD NOT BE NULL',
        methodNotNull: 'METHOD SHOULD NOT BE NULL',
        portIsNumber: 'PORT SHOULD BE A POSITIVE INTEGER BETWEEN 0 AND 65535',
        apiNotNull: 'RELATIVE PATH SHOULD NOT BE NULL',
        resendNotNull: 'RESEND SHOULD NOT BE NULL',
        statusNotNull: 'STATUS SHOULD NOT BE NULL',
        remarkNotNull: 'REMARK SHOULD NOT BE NULL'
    },
    taskRules: {
        taskCodeNotNull: 'TASK CODE SHOULD NOT BE NULL',
        taskNameNotNull: 'TASK NAME SHOULD NOT BE NULL',
        cronNotNull: 'CRON SHOULD NOT BE NULL',
        extraMinutesIsNumber: 'EXECUTE TIME SHOULD BE NUMBER',
        statusNotNull: 'STATUS SHOULD NOT BE NULL',
        cronNotValid: 'CRON IS NOT VALID',
        remarkNotNull: 'REMARK SHOULD NOT BE NULL'
    },
    user:{
        userId: 'USER ID',
        userName: 'USER NAME',
        email: 'E-MAIL',
        updateUser: 'UPDATE USER',
        createUser: 'CREATE USER'
    },
    userRules: {
        userNameNotNull: 'USER NAME SHOULD NOT BE NULL',
        emailNotNull: 'E-MAIL SHOULD NOT BE NULL',
        statusNotNull: 'STATUS SHOULD NOT BE NULL',
        emailNotRegex: 'E-MAIL FORMAT ERROR'
    },
    usergroup: {
        name: 'USER GROUP',
        createUserGroup: 'CREATE USER GROUP',
        updateUserGroup: 'UPDATE USER GROUP',
        groupId: 'GROUP ID',
        groupName: 'GROUP NAME',
        userIds: 'USER LIST',
        selectedUser: 'SELECTED USER',
        unSelectedUser: 'UNSELECTED USER'
    },
    userGroupRules:{
        groupNameNotNull: 'GROUP NAME SHOULD NOT BE NULL'
    }
};
