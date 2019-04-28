import * as api from '../api';

export default{

    queryUser: params => {
        return api.POST('/api/v1/user/list', params)
    }
    
}
