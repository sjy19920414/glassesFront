import * as api from '../api';


export default{

    queryOrder: params => {
        return api.POST('/api/v1/order/list', params)
    },
    queryOrderDetail: params => {
        return api.GET('/api/v1/order/detail', params)
    },
    createOrder: params => {
        return api.POST('/api/v1/order/create', params)
    },
    refundOrder:params=>{
        return api.PUT('/api/v1/order/refund', params)
    }
    
}
