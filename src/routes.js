import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import ItfLogQuery from './views/itfLog/ItfLogQuery'
import itfLogQueryDetail from './views/itfLog/itfLogQueryDetail'
import itfLogConf from './views/itfconfig/itfLogConf'
import taskLogQuery from './views/taskLog/taskLogQuery'
import taskLogQueryDetail from './views/taskLog/taskLogQueryDetail'
import taskLogConf from './views/taskconfig/taskLogConf'
import User from './views/users/User.vue'
import UserGroup from './views/usergroups/UserGroup.vue'

let routes = [{
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    {
        path: '/',
        component: Home,
        name: 'menu.logQuery',
        iconCls: 'el-icon-message', //图标样式class
        children: [{
                path: '/itfLogQuery',
                component: ItfLogQuery,
                name: 'menu.itfLogQuery',
                meta: {
                    keepAlive: true,
                    isCache: true
                }
            },
            {
                path: '/itfLogQueryDetail',
                component: itfLogQueryDetail,
                name: 'menu.itfLogQueryDetail',
                hidden: true
            },
            {
                path: '/taskLogQuery',
                component: taskLogQuery,
                name: 'menu.taskLogQuery',
                meta: {
                    keepAlive: true,
                    isCache: true
                }
            },
            {
                path: '/taskLogQueryDetail',
                component: taskLogQueryDetail,
                name: 'menu.taskLogQueryDetail',
                hidden: true
            }
        ]
    },
    {
        path: '/',
        component: Home,
        name: 'menu.confManage',
        iconCls: 'el-icon-message', //图标样式class
        children: [{
                path: '/itfConf',
                component: itfLogConf,
                name: 'menu.itfConfig'
            },
            {
                path: '/taskConfig',
                component: taskLogConf,
                name: 'menu.taskConfig'
            }
        ]
    },
    {
        path: '/',
        component: Home,
        iconCls: 'fa fa-user',
        leaf: true,
        children: [{
            path: '/users',
            component: User,
            name: 'menu.userManage'
        }]
    },
    {
        path: '/',
        component: Home,
        iconCls: 'fa fa-users',
        leaf: true,
        children: [{
            path: '/usergroups',
            component: UserGroup,
            name: 'menu.userGroupManage'
        }]
    },
    {
        path: '*',
        hidden: true,
        redirect: {
            path: '/404'
        }
    }
];

export default routes;