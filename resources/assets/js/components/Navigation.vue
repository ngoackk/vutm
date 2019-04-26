<template>
  <nav class="navbar navbar-default navbar-fixed-top">
    <div class="container-fluid">
      <!-- Brand and toggle get grouped for better mobile display -->
      <div class="navbar-header">
        <button
          type="button"
          class="navbar-toggle collapsed"
          data-toggle="collapse"
          data-target="#bs-example-navbar-collapse-1"
          aria-expanded="false"
        >
          <span class="sr-only">Thực đơn</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <router-link to="/">Trang chủ</router-link>
      </div>

      <!-- Collect the nav links, forms, and other content for toggling -->
      <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul class="nav navbar-nav"></ul>
        <ul class="nav navbar-nav navbar-right">
          <li class="nav-item">
            <router-link to="/studyplan">Lịch học</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/testplan">Lịch thi</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/survey">Khảo sát</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/result">Kết quả học tập</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/messenger">Tin nhắn</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/sales">Sales</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/news">Bản tin</router-link>
          </li>

          <li class="nav-item">
            <router-link to="/one-gate">Một cửa</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/finance">Tài chính</router-link>
          </li>

          <li class="nav-item">
            <router-link to="/login">Đăng xuất</router-link>
          </li>
        </ul>
      </div>
      <!-- /.navbar-collapse -->
    </div>
    <!-- /.container-fluid -->
  </nav>
</template>

<script>
export default {
  methods: {
    goto() {
      //alert("goto ");
      this.$router.push("/goto");
    }
  }
};
</script>
