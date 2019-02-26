var mongoose = require('mongoose');
//引入分类表结构
var categoriesSchema=require('../schemas/categories')
module.exports=mongoose.model('Category',categoriesSchema)

