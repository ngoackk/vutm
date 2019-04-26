<template>
  <AppHeaderDropdown right no-caret>
    <template slot="header">
      <i class="fa fa-envelope"></i>
      <b-badge pill variant="danger">{{itemsCount}}</b-badge>
    </template>
    <template slot="dropdown">
       <b-dropdown-item v-if="msg.length == 0">
         Không có tin nhắn!
       </b-dropdown-item>
      <b-dropdown-item @click="$router.push('/messenger')" v-for="ms in msg" :key="ms.ID">
        <div class="py-3 mr-3 float-left">
          <div class="avatar">
            <img v-bind:src="user.avatar" class="img-avatar" :alt="user.avatar">
            <b-badge variant="success" class="avatar-status"></b-badge>
          </div>
        </div>

        <div>
          <div class="text-truncate font-weight-bold">{{ms.Tieude}}</div>
        </div>
        <div>
          <small class="text-muted">{{ms.NgayGui}}</small>
        </div>
      </b-dropdown-item>
    </template>
  </AppHeaderDropdown>
</template>

<script>
import { HeaderDropdown as AppHeaderDropdown } from "@coreui/vue";
import { Users, Data } from "../apis/api";

export default {
  inject: ["currentUser"],
  name: "DefaultHeaderDropdownMsg",

  components: {
    AppHeaderDropdown
  },
  data() {
    return {
      msg: []
    };
  },

  mounted() {
    Users.callServer("Chat")
      .then(listThongTin => {
        this.msg = listThongTin;
      })
      .catch(err => {
        console.log(err);
      });
  },

  computed: {
    itemsCount() {
      return this.msg.length;
    },
    user() {
      return this.currentUser();
    },
    Img() {
      return {
        avatar: Users.getCurrent().Image_Url
      };
    }
  },

  methods: {
    loadMore() {}
  }
};
</script>
