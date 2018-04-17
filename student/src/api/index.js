import  {base, service} from './api';


export const login = params => {
    return service.post(`${base}/tOssstu/login`, params).then(res => res.data);
};
