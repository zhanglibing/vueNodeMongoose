<template>
  <div class="add">
    <div class="top-box">
      <h2>新增分类</h2>
      <el-button type="primary" size="mini" @click="$router.go(-1)">返回</el-button>
    </div>
    <el-card>
      <el-input v-model="name" placeholder="分类名称"></el-input>
      <el-button type="primary" @click="submit">确认提交</el-button>
    </el-card>

  </div>
</template>
<script>
  export default{
    data(){
      return {
        name: '',
        id:this.$route.query.id
      }
    },
    created(){
       this.getView();
    },
    methods: {
      getView(){
        this.api.category.getById(this.id).then(res=>{
          this.name=res.info.name
        })
      },
      submit(){
          if(this.id){
            this.api.category.updateCategory({name:this.name,id:this.id}).then(res=>{
              this.$message.success('保存成功')
            })
              return false;
          }
          this.api.category.addCategory(this.name).then(res=>{
              this.$message.success('新增成功');
              this.$router.go(-1);
          })
      }
    }
  }
</script>
