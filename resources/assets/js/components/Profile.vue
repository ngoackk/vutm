<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <span class="title">THÔNG TIN SINH VIÊN</span>
      </div>

      <div class="col-6">
        <span class="title">Họ và tên:</span>
        {{user.Ho_ten}}
      </div>
      <div class="col-3">
        <span class="title">Mã sinh viên:</span>
        {{user.Ma_sv}}
      </div>
      <div class="col-3">
        <span class="title">Lớp:</span>
        {{user.Ten_lop}}
      </div>
    </div>

    <div class="row">
      <div class="col-12">
        <span class="title">Điện thoại:</span>
        {{user.Dien_thoai}}
      </div>
      <div class="col-12">
        <span class="title">Email:</span>
        {{user.Email}}
      </div>
      <!-- <div class="col-12">
        <b-button @click="takePicture" varian="primary" size="sm">Chụp ảnh</b-button>
      </div>  -->
      <div class="col-12">
        <img :src="user.avatar" class="img-circle" :alt="user.avatar">
      </div>
    </div>
  </div>
</template>
<script>
import { Users, Date } from "../apis/api";
import Vue from "vue";
export default {
  inject: ["currentUser"],
  data() {
    return {
      device: "",
      img: { url: "" },
      success: "Thành công !"
    };
  },
  mounted() {},

  computed: {
    user() {
      return this.currentUser();
    }
  },
  methods: {
    takePicture() {
      Vue.cordova.camera.getPicture(
        imageURI => {
          return (this.img.url = imageURI);
        },
        message => {
          window.alert("FAILED : " + message);
        },
        {
          quality: 100,
          destinationType: Vue.cordova.camera.DestinationType.FILE_URI
        }
      );
    }
  }
};
</script>
