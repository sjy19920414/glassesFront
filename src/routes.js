import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import StockIn from './views/stockIn/StockIn.vue'

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
        iconCls: 'fa fa-shopping-basket',
        leaf: true,
        children: [{
            path: '/stockIn',
            component: StockIn,
            name: 'menu.goodsManagement'
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