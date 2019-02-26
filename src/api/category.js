/** 2018/12/7
 *author:zhanglibing
 *email:1053081179@qq.com
 *功能:
 */
import {axios} from './Ajax'

//注册
async function addCategory(name) {
  return new Promise((resolve, reject) => {
    axios.post('category/add', {name}).then(res => {
      let {code} = res;
      if (code==0) {
        resolve(res)
      }
      reject(res)
    })
  })
}

//获取类别列表
async function getList(params) {
  return new Promise((resolve, reject) => {
    axios.get('category/list', {params}).then(res => {
      let {code} = res;
      if (code==0) {
        resolve(res)
      }
      reject(res)
    })
  })
}

//删除类别
async function deleteById(id) {
  return new Promise((resolve, reject) => {
    axios.post('category/deleteById', {id}).then(res => {
      let {code} = res;
      if (code==0) {
        resolve(res)
      }
      reject(res)
    })
  })
}
//删除类别
async function getById(id) {
  return new Promise((resolve, reject) => {
    axios.get('category/getById', {params:{id}}).then(res => {
      let {code} = res;
      if (code==0) {
        resolve(res)
      }
      reject(res)
    })
  })
}

//删除类别
async function updateCategory(params) {
  return new Promise((resolve, reject) => {
    axios.post('category/update', params).then(res => {
      let {code} = res;
      if (code==0) {
        resolve(res)
      }
      reject(res)
    })
  })
}
export default {
  addCategory,
  getList,
  deleteById,
  getById,
  updateCategory
}
