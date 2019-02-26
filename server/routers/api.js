//加载express模块
var express = require('express');
var multer=require('multer');
var fs=require('fs');
var router = express.Router();

var User = require('../models/user'); //引入用户模型结构
var Category = require('../models/Category'); //引入分类模型结构
var Content = require('../models/Content'); //引入内容模型结构

//统一返回格式
var responseData;
router.use(function (req, res, next) {
    responseData = {
        code: 0,
        message: ''
    }
    next()
})
/*
 *用户注册
 *    注册逻辑
 *    1.用户名不能为空
 *    2.密码不能为空
 *
 *    用户是否已经注册 （数据库查询）
 * */
router.post('/user/register', function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    if (!username) {
        console.log('用户名不能为空')
        responseData.code = 1;
        responseData.message = '用户名不能为空';
        res.json(responseData);
        return;
    }
    if (!password) {
        responseData.code = 2;
        responseData.message = '密码不能为空';
        res.json(responseData);
        return;
    }
    // 用户名是否已经被注册，
    User.findOne({username: username}).then(function (userInfo) {
        if (userInfo) {
            //表示数据库中有该条记录
            responseData.code = 4;
            responseData.message = '用户名已经被注册';
            res.json(responseData);
            return;
        } else {
            //保存用户数据信息到数据库中
            var user = new User({
                username: username,
                password: password
            })
            return user.save();
        }
    }).then(function (newUserInfo) {
        console.log(newUserInfo)
        responseData.message = '注册成功';
        res.json(responseData);
    })
})

/*
 *登录模块
 * */
router.post('/user/login', function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    if (!username || !password) {
        responseData.code = 1;
        responseData.message = '用户名或者密码不能为空';
        res.json(responseData);
        return;
    }
    // 用户名是否已经被注册，
    User.findOne({
        username: username,
        password: password
    }).then(function (userInfo) {
        if (!userInfo) {
            //表示数据库中有该条记录
            responseData.code = 2;
            responseData.message = '用户名或者密码错误';
            res.json(responseData);
            return;
        }
        responseData.message = '登录成功';
        responseData.userInfo = {
            id: userInfo.id,
            username: userInfo.username
        }
        //将数据保存到cookies中
        req.cookies.set('userInfo', JSON.stringify({
            id: userInfo.id,
            username: userInfo.username
        }));
        //清空缓存
        // req.cookies.set('userInfo',null);
        res.json(responseData);
    })
})


/*
 *获取用户列表
 *
 * 分頁功能
 * */
router.get('/user/userList', function (req, res, next) {
    /*
     * 从数据库中读取所有的用户数据
     * limit(Number) ; 限制获取的数据条数
     *
     * skip(2) ; 忽略数据的条数
     *
     * sort 排序
     * 1：升序
     * -1 降序
     * */
    // 用户名是否已经被注册，
    var page = Number(req.query.page) || 1; //当前页数
    var pageSize = Number(req.query.pageSize) || 10; //每页条数
    var skip = (page - 1) * pageSize;
    User.countDocuments().then(function (count) {
        //注意必须是number类型
        User.find().sort({_id: -1}).limit(pageSize).skip(skip).then(function (list) {
            if (list.length) {
                //表示数据库中有该条记录
                responseData.message = 'success';
                responseData.userList = list;
                responseData.count = count;
                res.json(responseData);
                return;
            }
        })
    })

})
/*
 * 删除用户
 * User.deleteOne({_id:id})
 * */
router.post('/user/deleteById', function (req, res, next) {
    var id = req.body.id || '';
    User.deleteOne({_id: id}).then(function () {
        responseData.message = '删除成功';
        res.json(responseData)
    })
})

/*
 * 分类新增
 * */
router.post('/category/add', function (req, res, next) {
    var name = req.body.name;
    Category.findOne({name: name}).then(function (userInfo) {
        if (userInfo) {
            //表示数据库中有该条记录
            responseData.code = 4;
            responseData.message = '分类已经存在';
            res.json(responseData);
            return;
        } else {
            //保存用户数据信息到数据库中
            return new Category({
                name: name
            }).save();
        }
    }).then(function (newUserInfo) {
        responseData.message = '保存成功';
        res.json(responseData);
    })
})

/*
 * 获取分类列表
 * */
router.get('/category/list', function (req, res, next) {
    // 用户名是否已经被注册，
    var page = Number(req.query.page) || 1; //当前页数
    var pageSize = Number(req.query.pageSize) || 10; //每页条数
    var skip = (page - 1) * pageSize;
    Category.countDocuments().then(function (count) {
        //注意必须是number类型
        Category.find().sort({_id: -1}).limit(pageSize).skip(skip).then(function (list) {
            if (list.length) {
                //表示数据库中有该条记录
                responseData.message = 'success';
                responseData.list = list;
                responseData.count = count;
                res.json(responseData);
                return;
            }
        })
    })

})

/*
 * 获取详情
 * */
router.get('/category/getById', function (req, res, next) {
    Category.findOne({_id: req.query.id}).then(function (info) {
        responseData.info = info;
        res.json(responseData)
    })
})

/*
 * 删除分类
 * User.deleteOne({_id:id})
 * */
router.post('/category/deleteById', function (req, res, next) {
    var id = req.body.id || '';
    Category.deleteOne({_id: id}).then(function () {
        responseData.message = '删除成功';
        res.json(responseData)
    })
})
/*
 * 分类编辑
 * */
router.post('/category/update', function (req, res, next) {
    var name = req.body.name;
    console.log(name)
    var id = req.body.id;
    Category.findOne({_id: id}).then(function (category) {
        console.log(category)
        if (!category) {
            //表示数据库中有该条记录
            responseData.code = 2;
            responseData.message = '分类信息不存在';
            res.json(responseData);
            return;
        } else {
            Category.updateOne({_id: id},{name:name}).then(function (newInfo) {
                responseData.message = '保存成功';
                res.json(responseData);
            })
        }
    })
})

/*
 * 内容新增
 * */
router.post('/content/add', function (req, res, next) {
    console.log(req.body)
    new Content({
        category: req.body.category,
        user: req.body.user,
        title: req.body.title,
        content: req.body.content,
        description: req.body.description,
    }).save().then(function (re) {
        responseData.message = '内容保存成功';
        res.json(responseData)
    })
})


//获取时间
function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
    return currentdate.toString();
}
var datatime = 'public/images/'+getNowFormatDate();
//将图片放到服务器
var multer = require('multer')
var storage = multer.diskStorage({
    // 如果你提供的 destination 是一个函数，你需要负责创建文件夹
    destination: datatime,
    //给上传文件重命名，获取添加后缀名
    filename: function (req, file, cb) {
        cb(null,  file.originalname);
    }
});
var upload = multer({
    storage: storage
});
/*
* 图片上传
* */
router.post('/upload',upload.single('imageFile'), function(req, res, next) {
    // req.file 是 前端表单name=="imageFile" 的文件信息（不是数组）

    // fs.rename(req.file.path, "upload/" + req.file.originalname, function(err) {
    //     if (err) {
    //         throw err;
    //     }
    //     console.log('上传成功!');
    // })
    // res.writeHead(200, {
    //     "Access-Control-Allow-Origin": "*"
    // });
    res.end(JSON.stringify(req.file)+JSON.stringify(req.body));
})

/*
 * 内容更新
 * */
router.post('/content/update', function (req, res, next) {
    var id = req.body.id;
    // findById( id)=findOne({_id: id})
    Content.findById( id).then(function (content) {
    // Content.findOne({_id: id}).then(function (content) {
        if (!content) {
            //表示数据库中有该条记录
            responseData.code = 2;
            responseData.message = '编辑内容不存在';
            res.json(responseData);
            return;
        } else {
            Content.updateOne({_id: id},{
                category: req.body.category,
                user: req.body.user,
                title: req.body.title,
                content: req.body.content,
                description: req.body.description,
            }).then(function (newInfo) {
                responseData.message = '保存成功';
                res.json(responseData);
            })
        }
    })
})

/*
 * 获取内容列表
 * populate('category') 获取到关联数据
 * */
router.get('/content/list', function (req, res, next) {
    console.log(req.query)
    // 用户名是否已经被注册，
    var page = Number(req.query.page) || 1; //当前页数
    var pageSize = Number(req.query.pageSize) || 10; //每页条数
    var skip = (page - 1) * pageSize;
    var option = {};
    if (req.query.category) {
        option.category = req.query.category;
    }
    //效果一样   效率目前不清楚
    //Content.where(option).count() == Content.count(option)
    Content.where(option).countDocuments().then(function (count) {
        //注意必须是number类型
        //分类筛选增加

        //效果一样   效率目前不清楚
        //Content.where(option).find() == Content.find(option)
        Content.where(option).find().sort({_id: -1}).limit(pageSize).skip(skip).populate(['category', 'user']).then(function (list) {
            //表示数据库中有该条记录
            responseData.message = 'success';
            responseData.list = list;
            responseData.count = count;
            res.json(responseData);
            return;

        })
    })

})

/*
 * 获取内容详情
 * */
router.get('/content/getById', function (req, res, next) {
    //populate('category')  //单个关联情况
    Content.findOne({_id: req.query.id}).populate(['category', 'user']).then(function (info) {
        //表示数据库中有该条记录
        responseData.message = 'success';
        responseData.info = info;
        res.json(responseData);
        //观看人数增加
        info.views++;
        info.save();
    })
})

/*
 * 删除内容
 * */
router.get('/content/delete', function (req, res, next) {
    //populate('category')  //单个关联情况
    Content.deleteOne({_id: req.query.id}).then(function (info) {
        //表示数据库中有该条记录
        responseData.message = 'success';
        res.json(responseData);
    })
})

/*
 * 增加评论
 * */
router.post('/comment/add', function (req, res, next) {
    console.log(res.body)
    var userId=req.body.userId;
    var id=req.body.id;
    var content=req.body.content;
    User.findOne({_id:userId}).then(function(userInfo){
        //populate('category')  //单个关联情况
        Content.findOne({_id: id}).then(function (info) {
            info.comment.push({
                userInfo:userInfo,
                content:content,
                createTime:new Date()
            })
            info.save();
            //表示数据库中有该条记录
            responseData.message = '评论成功';
            res.json(responseData);
        })
    })
})

/*
 * 获取评论列表
 * */
router.get('/comment/list', function (req, res, next) {
        Content.findOne({_id: req.query.id}).then(function (info) {
            //表示数据库中有该条记录
            responseData.message = '评论成功';
            responseData.list = info.comment;
            res.json(responseData);
        })
})


module.exports = router;