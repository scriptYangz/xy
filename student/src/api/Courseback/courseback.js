import  {base, service} from '../api';

export const sumList = function(params){
	return service.post(`${base}/summary/tCourseback/list`, params)
}
export const sumSelect = function(params){
	return service.post(`${base}/summary/tCourseback/select`, params)
}
export const sumLnsert = function(params){
	return service.post(`${base}/summary/tCourseback/insert`, params)
}
export const sumDelect = function(params){
	return service.post(`${base}/summary/tCourseback/delete`, params)
}
export const sumUpdate = function(params){
	return service.post(`${base}/summary/tCourseback/update`, params)
}


export const student = function(params){
	return service.get('static/student.json', params)
}
