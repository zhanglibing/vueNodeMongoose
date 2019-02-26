/** 2018/12/7
 *author:zhanglibing
 *email:1053081179@qq.com
 *功能:
 */
import {axios} from './Ajax'

//注册
async function reg(params) {
  return new Promise((resolve, reject) => {
    axios.post('user/register', params).then(res => {
      let {code} = res;
      if (code==0) {
         resolve(res)
      }
      reject(res)
    })
  })
}

//登录
async function login(params) {
  return new Promise((resolve, reject) => {
    axios.post('user/login', params).then(res => {
      let {code} = res;
      if (code==0) {
         resolve(res)
      }
      reject(res)
    })
  })
}

export default {
  reg,
  login
}
