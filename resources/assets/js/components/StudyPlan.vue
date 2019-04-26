<template>
  <div>
    <div>
      <span class="title">LỊCH HỌC</span>
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
import { AgGridVue } from "ag-grid-vue";
import { Users, Data } from "../apis/api";

export default {
  name: "App",

  inject: ["currentUser"],
  data() {
    return {
      schoolyear: { schoolyear: null },
      selected: null,
      options: [],
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
        headerName: "Tên học phần",
        field: "TenMonTC",
        sortable: true,
        filter: true,
        suppressSizeToFit: true,
        resizable: true,
        width: 350
      },

      {
        headerName: "Đợt",
        field: "Dot",
        sortable: true,
        filter: true,
        width: 70
      },
      {
        headerName: "Lớp",
        field: "Ky_hieu_lop_tc",
        sortable: true,
        filter: true,
        width: 100
      },
      {
        headerName: "Thứ",
        field: "Thu",
        sortable: true,
        filter: true,
        width: 100
      },
      {
        headerName: "Phòng",
        field: "Phong",
        sortable: true,
        filter: true,
        width: 150
      },
      {
        headerName: "Tiết",
        field: "Tiet",
        sortable: true,
        filter: true,
        width: 70
      },
      {
        headerName: "Tín chỉ",
        field: "So_tin_chi",
        sortable: true,
        filter: true,
        width: 100
      }
    ];
  },

  computed: {
    user() {
      return this.currentUser();
    }
  },

  //====================MOUNTED====================
  mounted() {
    this.initYears(2000);
    this.loadDB(this.selected);
  },

  methods: {
    loadDB(selected) {
      this.schoolyear.schoolyear = selected;

      Users.callServerApi("StudySchedule", this.schoolyear)
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