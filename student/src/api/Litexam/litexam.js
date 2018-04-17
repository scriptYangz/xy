import  {base, service} from '../api';


export const list = params => {
    return service.post(`${base}/teLitexam/list`, params)
};

export const selectLitexam = params => {
    return service.post(`${base}/teLitexam/selectLitexam`, params)
};

export const insertanswer = params => {
    return service.post(`${base}/teLitexam/insertanswer`, params)
};
