<template>
  <div class="add">
    <div class="top-box">
      <h2>新增内容</h2>
      <el-button type="primary" size="mini" @click="$router.go(-1)">返回</el-button>
    </div>
    <el-card>
      <form name="uploadForm"
            id="uploadForm"
            method="post"
            enctype="multipart/form-data"
            action="http://127.0.0.1:8081/api/upload"
            target="uploadFrame">
        <p style="margin:10px 0;">上传图片:
          <input type="text" name="name" value="xiangheng">
          <input type="file" name="imageFile" />
          <input type="submit" id="fileSubmit" value="上传" />
        </p>
      </form>
      <div slot="header" class="clearfix">
        <span>新增内容</span>
      </div>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="所属分类">
          <el-select v-model="form.category">
            <el-option v-for="item,index in categoryList" :value="item._id" :label="item.name" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标题">
          <el-input placeholder="标题" v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="标题">

        </el-form-item>
        <el-form-item label="简介">
          <el-input placeholder="简介" type="textarea" v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <el-input placeholder="内容" type="textarea" v-model="form.content"></el-input>
        </el-form-item>
        <template v-if="id">
          <el-form-item label="观看人数:">
            <span>{{info.views}}</span>
          </el-form-item>
          <el-form-item label="创建时间:">
            <span>{{info.createTime}}</span>
          </el-form-item>
        </template>
        <el-form-item>
          <el-button type="primary" @click="submit">确认提交</el-button>
        </el-form-item>
      </el-form>

    </el-card>
    <el-card>
      <div slot="header" class="clearfix">
        <span>评论区</span>
      </div>
      <el-form ref="form" label-width="80px">
        <el-form-item label="内容">
          <el-input placeholder="评价内容" type="textarea" v-model="content"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addComment">确认提交</el-button>
        </el-form-item>

      </el-form>

    </el-card>
    <el-card>
      <div slot="header" class="clearfix">
        <span>评论列表</span>
      </div>
      <ul class="comment-list">
        <li v-for="item,index in commentList" :key="index">
          <p>{{item.userInfo.username}}</p>
          <p>{{item.createTime}}</p>
          <p>{{item.content}}</p>
        </li>
      </ul>
    </el-card>

  </div>
</template>
<script>
  export default{
    data(){
      return {
        info: {},
        categoryList: [],
        form: {
          category: '',
          title: '',
          description: '',
          content: '',
        },
        content: '', //评论内容
        commentList: [],
        id: this.$route.query.id
      }
    },
    created(){
      this.getCategoryList();
      if (this.id) {
        this.getView();
      }
    },
    methods: {
      //获取详情
      getView(){
        this.api.content.getById(this.id).then(res => {
          this.info = res;
          let {category, title, description, content} = res;
          this.form = {category: category._id, title, description, content};
          this.getComment();
        })
      },
      addComment(){
        this.api.content.addComment({
          id: this.$route.query.id,
          content: this.content,
          userId: this.$store.state.userinfo.id
        }).then(res => {
          this.$message.success('新增成功');
          this.getComment()
        })
      },
      //获取评论列表
      getComment(){
        this.api.content.getComment(this.$route.query.id).then(res => {
          this.commentList = res;
        })
      },
      //获取分类列表
      getCategoryList(){
        this.api.category.getList().then(res => {
          this.categoryList = res.list;
        })
      },
      submit(){
        let option = {
          ...this.form, user: this.$store.state.userinfo.id
        }
        if (this.id) {
          option.id = this.id;
          this.api.content.updateContent(option).then(res => {
            this.$message.success('保存成功')
          })
          return false;
        }
        this.api.content.addContent(option).then(res => {
          this.$message.success('新增成功')
        })
      }
    }
  }
</script>
<style lang="scss" scoped="">
  .el-card {
    margin-bottom: 10px;
  }

  .comment-list {
    display: flex;
    flex-direction: column;
    li {
      margin-bottom: 15px;
      line-height: 24px;
    }
  }
</style>
