<template>
  <div>
    <div class="title">KHẢO SÁT</div>

    <div class="title">{{user.Ho_ten}}</div>
    <div class="navlink">
      {{mess}}
      <a href="https://tinchi.hau.edu.vn">https://tinchi.hau.edu.vn</a>
    </div>
  </div>
</template>
<script>
import { Users } from "../apis/api";

export default {
  inject: ["currentUser"],
  data: function() {
    return {
      success: "Thành công",
      mess:
        "Phần khảo sát thực hiện trên cổng thông tin sinh viên tại địa chỉ: "
    };
  },

  computed: {
    user() {
      return this.currentUser();
    }
  }
};
</script>
