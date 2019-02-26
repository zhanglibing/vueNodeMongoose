<template>
  <div class="avatarUpload">
    <el-upload
      class="avatar-uploader"
      :action="getHttp()"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload">
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <img v-else-if="AvatarUrl" :src="AvatarUrl" class="avatar">
      <i v-else class="el-icon-picture avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>
<script>
  import {replaceUserInfo} from '../common/js/loginData'
  export default{
    props: {
      id: {
        type: Number,
        required: true,
      },
      AvatarUrl: {
        type: String,
        default: ''
      },
      type:{
          type:Number,
          default:1
      }
    },
    data(){
      return {
        imageUrl: '',
      }
    },
    methods: {
      getHttp(){ //返回上传图片host
        return `${apiHost}CustomerHandle/UploadIDPicture?customerId=${this.id}&type=${this.type}`;
      },
      handleAvatarSuccess(res, file) {
        let {Code,UploadIDPicture} = res;
        if (Code == '200') {
          this.ToastSucMsg("上传成功");
          this.imageUrl = UploadIDPicture.IDPictureUrl;
          this.$emit('getImgId',{type:this.type,path:this.imageUrl,id:UploadIDPicture.IDPictureId});
        } else {
          this.$toast("上传失败");
        }
      },
      beforeAvatarUpload(file) {
        const isLt5M = file.size / 1024 / 1024 < 5;
        if (!isLt5M) {
          this.$toast('上传头像图片大小不能超过 5MB!');
        }
        return isLt5M;
      },
    }
  }
</script>
<style lang="scss" scoped="">
  .avatar-uploader {
    .el-upload {
      width:1.6rem;
      cursor: pointer;
      position: relative;
      /*overflow: hidden;*/
      text-align: center;
      display: block;
    }
  }


  .avatar-uploader-icon {
    font-size: 1.2rem;
    color: #8c939d;
    width:1.6rem;
    height:1.6rem;
    line-height: 1.6rem;
    text-align: center;
  }

  .avatar {
    width: 1.6rem;
    height: 1.6rem;
    display: block;
  }
  .click{
    width:100px;
    height:30px;
    position: absolute;
    bottom:-40px;
    left:-5px;
  }
  .el-upload__input{
    width:1.6rem;
    height:1.6rem;
  }
</style>
