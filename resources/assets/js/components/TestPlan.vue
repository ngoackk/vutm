<template>
  <div>
    <div>
      <span class="title">LỊCH THI</span>
    </div>

    <div>
      <b-form-select class="mt-3" v-model="selected" :options="options" @change="loadDB($event)"/>
    </div>

    <!-- <div>
      <b-table responsive striped :items="bangdiem" :fields="fields" small/>
    </div>-->
    <ag-grid-vue
      style="width: 100%; height: 100%;"
      class="ag-theme-balham"
      :columnDefs="columnDefs"
      :rowData="rowData"
    ></ag-grid-vue>
  </div>
</template>

<script>
import { Users, Data } from "../apis/api";
import { AgGridVue } from "ag-grid-vue";

export default {
  name: "App",

  inject: ["currentUser"],
  data() {
    return {
      schoolyear: { schoolyear: null },
      options: [],
      selected: null,
      columnDefs: null,
      rowData: null,
      bangdiem: [],
      tinhtrang: "",
      fields: [],
      count: 0
    };
  },
  components: {
    AgGridVue
  },
  beforeMount() {
    // this.fields = [
    //   { key: "Ten_mon", label: "Môn học", sortable: true },
    //   { key: "Hoc_ky", label: "Học kỳ" },

    //   { key: "Ngay_thi", label: "Ngày thi", sortable: true },
    //   { key: "Gio_thi", label: "Giờ thi" },
    //   { key: "Ten_phong", label: "Phòng thi" },
    //   { key: "so_bao_danh", label: "Số báo danh" }
    // ];
    this.columnDefs = [
      {
        headerName: "Môn học",
        field: "Ten_mon",
        sortable: true,
        filter: true,
        width: 250,
        resizable:true

      },
      {
        headerName: "Ngày thi",
        field: "Ngay_thi",
        sortable: true,
        filter: true,
        width: 100
      },
      {
        headerName: "Giờ thi",
        field: "Gio_thi",
        sortable: true,
        filter: true,
        width: 100
      },
      {
        headerName: "Phòng thi",
        field: "Ten_phong",
        sortable: true,
        filter: true,
        width: 200
      },
      {
        headerName: "Số báo danh",
        field: "so_bao_danh",
        sortable: true,
        filter: true,
        width: 100
      }
    ];
  },

  mounted() {
    this.initYears(2000);
    this.loadDB(this.selected);
  },
  computed: {
    user() {
      return this.currentUser();
    }
  },
  methods: {
    //Chuẩn bị năm học//

    loadDB(selected) {
      this.schoolyear.schoolyear = selected;

      Users.callServerApi("ExamSchedule", this.schoolyear)
        .then(points => {
          if (points) {
            this.bangdiem = points;
            this.rowData = points;
          } else {
            this.tinhtrang = "Năm học bạn chọn không có dữ liệu";
          }
        })
        .catch(err => {
          console.error(err);
        });
    },

    //==========Hàm chuẩn bị năm học cho select box================//
    initYears(yearmin) {
      this.options = [];

      var tmpYear = new Date().getFullYear();
      let yearmax = tmpYear;
      this.selected = tmpYear - 1 + "-" + tmpYear;

      this.options.push({ value: null, text: "--Chọn năm học--" });

      for (var i = yearmin; i < yearmax; i++) {
        this.options.push({
          value: i + "-" + (i + 1),
          text: i + "-" + (i + 1)
        });
      }

      return this.options;
    }
  }
};
</script>