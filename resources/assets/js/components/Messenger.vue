<template>
  <div>
    <div>
      <span class="title">TIN NHẮN</span>
    </div>

    <div class="container">
      <!-- Open to send Messenger -->
      <div>
        <b-button v-b-toggle.idMessenger variant="primary" size="sm">Gửi tin nhắn</b-button>
        <b-collapse id="idMessenger" class="mt-2">
          <b-form @submit="onSubmit" @reset="onReset" v-if="show">
            <b-form-group id="bTieuDe" label="Tiêu đề:" label-for="idTitle">
              <b-form-input
                id="idTitle"
                type="text"
                v-model="form.title"
                required
                placeholder="Phải nhập tiêu đề"
              ></b-form-input>
            </b-form-group>

            <b-form-group id="noidung" label="Nội dung:" label-for="idContent">
              <b-form-textarea
                id="idContent"
                v-model="form.content"
                required
                placeholder="phải nhập nội dung"
                :rows="3"
                :max-rows="20"
              ></b-form-textarea>
            </b-form-group>
            <b-form-group id="guitoi" label="Gửi tới:" label-for="idSelect">
              <b-form-select id="idSelect" :options="departements" required v-model="form.deptId"></b-form-select>
            </b-form-group>
            <b-form-group id="gopy">
              <b-form-radio-group v-model="form.selected" id="idCheck">
                <b-form-radio value="first">Hỏi đáp</b-form-radio>
                <b-form-radio value="second">Góp ý</b-form-radio>
                <b-form-radio value="third">Báo lỗi</b-form-radio>
              </b-form-radio-group>
            </b-form-group>
            <b-button variant="primary" type="submit">Gửi</b-button>
            <b-button type="reset" variant="danger">Làm lại</b-button>
          </b-form>
        </b-collapse>
        <!------------------->
      </div>
    </div>
    <div class="space"></div>
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div
            role="tablist"
            v-for="mss in msg"
            :key="mss.ID"
            class="blockquote-box blockquote-warning clearfix"
          >
            <div class="cycle pull-left">
              <img class="img-avatar" :src="user.avatar">
            </div>

            <b-link v-b-toggle="mss.ID+''" role="tab">{{mss.Tieude}}</b-link>
            <b-collapse :id="mss.ID+''" class="mt-2" role="tabpanel1" accordion="my-accordion">
              <b-card>
                <p class="card-text" v-for="msd in msgDetail[mss.ID+'']" :key="msd.ID">
                  <span>
                    <div>
                      <span class="title">Người gửi:</span>
                      <span v-html="msd.Nguoi_gui"></span>
                    </div>

                    <div>
                      <span class="title">Nội dung:</span>
                      <p v-html="msd.Noi_dung"></p>
                    </div>

                    <div>
                      <span class="title">Người nhận:</span>
                      {{msd.Nguoi_nhan}}
                    </div>
                    <div>
                      <span class="title">Ngày gửi:</span>
                      {{msd.NgayGui}}
                    </div>
                    <div>------</div>
                  </span>
                </p>
              </b-card>
            </b-collapse>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { Users } from "../apis/api";
import moment from "vue-moment";
Vue.use(moment);
export default {
  inject: ["currentUser"],
  data() {
    return {
      msg: [],
      msgToSend: {},
      msgDetail: {},
      receiverlist: [],
      form: {
        title: "",
        content: "",
        deptId: null,
        checked: [],
        selected: "first"
      },
      departements: [{ value: null, text: "---Chọn---" }],
      show: true
    };
  },

  mounted() {
    this.loadDb();
  },

  computed: {
    user() {
      return this.currentUser();
    },
    Name() {
      return this.currentUser()["Ho_ten"];
    }
  },

  methods: {
    loadDb() {
      Users.callServerApi("Chat")
        .then(listThongTin => {
          this.msg = listThongTin;

          if (this.msg && this.msg.length > 0) {
            this.msg.forEach(ms => {
              this.readMsgDetail(ms.ID)
                .then(detail => {
                  this.$set(this.msgDetail, ms.ID + "", detail);
                })
                .catch(err => {
                  this.$Hub.$emit("Lỗi lấy thông tin CHAT", {
                    type: "error",
                    msg: err
                  });
                });
            });
          }
        })

        .catch(err => {
          //alert("Lỗi phần dữ liệu Tin nhắn: " + err);
          this.$Hub.$emit("notification", { type: "error", msg: err });
        });

      //Lấy danh sách người nhận messenger
      Users.callServerApi("Receiverid")
        .then(rList => {
          this.receiverlist = rList;
          this.receiverlist.forEach(obj => {
            this.departements.push({
              text: obj.Phong,
              value: obj.ID_nguoi_nhan
            });
          });
        })
        .catch(err => {
          console.error(err);
        });
    },

    //Xử lý khi bấm nút GỬI của FORM
    onSubmit(evt) {
      evt.preventDefault();

      this.msgToSend = {};

      //alert(JSON.stringify(this.form));
      //Thu test gui tin nhan update js data

      this.msgToSend = {
        title: this.form.title,
        content: this.form.content,
        send_date: this.$moment().format("YYYY/MM/DD"),
        receiverid: this.form.deptId //this.receiverlist[0].ID_nguoi_nhan
      };

      // alert(JSON.stringify(this.msgToSend));

      Users.postMessenger(this.msgToSend)
        .then(done => {
          this.loadDb();
          this.onReset(this.$event);
        })
        .catch(err => {
          console.error(err);
        });
    },

    //Xử lý nếu ấn RESET của FORM
    onReset(evt) {
      if (evt) {
        evt.preventDefault();
      }

      /* Reset our form values */
      this.form.title = "";
      this.form.content = "";
      this.form.deptId = null;
      this.form.checked = [];
      this.selected = "first";
      /* Trick to reset/clear native browser form validation state */
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
    readMsgDetail(id) {
      return Users.getMsgDetail("Chat", id);
    },

    sendMsg() {
      this.$Hub.$emit("notification", {
        type: "success",
        msg: "Đã gửi : " + this.msgToSend
      });
    }
  }
};
</script>
 
 
