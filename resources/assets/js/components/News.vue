<template>
  <div>
    <div>
      <span class="title">BẢN TIN</span>
    </div>
    <ul>
      <li role="tablist" v-for="mss in msg" :key="mss.ID">
        <b-link role="tab" v-b-toggle="mss.ID+''">{{mss.Tieu_de}}</b-link>
        <b-collapse :id="mss.ID+''" role="tabpanel1" accordion="my-accordion" class="mt-2">
          <b-card>
            <p class="card-text" v-html="mss.Noi_dung"></p>
          </b-card>
        </b-collapse>
      </li>
    </ul>
   
  </div>
</template>
<script>
import { Users, Date } from "../apis/api";

export default {
  data() {
    return {
      msg: []
    };
  },

  mounted() {
    Users.callServerApi("Notification")
      .then(msgList => {
        this.msg = msgList;
      })

      .catch(err => {
        console.error(err);
        // alert(err);
      });
  },

  computed: {
    Name() {
      return this.currentUser()["Ho_ten"];
    }
  },
  methods: {}
};
</script>
