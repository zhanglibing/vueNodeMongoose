//加载express模块
var express =require('express');
var router=express.Router();

router.get('/',function(req,res,next){
    //第二个参数给html模板传递数据
    res.render('main/index',{
        userInfo:{name:'zhanglibing',work:'IT'}
    })
})

module.exports=router;