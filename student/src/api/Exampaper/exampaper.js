import  {base, service} from '../api';

export const listExampaper = params => {
  return service.post(`${base}/teExampaper/listExampaper`, params)
};
