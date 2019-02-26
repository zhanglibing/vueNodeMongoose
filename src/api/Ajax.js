import axios from 'axios'
import qs from 'qs'

const apiHost = 'http://127.0.0.1:8081/api/'
// const apiHost = 'http://39.106.121.36:8080/api/'
// const apiHost = '/api/'
axios.defaults.baseURL = apiHost;
axios.defaults.timeout = 500000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8','xml';//POST传参序列化
axios.interceptors.request.use((config) => {
  if (config.method === 'post') {
    config.data = qs.stringify(config.data);
  }
  return config;
}, (error) => {
  alert("错误的传参");
  return Promise.reject(error);
});

//请求成功统一操作 返回值
axios.interceptors.response.use(response=> {
  // console.log(response)
// 对响应数据做点什么
  return response.data;
}, err=>{
  if (err && err.response) {
    switch (err.response.status) {
      case 400: err.message = '请求错误(400)' ; break;
      case 401: err.message = '未授权，请重新登录(401)'; break;
      case 403: err.message = '拒绝访问(403)'; break;
      case 404: err.message = '请求出错(404)'; break;
      case 408: err.message = '请求超时(408)'; break;
      case 500: err.message = '服务器错误(500)'; break;
      case 501: err.message = '服务未实现(501)'; break;
      case 502: err.message = '网络错误(502)'; break;
      case 503: err.message = '服务不可用(503)'; break;
      case 504: err.message = '网络超时(504)'; break;
      case 505: err.message = 'HTTP版本不受支持(505)'; break;
      default: err.message = `连接出错(${err.response.status})!`;
    }
  }else{
    err.message = '连接服务器失败!'
  }
  // message.error(err.message);
  return Promise.reject(err);
});

export {
  axios,
  apiHost
}
