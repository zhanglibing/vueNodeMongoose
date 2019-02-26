<template>
  <div id="app">
    <router-view class="wrapper-box"></router-view>
  </div>
</template>

<script>

  export default {
    name: 'App',
    components: {},
    data(){
      return {

      }
    },
    mounted(){

    },
    methods: {

    }
  }
</script>
<style lang="scss">
  @import "./common/css/mixins";
 .block{
   margin-top:10px;
 }

  .top-box{
    margin-bottom:10px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }


</style>
