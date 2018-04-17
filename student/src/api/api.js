import axios from 'axios';//引入axios

//const base = "http://192.168.31.173:8083";//把后台接口赋值给base
//const base = "http://192.168.92.128:8083";//把后台接口赋值给base
const base = "http://127.0.0.1:8083"
// const base = "http://jason2c4.free.ngrok.cc/";
// 创建axios实例
const service = axios.create({
    timeout: 5000                  // 请求超时时间
});
//请求拦截器
service.interceptors.request.use(
  config => {
  	//除了登录页，都要带userid
    if (!( config.url.lastIndexOf('/login') > -1)) {
      config.headers.userid = sessionStorage.getItem('userid')
    }
    return config;
  },
  error => {
    console.log('err' + error);// for debug
    return Promise.reject(err);
  });
//响应拦截器
service.interceptors.response.use(
  response => {
    const res = response.data;
    //超时
    // if (res.code == constant.RESULT_CODE_TAKENTIMEOUT) {
    //   sessionStorage.removeItem('token');
    //   sessionStorage.removeItem('exp');
    //   sessionStorage.removeItem('routesitems');
    //   sessionStorage.removeItem('userInfo');
    //   router.replace("/login");
    // }
    return response;
  },
  error => {
    return Promise.reject(error.response);   // 返回接口返回的错误信息
  });

export{base, service}
