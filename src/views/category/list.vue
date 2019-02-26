<template>
  <div>
    <div class="top-box">
      <h2>类别管理</h2>
      <el-button type="primary" size="small" @click="goAdd">新增</el-button>
    </div>
    <el-card>
      <el-table :data="list" border
                v-loading="loading"
                element-loading-text="加载中..."
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
                :stripe="true">
        <el-table-column prop="_id" label="ID"></el-table-column>
        <el-table-column prop="name" label="类别名称"></el-table-column>
        <el-table-column label="操作"  width="190">
          <template slot-scope="scope">
            <el-button size="mini" icon="el-icon-edit" type="info"   @click="edit(scope.row._id)"></el-button>
            <el-button size="mini" icon="el-icon-delete"  type="danger" @click="deleteById(scope.row._id)"></el-button>
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
        list: [],
        page:1,
        pageSize:10,
        total:0
      }
    },
    created(){
      this.getList()
    },
    methods: {
      handleSizeChange(val) {
        this.pageSize = val;
        this.getList()
      },
      handleCurrentChange(val) {
        this.page = val;
        this.getList()
      },
      async getList(){
        let {count,list}=await this.api.category.getList({page:this.page,pageSize:this.pageSize});
        this.list=list;
        this.total=count;
      },
      //删除类别
      deleteById(id){
        this.api.category.deleteById(id).then(res=>{
          this.$message.success('删除成功');
          this.getList();
        })
      },
      goAdd(){
          this.$router.push('/admin/category/add')
      },
      edit(id){
        this.$router.push({path:'/admin/category/add',query:{id}})
      }
    }
  }
</script>
