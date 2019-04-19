import * as api from '../api';

export default{

    queryUsers: params => {
        return api.POST('/api/v1/users', params)
    },
    createUser: params => {
        return api.POST('/api/v1/user/create', params)
    },
    updateUser:params=>{
        return api.PUT('/api/v1/user/update', params)
    }
}
