<template>
  <div class="footer">
    <div class="content">
      <div class="link-box">
        <span><a href="/expertsIn">专家入驻</a></span>
        <span><a href="/fmList">幸福FM</a></span>
        <span><a href="/about">关于我们</a></span>
      </div>
      <p class="copy">Copyright © 2015幸福谋方 沪ICP备17043267号</p>
    </div>
  </div>

</template>
<script>
export default{

}
</script>
<style lang="scss" scoped="">
  @import "../../common/css/mixins";
  //底部
  .footer{
    width:100%;
    padding:50px 0;
    background: #fff;
    .link-box{
      display: flex;
      width:100%;
      flex-direction: row;
      align-items: center;
      margin-bottom:30px;
      span{
        flex:1;
        text-align: center;
        font-size:12px;
        &:nth-child(2){
          border-left:1px solid #000;
          border-right:1px solid #000;
        }
      }
    }
    .copy{
      text-align: center;
      height: 19px;
      font-family: PingFangSC-Regular;
      font-size: 9px;
      line-height: 30px;
      letter-spacing: 1px;
      color: #000000;
    }
  }
</style>
