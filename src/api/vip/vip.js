import * as api from '../api';


export default{

    queryVip: params => {
        return api.POST('/api/v1/vip/list', params)
    },
    createVip: params => {
        return api.POST('/api/v1/vip/create', params)
    },
    updateVip:params=>{
        return api.PUT('/api/v1/vip/update', params)
    },
    deleteVip:params=>{
        return api.DELETE('/api/v1/vip/delete', params)
    }
    
}
