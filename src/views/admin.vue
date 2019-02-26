<template>
  <el-container>
    <el-header>
      <img src="./logo.png" width="80" alt="">
      <div class="loginOut">
        <i class="iconfont icon-kehu"></i>欢迎,{{$store.state.RealName}}
        <div class="list">
          <el-button size="mini" type="" @click="loginOut">退出登录</el-button>
        </div>
      </div>
    </el-header>
    <div class="container maxH ">
      <div class="aside" :class="{active:collapse}">
        <el-menu
          class="el-menu-vertical-demo"
          @open="handleOpen"
          background-color="#222d32"
          text-color="#fff"
          :default-active="activeIndex"
          :router="true"
          :collapse="collapse"
          active-text-color="#ffd04b">
          <template v-for="item in items">
            <template v-if="item.subs">
              <el-submenu :index="item.index">
                <template slot="title"><i :class="item.icon"></i>{{ item.title }}</template>
                <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">{{ subItem.title }}
                </el-menu-item>
              </el-submenu>
            </template>
            <template v-else>
              <el-menu-item :index="item.index">
                <i :class="item.icon"></i>{{ item.title }}
              </el-menu-item>
            </template>
          </template>
        </el-menu>
      </div>
      <div class="main-container">
        <transition name="move" mode="out-in">
          <div>
            <keep-alive>
              <router-view v-if="$route.meta.keepAlive"></router-view>
            </keep-alive>
            <router-view v-if="!$route.meta.keepAlive"></router-view>
          </div>

        </transition>
        <div class="footer">
          <span style="float:left;">Powered by ALDING</span>
          <span>{{getTime()}}</span>
          <span style="float:right;margin-right: 10px;">ALDING version 2.0</span>
        </div>
      </div>
    </div>
  </el-container>
</template>
<script>
  export default{
    data(){
      return {
        collapse: false,
        activeIndex: this.$route.path,
        items: [
          {
            icon: 'el-icon-menu',
            index: '/admin',
            title: '后台首页'
          },
//
//          {
//            icon: 'el-icon-goods',
//            index: '2',
//            title: '商品目录',
//            subs: [
//              {
//                index: '/admin/goodManage',
//                title: '商品管理'
//              },
//              {
//                index: '/admin/goodAttribute',
//                title: '属性管理'
//              }
//            ]
//          },
          {
            icon: 'el-icon-setting',
            index: '/admin/user',
            title: '用户管理',
          },
          {
            icon: 'el-icon-setting',
            index: '/admin/category',
            title: '类别管理',
          },
          {
            icon: 'el-icon-setting',
            index: '/admin/content',
            title: '内容管理',
          },
        ]
      }
    },
    methods: {
      handleOpen(){

      },
      getTime(){
        var myDate = new Date();
        var year = myDate.getFullYear();    //获取完整的年份(4位,1970-????)
        var month = myDate.getMonth() + 1;       //获取当前月份(0-11,0代表1月)
        var day = myDate.getDate();        //获取当前日(1-31)
        var seven = myDate.getDay();         //获取当前星期X(0-6,0代表星期天)
        var h = myDate.getHours();
        var s = myDate.getMinutes();
        var m = myDate.getSeconds();
        month = (month < 10) ? ("0" + month) : month;
        day = (day < 10) ? ("0" + day) : day;
        h = (h < 10) ? ("0" + h) : h;
        s = (s < 10) ? ("0" + s) : s;
        m = (m < 10) ? ("0" + m) : m;
        return year + '年' + month + '月' + day + '日 ' + h + ":" + s;
      },
      //注销登录
      loginOut(){
        this.$http.post('CustomerHandle/Logout', {Username: this.$store.state.userName}).then(res => {
          let {Code, Login} = res.data;
          if (Code == '200') {
            this.$router.push('/')
          }
        })
      }
    },
  }
</script>
<style lang="scss" scoped="">


  .container {
    width: 100%;
    background: #222d32;
    display: flex;
    flex-direction: row;
    .aside {
      box-sizing: border-box;
      width: 180px;
      position: relative;
      background: #222d32;
      &.active {
        width: auto;
        .iconfont {
          font-size: 18px;
          margin-right: 5px;
          padding-right: 20px;
        }
      }
    }
    .main-container {
      flex: 1;
      position: relative;
      /*min-width:800px;*/
      width:calc(100vw - 237px);
      min-height: calc(100vh - 130px);
      /*float: left;*/
      padding: 10px 10px 60px;
      background: #fff;
      .footer {
        position: absolute;
        width: 100%;
        bottom: 0;
        left: 0;
        line-height: 50px;
        height: 50px;
        padding: 0 15px;
        border-top: 1px solid #d2d6de;
        text-align: center;
        box-sizing: border-box;
      }
    }
  }

  .el-header {
    position: relative;
    z-index: 2;
    background: #3c8dbc;
    img {
      vertical-align: middle;
      margin-top: 10px;
      margin-left: 20px;
    }
    .loginOut {
      float: right;
      margin-right: 20px;
      line-height: 60px;
      font-size: 14px;
      color: #fff;
      cursor: pointer;
      position: relative;
      .list {
        line-height: 30px;
        display: none;
        position: absolute;
        right: 0;
        top: 45px;
      }
      &:hover {
        .list {
          display: block;
        }
      }
    }
  }

  .el-menu.el-menu-vertical-demo {
    border-right: none;
  }


</style>
