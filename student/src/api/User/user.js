import  {base, service} from '../api';


export const getUserinfo = params => {
  return service.post(`${base}/tOssstu/getUserinfo`, params);
};
