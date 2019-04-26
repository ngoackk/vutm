<template>
  <div>
    <div>
      <span class="title">{{user.Ho_ten}}</span>
    </div>
    <div>
      <div>
        <b-table
          id="table-transition-example"
          :items="bangdiem"
          :fields="fields"
          striped
          small
          
        />
      </div>
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
      bangdiem: [],
      fields: []
    };
  },
  components: {},
  beforeMount() {
    this.fields = [
      { key: "Ten_hoc_phan", label: "Tên học phần" },
      { key: "Diem_chu", label: "Điểm" }
    ];
  },

  mounted() {
    Users.callServerApi("LearningPoints")
      .then(points => {
        this.bangdiem = points;
        this.rowData = points;
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