import * as api from '../api';

export default{
    /**
     * 根据条件查询api列表
     */
    queryTaskLogs: params => {
        return api.POST('/api/v1/mule/task/logs', params)
    },
    queryTaskConfs: params => {
        return api.POST('/api/v1/mule/task/infos', params)
    },
    createTaskConf:params=>{
        return api.POST('/api/v1/mule/task/create', params)
    },
    updateTaskConf:params=>{
        return api.PUT('/api/v1/mule/task/update', params)
    },
    queryTaskLog: params => {
        return api.GET('/api/v1/mule/task/log', params)
    },
    checkCron:params=>{
        return api.GET('/api/v1/checkCron', params)
    }
}
