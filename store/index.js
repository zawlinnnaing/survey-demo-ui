import Vue from "vue";
import Vuex from "vuex";
import actions from "./actions/actions";
import { answer } from "./modules/answer";
import tmpQuestion from "./modules/tmpQuestion";
import questionMutations from "./mutations/question-mutations";
import error from "./modules/error";
import itemMutations from "./mutations/item-mutations";
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    answer,
    error,
    tmpQuestion
  },
  state: {
    title: "",
    description: "",
    questions: [],
    questionId: 0,
    orderId: 0,
    items: []
  },
  getters: {
    getFormTitle(state) {
      return state.title;
    },
    getFormDescription(state) {
      return state.description;
    },
    getQuestionFromOrder: state => order => {
      return state.questions.find(ele => ele.order == order);
    },
    getQuestionFromIndex: state => index => {
      return state.questions[index];
    }
  },
  mutations: {
    ...questionMutations,
    ...itemMutations,
    setTitle(state, newValue) {
      state.title = newValue;
    },
    setDescription(state, newValue) {
      state.description = newValue;
    },

    clearForm(state) {
      state.questions = [];
      state.questionId = 0;
      state.title = "";
      state.description = "";
    }
  },
  actions: {
    clearForm(context) {
      context.commit("clearForm");
      context.commit("initItems");
    },
    ...actions
  }
});
