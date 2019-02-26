var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//用户表结构
module.exports = new Schema({
    //用户名
    username:String,
    //密码
    password: String,
    //是否为管理员
    isAdmin:{
        type:Boolean,
        default:false
    },
    createTime:{
        type: Date,
        default:Date.now()
    },
});