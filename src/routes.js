import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
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