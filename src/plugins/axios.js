import Vue from "vue";
import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3";

axios.defaults.params = {
  api_key: "a6e6381bba3f98f3d8d5d40dbe25d1a4",
};

Vue.use({
  install(Vue) {
    Vue.prototype.$http = axios;
  },
});
