module.exports = {
    menu: {
        goodsManagement: 'GOODS MANAGEMENT',
        glassesManagement: 'GLASSES MANAGEMENT SYSTEM',
        vipManagement: 'VIP MANAGEMENT',
        orderManagement: 'ORDER MANAGEMENT'
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
        status: 'STATUS',
        apply: 'APPLY',
        operation: 'OPERATION',
        request: {
            error: 'Send request to backend error.'
        },
        detail: 'VIEW DETAIL',
        save: 'SAVE',
        pass: 'PASS',
        refuse: 'REFUSE',
        user: 'USER',
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
        deleteSuccess: 'DELETE SUCCESS',
        back: 'BACK',
        switchlan:'EN/中',
        preview: 'PREVIEW',
        delete: 'DELETE',
        logout: 'Logout',
        refund: 'Refund',
        add: 'ADD'
    },
    date: {
        latestWeek: 'LATEST WEEK',
        latestMonth: 'LATEST MONTH',
        latest3Months: 'LATEST 3 MONTHS'
    },
    login: {
        login: 'Login',
        rememberPwd: 'REMEMBER PASSWORD',
        pwd: 'PASSWORD',
        account: 'ACCOUNT'
    },
    stockIn: {
        goodsId: 'GOODS ID',
        goodsName: 'GOODS NAME',
        goodsType: 'GOODS TYPE',
        goodsColor: 'GOODS COLOR',
        goodsPrice: 'GOODS PRICE',
        goodsNums: 'GOODS NUMBER',
        goodsInPrice: 'GOODS IN PIRCE',
        goodsFrom: 'SUPPLY CHANNEL',
        create: 'ADD GOODS',
        update: 'UPDATE GOODS',
        usePoints: 'USE POINTS',
        delete: 'DELETE GOODS',
        deleteGoods: 'Are you sure that you want to delete this goods?'
    },
    stockInRules: {
        goodsNameNotNull: 'GOODS NAME CAN NOT EMPTY',
        goodsPriceNotNull: 'GOODS PRICE CAN NOT EMPTY',
        goodsPriceRegex: 'GOODS PRICE INVALID',
        goodsInPriceNotNull: 'GOODS IN PRICE CAN NOT EMPTY',
        goodsInPriceRegex: 'GOODS IN PRICE INVALID',
    },
    vip: {
        vipName: 'VIP NAME',
        vipPhone: 'VIP PHONE',
        vipBirthDate: 'VIP BIRTHDAY',
        vipPoints: 'POINTS',
        vipRemark: 'REMARK',
        create: 'ADD VIP',
        showRemark: 'SHOW REMARK',
        noRemark: 'Sorry, this vip\'s remark is empty',
        update: 'UPDATE VIP',
        delete: 'DELETE VIP',
        deleteVip: 'Are you sure that you want to delete this vip?'
    },
    vipRules: {
        vipNameNotNull: 'VIP NAME CAN NOT EMPTY!',
        vipPhoneNotNull: 'VIP PHONE CAN NOT EMPTY!',
        vipPhoneNotRegex: 'VIP PHONE INVALID'
    },
    error: {
        picJPGOnly:'PICTURE CAN ONLY BE JPG!',
        picLessThanTwo:'PICTURE CAN NOT LARGE THAN 2MB!'
    },
    order: {
        orderId: 'ORDER ID',
        vipName: 'VIP NAME',
        createDate: 'SALE TIME',
        payMoney: 'Orig(￥)',
        payOff: 'OFF',
        usePoints: 'USED POINTS',
        getPoints: 'GOT POINTS',
        payOffMoney: 'OFF PRICE(￥)',
        realPayMoney: 'FIANL PRICE(￥)',
        userName: 'SALER',
        create: 'CREATE ORDER',
        detail: 'ORDER DETAIL',
        goodsNum: 'NUMBERS',
        refundOrder: 'Are you sure that you want to refund this order?',
        goodsDetail: 'GOODS',
        showDetail: 'SHOW GOODS',
        signal: '￥',
        mostPoints: 'USEABLE COUNT'
    },
    orderRules: {
        payOffCannotNull: 'PAY OFF CAN NOT EMPTY!'
    }
};
