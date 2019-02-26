<template>
  <div>
    <div class="top-box">
      <h2>内容管理</h2>
      <el-button type="primary" size="small" @click="goAdd">新增</el-button>
    </div>
    <el-card>
      <el-select v-model="category" @change="getList" :clearable="true">
        <el-option v-for="item,index in categoryList" :value="item._id" :label="item.name" :key="index"></el-option>
      </el-select>
    </el-card>
    <el-card>
      <el-table :data="list" border
                v-loading="loading"
                element-loading-text="加载中..."
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
                :stripe="true">
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column prop="category.name" label="分类"></el-table-column>
        <el-table-column prop="description" label="描述" min-width="120"></el-table-column>
        <el-table-column prop="content" label="内容" min-width="120"></el-table-column>
        <el-table-column prop="views" label="阅读数"></el-table-column>
        <el-table-column prop="user.username" label="创建人"></el-table-column>
        <el-table-column prop="user.createTime" label="创建时间">
          <template slot-scope="scope">
            {{scope.row.createTime.toString()}}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="160">
          <template slot-scope="scope">
            <el-button size="mini" icon="el-icon-edit" type="info" @click="edit(scope.row._id)"></el-button>
            <el-button size="mini" icon="el-icon-delete" type="danger" @click="deleteById(scope.row._id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page"
          :page-sizes="[10, 30, 50, 100]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </el-card>

  </div>
</template>
<script>
  export default{
    data(){
      return {
        loading: true,
        categoryList: [],
        list: [],
        page: 1,
        pageSize: 10,
        total: 0,
        category: ''
      }
    },
    created(){
      this.getList();
      this.getCategoryList();
    },
    methods: {
      getCategoryList(){
        this.api.category.getList().then(res => {
          this.categoryList = res.list;
        })
      },
      handleSizeChange(val) {
        this.pageSize = val;
        this.getList()
      },
      handleCurrentChange(val) {
        this.page = val;
        this.getList()
      },
      async getList(){
        this.loading = true;
        let {count, list} = await this.api.content.getContentList({
          page: this.page,
          pageSize: this.pageSize,
          category: this.category
        });
        this.list = list;
        this.loading = false;
        this.total = count;
      },
      //删除
      deleteById(id){
        this.api.content.deleteById(id).then(res => {
          this.$message.success('删除成功');
          this.getList();
        })
      },
      goAdd(){
        this.$router.push('/admin/content/add')
      },
      edit(id){
        this.$router.push({path: '/admin/content/add', query: {id: id}})
      },
    }
  }
</script>
