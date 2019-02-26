var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//内容表结构
module.exports = new Schema({
    //关联字段- 内容分类的id
    category:{
        //类型
       type:mongoose.Schema.Types.ObjectId,
        //引用
       ref:'Category'

    },
    imgPath:String,
    //关联字段- 用户id
    user:{
        //类型
       type:mongoose.Schema.Types.ObjectId,
        //引用
       ref:'User'

    },
    //简介
    views:{
        type:Number,
        default:0
    },
    //简介
    createTime:{
        type: Date,
        default:Date.now()
    },
    //标题
    title:String,
    //简介
    description:{
        type:String,
        default:''
    },
    //内容
    content:{
        type:String,
        default:''
    },
    //评论
    comment:{
        type:Array,
        default:[]
    },
});