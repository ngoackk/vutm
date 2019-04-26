<template>
  <router-view></router-view>
</template>

<script>
export default {
  provide() {
    return {
      currentUser: this.localUser
    };
  },
  name: "app",
  methods: {
    localUser() {
      let user = JSON.parse(localStorage.getItem("user"));
      user.avatar = "img/avatars/u1.png";
      if (user.Image_Url != null && user.Image_Url.trim() != "") {
        user.avatar = this.$Settings.BASEURL + user.Image_Url;
      }
      return user;
    }
  }
};
</script>

<style lang="scss">
// CoreUI Icons Set

.header {
  background: #00b9f2;
}

.bgr_container {
  background: #00b9f2;
}

.title_color {
  color: #ffffff;
  font-family: Arial;
  font-size: 8pt;
  font-weight: bold;
}

.btn {
  main {
    background: #c1ccd9;
    margin: 0;
    width: 100%;
  }
}

.title {
  font-family: Arial;
  font-weight: bold;
}
.subject {
  font-family: Arial;
  font-weight: bold;
}

.img-avatar {
  width: 30px;
}

.frame {
  border-style: solid;
  border-color: coral;
  border-width: 1px;
  width: 100%;
  margin: 0px 0px 0px 0px;
}

.navlink {
  font-family: Arial;
}
.space {
  height: 10px;
}

table#table-transition-example .flip-list-move {
  transition: transform 1s;
}
</style>
