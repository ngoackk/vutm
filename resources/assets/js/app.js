// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'core-js/es6/promise';
import 'core-js/es6/string';
import 'core-js/es7/array';
// import cssVars from 'css-vars-ponyfill'
import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import App from './Mobile';
import router from './router';
import store from '../js/store';
import {
  Settings
} from '../js/apis/api'
import Hub from '../js/apis/hub'
import VueCordova from 'vue-cordova'
Vue.use(VueCordova)

// todo
// cssVars()

Vue.use(BootstrapVue)
// Khai bao bien toan cuc de su dung trong vue component
Vue.prototype.$Settings = Settings;
Vue.prototype.$Hub = Hub;
/* eslint-disable no-new */
window.onload = function () {
  // Chỉ nạp plugin khi chạy trên device, trên web không chạy
  if (window.location.protocol === 'file:' || window.location.port === '5000') {
    var cordovaScript = document.createElement('script')
    cordovaScript.setAttribute('type', 'text/javascript')
    cordovaScript.setAttribute('src', 'cordova.js')
    document.body.appendChild(cordovaScript)
  }
  new Vue({
    //el: '#app',
    router,
    store,
    template: '<App/>',
    components: {
      App
    }
  }).$mount('#app');
};