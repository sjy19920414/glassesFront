    module.exports = {
        menu: {
            goodsManagement: '商品管理',
            glassesManagement: '方明视光管理平台',
            vipManagement: '会员管理',
            orderManagement: '订单管理'
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
            deleteSuccess: '删除成功',
            back: '返回',
            switchlan:'中/EN',
            preview: '预览',
            delete: '删除',
            logout: '退出',
            refund: '退单',
            add: '添加',
            refundSuccess: '退单成功'
        },
        date: {
            latestWeek: '最近一周',
            latestMonth: '最近一个月',
            latest3Months: '最近三个月'
        },
        login: {
            login: '登录',
            rememberPwd: '记住密码',
            pwd: '密码',
            account: '账号'
        },
        stockIn: {
            goodsId: '商品ID',
            goodsName: '商品名称',
            goodsType: '商品型号',
            goodsColor: '商品色号',
            goodsPrice: '销售价格（元）',
            goodsNums: '商品库存',
            goodsInPrice: '商品进货价（元）',
            goodsFrom: '进货渠道',
            create: '增加商品',
            usePoints: '参与活动',
            update: '修改商品',
            delete: '删除商品',
            deleteGoods: '即将删除该商品，是否确定？'
        },
        stockInRules: {
            goodsNameNotNull: '商品名称不能为空',
            goodsPriceNotNull: '销售价不能为空',
            goodsPriceRegex: '销售价格式不正确',
            goodsInPriceNotNull: '进货价不能为空',
            goodsInPriceRegex: '进货价格式不正确',
        },
        vip: {
            vipName: '会员名称',
            vipPhone: '会员电话',
            vipBirthDate: '会员生日',
            vipPoints: '会员积分',
            vipRemark: '备注',
            create: '添加新会员',
            showRemark: '显示备注',
            noRemark: '对不起，该会员没有备注',
            update: '修改会员信息',
            delete: '删除会员信息',
            deleteVip: '请问是否确定删除该会员信息？'
        },
        vipRules: {
            vipNameNotNull: '会员名称不能为空!',
            vipPhoneNotNull: '会员电话不能为空!',
            vipPhoneNotRegex: '会员电话格式不正确'
        },
        error: {
            picJPGOnly:'上传头像图片只能是 JPG 格式!',
            picLessThanTwo:'上传头像图片大小不能超过 2MB!'
        },
        order: {
            orderId: '订单号',
            vipName: '会员名',
            createDate: '销售时间',
            payMoney: '原价（元）',
            payOff: '折扣',
            usePoints: '使用积分',
            getPoints: '获得积分',
            payOffMoney: '折扣价（元）',
            realPayMoney: '实付款（元）',
            userName: '售货人',
            create: '新建订单',
            detail: '订单详情',
            goodsNum: '数量',
            refundOrder: '即将撤销订单，是否确认？',
            goodsDetail: '商品详情',
            showDetail: '查看商品',
            signal: '元',
            mostPoints: '最多可用积分',
            orderStatus: '订单状态',
            status: {
                yes: '正常',
                no: '退单'
            }
        },
        orderRules: {
            payOffCannotNull: '折扣不能为空!',
            goodsListCannotNull: '至少选择一个商品'
        }
    };
