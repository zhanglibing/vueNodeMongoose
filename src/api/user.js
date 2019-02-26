/** 2018/12/7
 *author:zhanglibing
 *email:1053081179@qq.com
 *功能:
 */
import {axios} from './Ajax'

//获取用户列表
async function getUserList(option) {
  return new Promise((resolve, reject) => {
    axios.get('user/userList', {params:option}).then(res => {
      let {code} = res;
      if (code==0) {
        resolve(res)
      }
      reject(res)
    })
  })
}
//删除用户
async function deleteById(id) {
  return new Promise((resolve, reject) => {
    axios.post('user/deleteById', {id}).then(res => {
      let {code} = res;
      if (code==0) {
        resolve(res)
      }
      reject(res)
    })
  })
}


export default {
  getUserList,
  deleteById
}
