import store from '../../vuex/store'
//保存用户信息
function saveUserInfo(data) {
  let {customer,AvatarUrl,Gender,IdPictureUrl,IdPicture1Url,ProfessionalLicensesUrl,dateOfBirth} = data;
  var Roles = customer.CustomerRoles[0]; //专家时数组有两个值 第一个暂时是最新的
  let {Id,Email,QQ,NickName,RealName,Username,StatusForConsultant,WeChat,CustomerGuid,ConsultantInfo,CustomerBalance}=customer

  let weChatInfo = JSON.parse(sessionStorage.getItem("wx_info"))
  if(weChatInfo){  //微信扫码登录 以前没有信息的完善信息
     let {unionid, sex, nickname, headimgurl} = weChatInfo;
     sex=Gender==1?'M':'F';
     Gender=Gender?Gender:sex;
     NickName=NickName?NickName:nickname;
     AvatarUrl=AvatarUrl?AvatarUrl:headimgurl;
  }
  var obj = {
    AvatarUrl,IdPictureUrl,IdPicture1Url,ProfessionalLicensesUrl,
    Email,QQ,NickName,RealName,Username,CustomerGuid,Gender,
    customerId:Id,
    SystemName: Roles.SystemName,//Registered:用户   Consultant:咨询师
    StatusForConsultant,  //审核到第几部 0、null未审核  1第一步审核完
    WeChat,
    Birthday:dateOfBirth,
    ...ConsultantInfo,
    ...customer.Addresses[0],
    CustomerBalance,
  };
  // store.commit('setAvatarUrl',AvatarUrl)
  store.commit('setUserId', obj.customerId)
  store.commit('setCustomerBalance', obj.CustomerBalance?obj.CustomerBalance:0)
  sessionStorage.setItem("ss_userInfo", JSON.stringify(obj));
}
//获取用户信息
function getUserInfo() {
  return JSON.parse(sessionStorage.getItem("ss_userInfo")); //将字符串转换为数组
}
//替换保存的信息
function replaceUserInfo(data){
  let OldUserInfo=getUserInfo();
  let newObj = Object.assign({},OldUserInfo,data)
  sessionStorage.setItem("ss_userInfo", JSON.stringify(newObj));
}
function setCookie(name, value) {
  var Days = 3;
  var exp = new Date();
  exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
  document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}

export {
  saveUserInfo,
  getUserInfo,
  setCookie,
  replaceUserInfo
}
