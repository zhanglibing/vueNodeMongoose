import {axios} from './Ajax'

//新增内容
async function addContent(params){
  return new Promise((resolve,reject)=>{
    axios.post('content/add', params).then(res => {
      let {code} = res;
      if (code==0) {
        resolve(res)
      }
      reject(res)
    })
  })
}

//新增内容
async function updateContent(params){
  return new Promise((resolve,reject)=>{
    axios.post('content/update', params).then(res => {
      let {code} = res;
      if (code==0) {
        resolve(res)
      }
      reject(res)
    })
  })
}

//新增内容
async function getContentList(params){
  return new Promise((resolve,reject)=>{
    axios.get('content/list', {params}).then(res => {
      let {code} = res;
      if (code==0) {
        resolve(res)
      }
      reject(res)
    })
  })
}
//内容详情
async function getById(id){
  return new Promise((resolve,reject)=>{
    axios.get('content/getById', {params:{id}}).then(res => {
      let {code} = res;
      if (code==0) {
        resolve(res.info)
      }
      reject(res)
    })
  })
}

//内容详情
async function deleteById(id){
  return new Promise((resolve,reject)=>{
    axios.get('content/delete', {params:{id}}).then(res => {
      let {code} = res;
      if (code==0) {
        resolve(res.info)
      }
      reject(res)
    })
  })
}

//新增评论
async function addComment(params){
  return new Promise((resolve,reject)=>{
    axios.post('comment/add', params).then(res => {
      let {code} = res;
      if (code==0) {
        resolve(res)
      }
      reject(res)
    })
  })
}

//获取评论
async function getComment(id){
  return new Promise((resolve,reject)=>{
    axios.get('comment/list', {params:{id}}).then(res => {
      let {code} = res;
      if (code==0) {
        resolve(res.list)
      }
      reject(res)
    })
  })
}

export default {
  addContent,
  updateContent,
  getContentList,
  deleteById,
  getById,
  addComment,
  getComment
}
