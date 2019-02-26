var mongoose = require('mongoose');
//引入分类表结构
var contentsSchema=require('../schemas/contents');
module.exports=mongoose.model('Content',contentsSchema);

