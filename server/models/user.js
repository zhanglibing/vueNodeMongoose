var mongoose = require('mongoose');
//引入用户表结构
var usersSchema=require('../schemas/users')
module.exports=mongoose.model('User',usersSchema)

