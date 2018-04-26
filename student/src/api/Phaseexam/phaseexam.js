import  {base, service} from '../api';


export const listExampaper = params => {
  return service.post(`${base}/teExampaper/listExampaper`, params)
};

export const insertanswer = params => {
    return service.post(`${base}/teExampaper/saveExpAnrs`, params)
};


