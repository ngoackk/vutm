<template>
  <div class="app">
    <AppHeader fixed>
      <SidebarToggler class="d-lg-none" display="md" mobile/>
      <b-link class="navbar-brand" to="/home">
        <img class="navbar-brand-full" src="img/logo-f.png" width="30" height="30" alt="hau.edu.vn">
        <img
          class="navbar-brand-minimized"
          src="img/logo-f.png"
          width="30"
          height="30"
          alt="hau.edu.vn"
        >
      </b-link>
      <SidebarToggler class="d-md-down-none" display="lg"/>

      <b-navbar-nav class="ml-auto">
        <div class="title">ĐẠI HỌC KIẾN TRÚC HÀ NỘI</div>

        <DefaultHeaderDropdownMsg/>
        <DefaultHeaderDropdownAccnt/>
      </b-navbar-nav>
    </AppHeader>
    <div class="app-body">
      <AppSidebar fixed>
        <SidebarHeader/>
        <SidebarForm/>
        <SidebarNav :navItems="nav"></SidebarNav>
        <SidebarFooter/>
        <SidebarMinimizer/>
      </AppSidebar>
      <main class="main">
        <!-- <Breadcrumb :list="list"/> -->
        <div>
          <router-view></router-view>
        </div>
      </main>
      <AppAside fixed>
        <!--aside-->
        <DefaultAside/>
      </AppAside>
    </div>
    <TheFooter>
      <!--footer-->
      <div>
        <span class="ml-1">&copy; 2019</span>
      </div>
      <div class="ml-auto">        
        NAMVIET.JSC
      </div>
    </TheFooter>
  </div>
</template>

<script>
import nav from "./_nav";
import {
  Header as AppHeader,
  SidebarToggler,
  Sidebar as AppSidebar,
  SidebarFooter,
  SidebarForm,
  SidebarHeader,
  SidebarMinimizer,
  SidebarNav,
  Aside as AppAside,
  AsideToggler,
  Footer as TheFooter,
  Breadcrumb
} from "@coreui/vue";
import DefaultAside from "./DefaultAside";
import DefaultHeaderDropdownAccnt from "./DefaultHeaderDropdownAccnt";
import DefaultHeaderDropdownMsg from "./DefaultHeaderDropdownMsg";

export default {
  name: "DefaultContainer",
  components: {
    AsideToggler,
    AppHeader,
    AppSidebar,
    AppAside,
    TheFooter,
    DefaultAside,
    DefaultHeaderDropdownAccnt,
    DefaultHeaderDropdownMsg,
    SidebarForm,
    SidebarFooter,
    SidebarToggler,
    SidebarHeader,
    SidebarNav,
    SidebarMinimizer
  },
  data() {
    return {
      nav: nav.items
    };
  },
  mounted() {
    this.$Hub.$on("notification", data => {
      console.log("On Notification ", data);
    });
  },
  destroyed() {
    this.$Hub.$off("notification");
  },
  computed: {
    name() {
      console.log("In thu bien global trong settings");
      console.log(this.$Settings);
      return this.$route.name;
    },
    list() {
      return this.$route.matched.filter(
        route => route.name || route.meta.label
      );
    }
  }
};
</script>
<style lang="scss" scoped>
.title {
  font-size: x-small;
}
.app-header {
  .navbar-brand {
    margin: 0;
    top: 0;
    left: 50px;
    width: 0px;
  }
}
</style>