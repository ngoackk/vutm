<template>
  <div>
    <div>{{currentUser["Ho_ten"]}}</div>
    <ag-grid-vue
      style="width: 100%; height: 100%;"
      class="ag-theme-balham"
      :columnDefs="columnDefs"
      :rowData="rowData"
    ></ag-grid-vue>
  </div>
</template>

<script>
import { AgGridVue } from "ag-grid-vue";
import {Users, Data} from "../apis/api";

export default {
  name: "App",

  inject: ["currentUser"],
  data() {
    return {
      columnDefs: null,
      rowData: null,
      bangdiem: []
    };
  },
  components: {
    AgGridVue
  },
  beforeMount() {
    this.columnDefs = [
      {
        headerName: "Môn học",
        field: "Ten_hoc_phan",
        sortable: true,
        filter: true
      },
      {
        headerName: "Điểm chữ",
        field: "Diem_chu",
        sortable: true,
        filter: true
      },
      {
        headerName: "Số học trình",
        field: "So_hoc_trinh",
        sortable: true,
        filter: true
      }
    ];

    // this.rowData = [
    //   { make: "Toyota", model: "Celica", price: 35000 },
    //   { make: "Ford", model: "Mondeo", price: 32000 },
    //   { make: "Porsche", model: "Boxter", price: 72000 }
    // ];

    // fetch("http://103.28.37.34:98/api/huyen")
    //   .then(result => result.json())
    //   .then(rowData => (this.rowData = rowData));
  },

  mounted() {
    Users.callServer("LearningPoints")
      .then(points => {
        this.bangdiem = points;
        this.rowData = points;
      })
      .catch(err => {
         console.error(err)
        //alert(err);
      });
  }
};
</script>