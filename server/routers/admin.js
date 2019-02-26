//加载express模块
var express =require('express');
var router=express.Router();
//验证是否为管理员
router.use(function(req,res,next){
    if(req.userInfo.isAdmin){
        res.send('对不起，只有管理员才可以进入后台管理');
        return false;
    }
    next();
})
router.get('/',function(req,res,next){
    // res.send('后台管理员首页');
    res.render('admin/index')
})

module.exports=router;