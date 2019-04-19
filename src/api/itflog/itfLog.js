import * as api from '../api';

export default{
    /**
     * 根据条件查询api列表
     */
    queryItfLogs: params => {
        return api.POST('/api/v1/mule/itf/logs', params)
    },
    queryItfConfs: params => {
        return api.POST('/api/v1/mule/itf/infos', params)
    },
    createItfConf:params=>{
        return api.POST('/api/v1/mule/itf/create', params)
    },
    updateItfConf:params=>{
        return api.PUT('/api/v1/mule/itf/update', params)
    },

    queryItfLog: params => {
        return api.GET('/api/v1/mule/itf/log', params)
    },
    retry: params => {
        return api.GET('/api/v1/mule/itf/retry', params)
    }
}
