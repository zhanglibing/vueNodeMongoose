import $ from 'jquery'
//检查密码格式
function checkPassword(str) {
  if(str.length < 6) {
    return false;
  }
  return true;
}

//获取当前年月日 星期
function getTime(){
  var myDate = new Date();
  var year=myDate.getFullYear();    //获取完整的年份(4位,1970-????)
  var month=myDate.getMonth()+1;       //获取当前月份(0-11,0代表1月)
  var day=myDate.getDate();        //获取当前日(1-31)
  var seven=myDate.getDay();         //获取当前星期X(0-6,0代表星期天)
  var h=myDate.getHours();
  var s=myDate.getMinutes();
  var m=myDate.getSeconds();
  month=(month<10)?("0"+month):month;
  day=(day<10)?("0"+day):day;
  h=(h<10)?("0"+h):h;
  s=(s<10)?("0"+s):s;
  m=(m<10)?("0"+m):m;
  return year+'年'+month+'月'+day+'日 '+h+":"+s;
}


function setTime(val){ //解决日期插件获取北京时间
  var src = new Date(val);
  var dest = new Date(src.getTime() + 8*3600*1000);  //解决8小时时间差   北京时间
  return dest;
}

//图片等比例缩放
function zooming(){
  $('.zooming').each(function(i,v){
    var that=$(this);
    var w = that.width();
    var h = that.height();
    var img=that.find('img');
    var src=img.attr('src');
    var image = new Image();
    image.src=src;
    image.onload = function () {
      var W = image.width;
      var H = image.height;
      if ((w / h) < (W / H)) {
        img.addClass('active');
      } else {
        img.removeClass('active');
      }
    }
  })
}


function textDecode(str){
  if(!str){return "";}
  str = str.replace(/_@/g, '<br/>').replace(/\n/g, '<br/>').replace(/_#/g, '&nbsp;').replace(/\r/g, '&nbsp;');//IE9、FF、chrome
  return str;
}
function textAreaDecode(str){
  str = str.replace(/_@/g, '\n').replace(/_#/g, '\r');
  return str;
}
function textEncode(str){
  str = str.replace(/\n/g, '_@').replace(/\r/g, '_#');
  return str;
}


function checkEmail(str) {
  var str = $.trim(str);
  if (!str) {
    this.$message.error('邮箱不能为空');
    return false;
  }
  var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
  if (!reg.test(str)) {
    this.$message.error('请输入正确的邮箱');
    return false;
  }
  return true;
}
//检验QQ是否正确
function checkQQ(str) {
  var str = $.trim(str);
  if (!str) {
    this.$message.error('QQ不能为空');
    return false;
  }
  if (str.search(/^[1-9]\d{4,9}$/) != -1) {
    return true;
  }
  this.$message.error('请输入正确的QQ');
  return false;
}

function checkPhone(phone) {
  if(!phone){
    this.$message.error('手机号不能为空');
    return false;
  }
  var preg = /^1[3456789]\d{9}$/;
  if (!preg.test(phone)) {
    this.$message.error('请输入正确手机号码');
    return false;
  }
  return true;
}

//保存订单信息
function saveOrderInfo(data) {
  sessionStorage.setItem("ss_OrderInfo", JSON.stringify(data));
}
//获取订单信息
function getOrderInfo() {
  return JSON.parse(sessionStorage.getItem("ss_OrderInfo")); //将字符串转换为数组
}
//替换保存的信息
function replaceOrderInfo(data){
  let OldOrderInfo=getOrderInfo();
  let newObj = Object.assign({},OldOrderInfo,data)
  sessionStorage.setItem("ss_OrderInfo", JSON.stringify(newObj));
}


//将图片链接转化为base64字符串
function getImgToBase64(imgPath) {
  const promise = new Promise((resolve, reject) => {
//新建图片
    let image = new Image();
    // image.src =  ;
    image.src = imgPath;
    //解决canvas无法读取画布问题
    image.setAttribute('crossOrigin', 'anonymous');
    //通加载图片完毕保证快速读取
    image.onload = () => {
      let canvas = document.createElement("canvas");
      canvas.width = image.width;
      canvas.height = image.height;
      let ctx = canvas.getContext("2d");
      ctx.drawImage(image, 0, 0, image.width, image.height);
      let ext = image.src.substring(image.src.lastIndexOf(".") + 1).toLowerCase();
      let dataURL = canvas.toDataURL("image/jpeg");
      resolve(dataURL);
    }
  })
  return promise;
}
function GetCookie(name){
  var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
  if(arr=document.cookie.match(reg)){
    return unescape(arr[2]);
  }
  else{
    return null;
  }
}
function SetCookie(name, value) {
  // var Days = 3;
  var exp = new Date();
  // exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
  exp.setTime(exp.getTime() +  30 * 1000);  //存30秒
  document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}

//判断是否为微信浏览器
function IsWeiXin(){
  var ua = window.navigator.userAgent.toLowerCase();
  if(ua.match(/MicroMessenger/i) == 'micromessenger'){
    return true;
  }else{
    return false;
  }
}

//微信调用权限 公用
function WeChatLogin(){
  let option = {
    redirect_uri: 'http://www.jizhaojk.com/phone/#/login',
    state: '0'
  }
  this.$http.post('WXLogin/WXmpLogin', option).then(res => {
    let {Code, WXmpLogin} = res.data;
    console.log('微信登录返回信息')
    console.log(WXmpLogin)
    if (Code == 200) {
      let timer = setInterval(() => { //开始轮询是否扫码成功
        let islogin = GetCookie('isWeChat');
        if (islogin) {
          clearInterval(timer);
          window.close();
        }
      }, 100)
      window.location.href=WXmpLogin;
      // window.open(WXmpLogin, '_blank')
    }
  })
}



//分享配置
function GetShareConfig(lastUrl,img){
  return {
    url                 : `http://www.jizhaojk.com/${lastUrl}`, // 网址，默认使用 window.location.href
    source              : '', // 来源（QQ空间会用到）, 默认读取head标签：<meta name="site" content="http://overtrue" />
    title               : '', // 标题，默认读取 document.title 或者 <meta name="title" content="share.js" />
    description         : img?img:'', // 描述, 默认读取head标签：<meta name="description" content="PHP弱类型的实现原理分析" />
    image               : '', // 图片, 默认取网页中第一个img标签
    sites               : ['qzone', 'qq', 'weibo','wechat', 'douban'], // 启用的站点
    disabled            : [], // 禁用的站点
    wechatQrcodeTitle   : '微信扫一扫：分享', // 微信二维码提示文字
    wechatQrcodeHelper  : '<p>微信里点“发现”，扫一下</p><p>二维码便可将本文分享至朋友圈。</p>'
  }
}

export {
  checkPhone,
  getTime,
  setTime,
  textDecode,
  textAreaDecode,
  textEncode,
  zooming,
  checkQQ,
  checkEmail,
  saveOrderInfo,
  getOrderInfo,
  replaceOrderInfo,
  getImgToBase64,
  GetCookie,
  SetCookie,
  IsWeiXin,
  WeChatLogin,
  GetShareConfig
}
