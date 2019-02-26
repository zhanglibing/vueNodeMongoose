<template>
  <div class="search-box-model">
    <!--<div class="search"  v-if="isShowSearch">-->
    <div class="search" :class="{active:isShowSearch}">
      <form class="input-box" action="javascript:return true;">
        <i class="el-icon-search" @click="searching"></i>
        <input ref="input" @keypress="searching" type="search" :autofocus="true" v-model="strWhere" @keyup="keyUp"
               placeholder="请输入搜索值">
        <span class="empty" v-if="strWhere" @click="emptySearch">
             <b class="el-icon-error"></b>
           </span>
      </form>
      <span @click="cancelSeach">取消</span>
    </div>
    <div class="show-search" :class="{active:!isShowSearch}" @click="showSearch">
      <i class="el-icon-search"></i>
      搜索
    </div>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        isShowSearch: false,
        strWhere: ''
      }
    },
    mounted(){
      this.$nextTick(() => {
        $('.show-search').on('click', () => {
          this.$refs.input.focus();
        })
      })
    },
    methods: {
      showSearch(){
        this.isShowSearch = true;
        this.$nextTick(() => {
          this.$refs.input.focus();
        })

      },
      emptySearch(){
        this.strWhere = '';
        this.searching()
      },
      //取消搜索
      cancelSeach(){
        this.isShowSearch = false;
        this.strWhere = '';
        this.searching();

      },
      //搜索
      searching(){
        this.$emit('searching', this.strWhere)
      },
      keyUp(){
        if (!this.strWhere) {
          this.searching()
        }
      },
    }
  }
</script>
<style lang="scss" scoped="">
  @import "../../pc/src/common/css/mixins";

  .search-box-model {
    position: relative;
    width: 100%;
    z-index: 100;
    height: 100%;
    box-sizing: border-box;
    background: #eee;
    padding: 10px 15px;
    align-items: center;
    overflow: hidden;
    .search {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      box-sizing: border-box;

      height: 0;
      overflow: hidden;
      &.active {
        height: auto;
      }
      .input-box {
        flex: 1;
        position: relative;
        height: 30px;
        input {
          width: 100%;
          height: 30px;
          padding-left: 40px;
          box-sizing: border-box;
          border: none;
          border-radius: 4px;
        }
        i {
          font-size: 18px;
          position: absolute;
          top: 5px;
          left: 10px;
          color: #999;
        }
        .empty {
          position: absolute;
          top: 0;
          right: 0;
          background: #fff;
          width: 40px;
          height: 100%;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          b {
            font-size: 18px;
            color: #999;
          }
        }

      }
      span {
        margin-left: 10px;
        color: $themeColor;
        font-size: 14px;
        text-align: right;
      }
    }

    .show-search {
      width: 100%;
      border-radius: 4px;

      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      text-align: center;
      font-size: 14px;
      color: #999;
      background: #fff;
      height: 0;
      overflow: hidden;
      &.active {
        height: 30px;
      }
      i {
        font-size: 18px;
        color: #999;
        margin-right: 15px;
      }
    }
  }
</style>

