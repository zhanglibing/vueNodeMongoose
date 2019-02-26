<template>
  <!--<div class="avatarUpload">-->
  <el-upload
    class="avatar-uploader zooming"
    :class="{BigBox:isBig}"
    :action="getHttp()"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload">
    <img v-if="imageUrl" :src="imageUrl" class="avatar">
    <img v-else-if="AvatarUrl" :src="AvatarUrl" class="avatar">
    <i v-else class="el-icon-picture avatar-uploader-icon"></i>
    <!--login_avatar.png-->
  </el-upload>
  <!--</div>-->
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
      isBig: {
        type: Boolean,
        default: false

      }
    },
    data(){
      return {
        imageUrl: '',
      }
    },
    methods: {
      getHttp(){ //返回上传图片host
        return `${apiHost}CustomerHandle/UploadAvatar?customerId=${this.id}`;
      },
      handleAvatarSuccess(res, file) {
        let {Code, UploadAvatar} = res;
        if (Code == '200') {
          this.ToastSucMsg("上传成功");
          this.imageUrl = UploadAvatar.AvatarUrl;
          replaceUserInfo({AvatarUrl: this.imageUrl})
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
    width: 1.4rem;
    height: 1.4rem;
    position: relative;
  }

  .avatar-uploader .el-upload {
    /*border: 1px dashed #d9d9d9;*/
    border-radius: 50%;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .BigBox {
    width: 1.6rem;
    height: 1.6rem;
    .el-upload {
      border-radius: 0;
    }
    .avatar {
      width: 1.6rem;
      height: 1.6rem;
      display: block;
    }
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 1rem;
    height: 1rem;
    line-height: 1rem;
    text-align: center;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -0.5rem;
    margin-top: -0.5rem;
  }

  .el-icon-picture {
    font-size: 1rem;
  }

  .avatar {
    width: 90px;
    height: 90px;
    display: block;
  }

  .click {
    width: 100px;
    height: 30px;
    position: absolute;
    bottom: -40px;
    left: -5px;
  }
</style>
