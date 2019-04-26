<template>
  <div class="login">
    <link rel="stylesheet" type="text/css" href="css/login.css">
    <nav class="navbar bg-white justify-content-center fix-top">
      <a class="navbar-brand" href="#">
        <img src="img/logo-f.png" alt="Logo" class="logo">
      </a>
      <div class="title">ĐẠI HỌC KIẾN TRÚC HÀ NỘI</div>
    </nav>
    <div class="container">
      <img class="img-fluid mx-auto d-block" src="img/banner.jpg">
      <form id="loginForm" @submit.prevent="login" method="post">
        <div role="group">
          <label for="UserName">Tài khoản:</label>
          <b-form-input
            id="UserName"
            v-model="UserName"
            trim
            type="text"
            :state="checkName"
            aria-describedby="UserNameFeedback"
            ref="UserName"             
          />

          <!-- This will only be shown if the preceeding input has an invalid state -->
          <b-form-invalid-feedback id="UserNameFeedback">
            Tên đăng nhập cần phải có!
          </b-form-invalid-feedback>

          <!-- This is a form text block (formerly known as help block) -->
          <!-- <b-form-text id="UserNameHelp">Được nhà trường cung cấp</b-form-text> -->
        </div>
        <div role="group">
          <label for="UserName">Mật khẩu:</label>
          <b-form-input
            id="Password"
            v-model="Password"
            trim
            type="password"
            :state="checkPass"
            aria-describedby="PasswordFeedback"   
             ref="Password"           
          />

          <!-- This will only be shown if the preceeding input has an invalid state -->
          <b-form-invalid-feedback id="PasswordFeedback">
            Mật khẩu cần phải có.
          </b-form-invalid-feedback>

          <!-- This is a form text block (formerly known as help block) -->
          <!-- <b-form-text id="PasswordHelp">Được nhà trường cung cấp</b-form-text> -->
        </div>
        <!-- <div class="form-group">
          <label for="UserName">Tài khoản</label>
          <input
            v-model="UserName"
            type="text"
            class="form-control"
            id="UserName"            
            placeholder="Tài khoản"
          >
        </div>
        <div class="form-group">
          <label for="Password">Mật khẩu</label>
          <input
            v-model="Password"
            type="password"
            class="form-control"
            id="Password"
            placeholder="Mật khẩu"
          >
        </div> -->
        <div class="form-group form-check">
          <input type="checkbox" class="form-check-input" id="rememberme" v-model="rememberme">
          <label class="form-check-label" for="rememberme">Lưu mật khẩu</label>
        </div>
        <b-alert variant="danger" dismissible v-model="showDismissibleAlert">
          {{ErrorMessage}}
        </b-alert>
        <button @click="login" class="btn btn-primary btn-block">Đăng nhập</button>
      </form>
      <div class="text-center">
        <button v-b-modal.modal1 class="btn btn-link">[Quên mật khẩu sinh viên]</button>

        <b-modal id="modal1" centered title="Lấy lại mật khẩu">
          <p
            class="my-4"
          >Mật khẩu mới sẽ được gửi vào mail bạn đã đăng ký với nhà trường!</p>
          <input type="text" class="form-control" id="txtMaSV" placeholder="Mã sinh viên">
          <div slot="modal-footer" class="w-100">
            <b-btn
              class="float-right btn-block"
              variant="primary"
              @click="show=false"
            >Lấy lại mật khẩu</b-btn>
          </div>
        </b-modal>
      </div>
    </div>
    <nav class="navbar bg-white fixed-bottom">
      <ul class="nav">
        <li class="nav-item">&copy; 2019</li>
      </ul>
      <ul class="nav justify-content-end">
        <li class="nav-item">NAMVIET.JSC</li>
      </ul>
    </nav>
  </div>
</template>
<script>
import Vue from "vue";
import { Users, Data } from "../apis/api";
import md5 from "js-md5";
export default {
  data() {
    return {
      UserName: "",
      Password: "",
      rememberme: false,
      DeviceId: "",
      showDismissibleAlert: false,
      ErrorMessage: "Đăng nhập không thành công!"
    };
  },
  mounted() {
    this.logout();
  },
  computed: {
    checkName() {
      return this.UserName.length > 0;
    },
    checkPass() {
      return this.Password.length > 0;
    }
  },
  methods: {
    logout() {
      localStorage.removeItem("access_token");
      localStorage.removeItem("user");
      if(localStorage.getItem("rememberme") == "true"){
        this.rememberme = true;
        if(localStorage.getItem("UserName") != null)
        this.UserName = localStorage.getItem("UserName");
        if(localStorage.getItem("Password") != null)
        this.Password = localStorage.getItem("Password");
      } else {
        this.rememberme = false;
        localStorage.removeItem("Password");
        localStorage.removeItem("UserName");
      }
    },
    login() {
      // Theo tài liệu hướng dẫn của vue-cordova them chiếu tất cả qua biến Vue.cordova.{plugin name}
      // Lưu ý 1 số plugin không còn chạy trên cordova android platform 7 phải chuyển platform android sang 6.4.0
      this.showDismissibleAlert = false;
      if(this.UserName.length == 0){
        this.$refs.UserName.focus()
        return;
      }
      if(this.Password.length == 0){
        this.$refs.Password.focus()
        return;
      }

      localStorage.setItem("rememberme", this.rememberme);  
      Users.studentLogin({
        userName: this.UserName,
        password: md5.base64(this.Password),
        deviceid:
          Vue.cordova.device && Vue.cordova.device.uuid
            ? Vue.cordova.device.uuid
            : "DEVICE_UUID"
      })
        .then(response => {
          if (response.isSuccess) {
            localStorage.setItem("access_token", response.message);
            if(this.rememberme){
              localStorage.setItem("UserName", this.UserName);
              localStorage.setItem("Password", this.Password);  
                
            } else {
              localStorage.removeItem("UserName");
              localStorage.removeItem("Password");
            }
            Users.getUserInfor()
              .then(user => {
                localStorage.setItem("user", JSON.stringify(user));
                if (JSON.parse(localStorage.getItem("user") != null)) {
                  this.$router.push("/");
                }
                
              })
              .catch(err => {
                this.showDismissibleAlert = true;               
                console.error(err);
              });
          } else {
            this.showDismissibleAlert = true;
            console.error(response);
          }
        })
        .catch(error => {
          this.showDismissibleAlert = true;
          console.error(error);
        });
    }
  }
};
</script>
