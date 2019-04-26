<template>
  <div class="app" id="deviceready">
    <div style="height:5px;"></div>
    <div class="bgr_container">
      <!-- Bắt đầu container-->
      <div class="container">
        <!-- Phần Banner -->
        <div class="row justify-content-center">
          <div class="col-xs-12">
            <img src="img/banner.jpg" width="100%">
          </div>
        </div>

        <!--Phần main content hàng 1 -->
        <div class="row justify-content-center">
          <div class="col-xs-3">
            <button @click="goto('/studyplan')" type="button" class="btn main">
              <div>
                <img src="img/lichhoc.png" alt="Lịch học" height="45">
              </div>
              <div class="title_color">Lịch học</div>
            </button>
          </div>

          <div class="col-xs-3">
            <button @click="goto('/testplan')" type="button" class="btn main">
              <div>
                <img src="img/test.png" alt="Lịch thi" height="45">
              </div>
              <div class="title_color">Lịch thi</div>
            </button>
          </div>

          <div class="col-xs-3">
            <button @click="goto('/survey')" type="button" class="btn main">
              <div>
                <img src="img/survey.png" alt="Khảo sát" height="45">
              </div>
              <div class="title_color">Khảo sát</div>
            </button>
          </div>
          <div class="col-xs-3">
            <button @click="goto('/result')" type="button" class="btn main">
              <div>
                <img src="img/result.png" alt="Kết quả" height="45">
              </div>
              <div class="title_color">Kết quả</div>
            </button>
          </div>
        </div>

        <!--Phần main content hàng 2 -->
        <div class="row justify-content-center">
          <div class="col-xs-3">
            <button @click="goto('/messenger')" type="button" class="btn main">
              <div>
                <img src="img/mess.png" alt="Tin nhắn" height="45">
              </div>
              <div class="title_color">Tin nhắn</div>
            </button>
          </div>

          <div class="col-xs-3">
            <button @click="goto('/news')" type="button" class="btn main">
              <div>
                <img src="img/news.png" alt="Bản tin" height="45">
              </div>
              <div class="title_color">Bản tin</div>
            </button>
          </div>

          <div class="col-xs-3">
            <button @click="goto('/one-gate')" type="button" class="btn main">
              <div>
                <img src="img/1gate.png" alt="Một cửa" height="45">
              </div>
              <div class="title_color">Một cửa</div>
            </button>
          </div>

          <div class="col-xs-3">
            <button @click="goto('/finance')" type="button" class="btn main">
              <div>
                <img src="img/taichinh.png" alt="Tài chính" height="45">
              </div>
              <div class="title_color">Tài chính</div>
            </button>
          </div>
        </div>
      </div>
      <!-- Hết container-->
    </div>
  </div>
</template>


<script>
import { Users, Data } from "../apis/api";
export default {
  data() {
    return {
      User: {
        Name: ""
      },
      Points: [],
      Bank: {}
    };
  },
  created() {},
  mounted() {
    this.User.Name = "pham";
  },
  methods: {
    goto(url) {
      this.$router.push(url);
    },
    mt1() {},
    mt2() {}
  }
};
</script>
