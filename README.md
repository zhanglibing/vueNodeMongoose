### 技术栈

前端：html、css、less、ES6、webpack、vue-cli、vue2、vuex、vue-router、axios

后端：Node、mongoose

### 安装 
- mongodb 
- Robo （mongoose数据可视化工具）

### 启动项目
- 1.启动前台项目
- 2.启动mongodb
  - cd到mongodb安装目录bin文件跟目录
  - mongod --dbpath=E:\works\vueNodeMongoose\server\db --port=27019   启动mongdb 数据库
  - E:\works\vueNodeMongoose\server\db ：db文件夹所在的位置
- 3.启动node服务
   - cd 到server  node app.js
   
   
### 目标功能

- [x] 登录、注册、
- [x] 用户管理
- [x] 分类管理
- [x] 内容管理


### 目录结构

<pre>
├── build			// webpack及Node相关配置
├── config			// 项目dev和prod环境的配置
├── dist			// 项目build打包之后的目录
├── node_modules		// npm包
├── index.html			// 项目入口文件
├── package.json		// 项目描述文件
├── php_test			// 用PHP代替Node实现首页数据接口示例
├── server			// 后端目录
│   ├── db				// 存储的数据
│   ├── models			// 模型
│   ├── public			// 公用的图片和样式css
│   ├── router		// 接口路由 
│   └── schemas			//schemas
│    └── app.js			//node服务启动js
├── src					// 前端目录
├── static			// 前端公用静态文件目录
├── .babelrc			// ES6等babel的一些配置
├── .editorconfig		// 编辑器的一些配置
├── .eslintignore		// 忽略语法检查的目录文件，一般是忽略build和config目录
├── .eslintrc.js		// eslint的配置文件
├── // 关于项目目录各文件作用更加详细的介绍，请参考：http://www.zymseo.com/vue/488.html
</pre>
