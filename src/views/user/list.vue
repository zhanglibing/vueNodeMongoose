<template>
  <div>
    <div class="top-box"><h2>用户管理</h2></div>
    <el-card>
      <el-table :data="list" border
                v-loading="loading"
                element-loading-text="加载中..."
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
                :stripe="true">
        <el-table-column prop="_id" label="ID"></el-table-column>
        <el-table-column prop="username" label="账号"></el-table-column>
        <el-table-column prop="password" label="密码"></el-table-column>
        <el-table-column prop="isAdmin" label="是否为管理员">
           <template slot-scope="scope">
              {{scope.row.isAdmin?'是':'不是'}}
           </template>
        </el-table-column>
        <el-table-column label="操作"  width="190">
          <template slot-scope="scope">
            <el-button size="mini" icon="el-icon-edit" type="info"  ></el-button>
            <el-button size="mini" icon="el-icon-delete"  type="danger" @click="deleteById(scope.row._id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page"
          :page-sizes="[5, 30, 50, 100]"
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
        pageSize:5,
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
      //获取列表
      async getList(){
        let {count,userList}=await this.api.user.getUserList({page:this.page,pageSize:this.pageSize});
        this.list=userList;
        this.total=count;
      },
      //删除用户
      deleteById(id){
          this.api.user.deleteById(id).then(res=>{
              this.$message.success('删除成功');
              this.getList();
          })
      }
    }
  }
</script>
