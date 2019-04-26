import {
  createCredentials
} from "crypto";

export const Settings = {
  // BASEURL: "http://essoft.vn:806",
  //BASEURL: "https://tinchi.hau.edu.vn",
  // BASEURL: "http://localhost:5000",
  // BASEURL: "http://www.vutm.com:555",
  BASEURL: "http://www.hau.com:333",
  NOIMAGE: "img/avatars/u1.png"
};
export const Users = {

  studentLogin(params) {
    return new Promise((resolve, reject) => {
      //Vi du dung base url de thay the cac cho khai bao cung
      var url = new URL(Settings.BASEURL + "/api/login");
      // params = {
      //   userName: crendential.UserName, //  "60.58.01.02",
      //   password: crendential.Password, //"mhl9QmgbrLq8W8pV5u/lpQ==",
      //   deviceid: "ggsgfdgdg"
      // };
      Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
      fetch(url, {

        method: "POST",

        headers: {

          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).then(response => {
        resolve(response.json());
      }).then(error => {
        reject(error);
      });
    });
  },
  postMessenger(crendential) {


    return this.callServerApi("postmessenger", crendential);

  },


  getUserInfor() {
    return this.callServerApi("Profile");

  },
  getLearningPoint() {
    return this.callServer("LearningPoints");

  },
  callServer(url) {
    return new Promise((resolve, reject) => {
      let token = localStorage.getItem("access_token");
      fetch(Settings.BASEURL + "/api/" + url + "?accessToken=" + token, {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }

        })
        .then(data => {
          console.log("Lấy dữ liệu thành công: ", data);
          resolve(data.json());
        })
        .catch(error => {
          console.log("Lấy dữ liệu thất bại: ", error);
          reject(error);
        });
    });
  },
  /**
   * 
   * @param {String} endpoint api endpoint router in server
   * @param {Object} params javaScript Object define as {key, value} to send to server
   */
  callServerApi(endpoint, params) {

    return new Promise((resolve, reject) => {
      let token = localStorage.getItem("access_token");
      let parameters = {};
      let url = {};
      if (token == null) reject({
        "error": "Bạn chưa đăng nhập hoặc không có quyền truy xuất thông tin!"
      });
      if (!endpoint) reject({
        "error": "Chưa có tham số (Endpoint) gọi API !"
      });
      if (params) parameters = params;
      parameters.accessToken = token;
      url = new URL(Settings.BASEURL + "/api/" + endpoint),
        Object.keys(parameters).forEach(key => url.searchParams.append(key, parameters[key]));



      fetch(url, {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        })
        .then(data => {
          console.info("Call " + endpoint + " : thành công: ", data);
          resolve(data.json());
        })
        .catch(error => {
          console.error("Call " + endpoint + " : thất bại: ", error);
          reject(error);
        });
    });
  },

  getMsgDetail(url, chatId) {
    return new Promise((resolve, reject) => {
      let token = localStorage.getItem("access_token");
      fetch(Settings.BASEURL + "/api/" + url + "?accessToken=" + token + "&id=" + chatId, {
          method: "POST",

          headers: {

            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }

        })
        .then(data => {
          console.log("Lấy dữ liệu SMS thành công: ", data);
          resolve(data.json());
        })
        .catch(error => {
          console.log("Lấy dữ liệu SMS thất bại: ", error);
          reject(error);
        });
    });
  },

  getCurrent() {
    // alert("Gọi được hàm từ Users");
    let user = JSON.parse(localStorage.getItem("user"));
    user.avatar = NOIMAGE;
    if (user.Image_Url != null && user.Image_Url.trim() != "") {
      user.avatar = Settings.BASEURL + user.Image_Url;
    }
    return user;
  }


};

export const Data = {

};

export default {
  Users,
  Data,
  Settings
};