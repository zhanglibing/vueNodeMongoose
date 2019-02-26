var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//用户表结构
module.exports = new Schema({
    //分类名称
    name:String,
    createTime:{
        type: Date,
        default:Date.now()
    }
});