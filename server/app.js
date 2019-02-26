/** 2018/12/19
 *author:zhanglibing
 *email:1053081179@qq.com
 *功能:
 */
//加载express模块
var express =require('express');

//加载模板处理
var swig=require('swig')
//加载数据库模块
var mongoose = require('mongoose');
//加载cookies
var Cookies = require('cookies');

//加载body-parser，用来处理post提交过来的数据
var bodyParser=require('body-parser');
//创建app应用=》nodejs http.createServer()
var app=express();

//设置允许跨域访问该服务.
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    // Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
    // res.header('Access-Control-Allow-Headers', 'Content-Type');
    // res.header('Access-Control-Allow-Methods', '*');
    res.header('Content-Type', 'application/json;charset=utf-8');
    next();
});
//设置静态文件托管
//当用户访问的url一 '/public'开始，那么直接返回对应的__dirname+'/public' 下的文件
app.use('/public',express.static(__dirname+'/public'));

//配置应用模板
//定义当前应用所使用的模板引擎
//第一个参数：模板引擎的名称，同时也是模板文件的后缀，  第二个参数表示用于解析处理模板内容的方法
app.engine('html',swig.renderFile);
//设置模板文件存放的目录，第一个参数必须是views ，第二个参数是目录
app.set('views','./views')
//注册所使用的模板引擎，第一个参数view engine ，第二个参数和app.engine这个方法中定义的模板引擎名称（第一个参数一致）
app.set('view engine','html');

//在开发过程中，需要取消模板缓存
swig.setDefaults({cache:false})

//body-parser 设置
app.use(bodyParser.urlencoded({extended:true}))

//设置cookies
app.use(function(req,res,next){
    req.cookies=new Cookies(req,res);
    //解析登录用户的cookies信息
    req.userInfo={};
    if(req.cookies.get('userInfo')){
        try{
            req.userInfo=JSON.parse(req.cookies.get('userInfo'))
        }catch(e){

        }
    }
    next();
})

// app.get('/',function(req,res,next){
//     // res.end('<h1>welcome</h1>')
//     /*
//     * 读取views目录下面的指定文件，解析并返回给客户端
//     * 第一个参数：表示模板的文件，相对于views目录   views/index.html
//     * */
//     res.render('index')
// })


/*
* 根据不同的功能划分模块
* */
app.use('/admin',require('./routers/admin'));
app.use('/api',require('./routers/api'));
app.use('/',require('./routers/main'));

//监听
//链接`数据库
mongoose.connect('mongodb://localhost:27019/blog',{useNewUrlParser:true},function(err){
    if(err){
        console.log('数据库连接失败')
    }else{
        console.log('数据库连接成功')
        app.listen(8081);
    }
});
