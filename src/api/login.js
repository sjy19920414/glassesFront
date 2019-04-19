import * as api from '../api/api';
export default{
    login: params => {
        return api.POST('api/v1/login', params)
    }
}