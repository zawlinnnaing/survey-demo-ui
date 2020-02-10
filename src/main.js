import Vue from "vue";
import App from "./App.vue";
import router from "../router";
import store from "../store";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCheck,
  faTimesCircle,
  faTrashAlt
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add([faCheck, faTimesCircle, faTrashAlt]);
Vue.config.productionTip = false;

Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.use(VueSweetalert2);

new Vue({
  render: h => h(App),
  router,
  store
}).$mount("#app");
