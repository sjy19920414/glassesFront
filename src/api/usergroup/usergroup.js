import * as api from '../api';

export default{

    queryUserGroups: params => {
        return api.POST('/api/v1/userGroups', params)
    },
    createUserGroup: params => {
        return api.POST('/api/v1/userGroup/create', params)
    },
    updateUserGroup:params=>{
        return api.PUT('/api/v1/userGroup/update', params)
    },
    queryGroupUsers:params=>{
        return api.GET('/api/v1/userGroup/users', params)
    }
}
