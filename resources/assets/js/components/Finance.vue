<template>
  <div>
    <div>
      <span class="title">THÔNG TIN TÀI CHÍNH</span>
    </div>
    <div>
      <span class="title">Sinh viên: {{user.Ho_ten}}</span>
    </div>
    <div>
      <b-table id="table-transition-example" :items="finance_sort" :fields="fields" striped small/>
    </div>
  </div>
</template>

<script>
import { Users, Data } from "../apis/api";

export default {
  name: "App",

  inject: ["currentUser"],
  data() {
    return {
      finance_sort: [],
      finance_detail: [],
      fields: []
    };
  },
  components: {},
  beforeMount() {
    this.fields = [
      { key: "nam_hoc", label: "Năm học" , sortable: true},
      { key: "Hoc_ky", label: "Học kỳ" },
      { key: "So_tien_da_nop", label: "Đã nộp" },
      { key: "so_tien_phai_nop", label: "Phải nộp" },
      { key: "Thieu_thua", label: "Thừa thiếu" }
    ];
  },

  mounted() {
    Users.callServerApi("Finance")
      .then(points => {
        if (points.length > 0) this.finance_sort = points[0];
        if (points.length > 1) this.finance_detail = points[1];
      })
      .catch(err => {
        console.error(err);
      });
  },
  computed: {
    user() {
      return this.currentUser();
    }
  }
};
</script>