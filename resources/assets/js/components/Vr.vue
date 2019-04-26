<template>
  <div class="container">
    <div class="row">
      <div class="col-4">THÔNG TIN</div>

      <div class="col-4">
        <b-button @click="takePicture" varian="primary" size="sm">Chụp ảnh</b-button>
      </div>
    </div>

    <div class="row">
      <div class="col-12">
        <b-container fluid class="p-4 bg-dark">
          <b-img thumbnail fluid :src="img.url"/>
        </b-container>
      </div>
    </div>
  </div>
</template>

<script>
import { Users } from "../apis/api";
import Vue from "vue";
export default {
  inject: ["currentUser"],
  data() {
    return {
      device: "",
      img: { url: "" }
    };
  },

  computed: {
    user() {
      return this.currentUser();
    }
  },

  mounted() {},
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
