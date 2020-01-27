import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    title: "",
    description: "",
    questions: [],
    questionId: 0,
    orderId: 0
  },
  getters: {
    getFormTitle(state) {
      return state.title;
    },
    getFormDescription(state) {
      return state.description;
    }
  },
  mutations: {
    setTitle(state, newValue) {
      state.title = newValue;
    }
  }
});
