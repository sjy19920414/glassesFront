import * as api from '../api';


export default{

    queryGoods: params => {
        return api.POST('/api/v1/stock/list', params)
    },
    createGoods: params => {
        return api.POST('/api/v1/stock/create', params)
    },
    updateGoods:params=>{
        return api.PUT('/api/v1/stock/update', params)
    },
    deleteGoods:params=>{
        return api.DELETE('/api/v1/stock/delete', params)
    }
}
