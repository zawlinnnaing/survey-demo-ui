import Vue from "vue";
import Vuex from "vuex";
import actions from "./actions";
import { answer } from "./modules/answer";
import error from "./modules/error";
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    answer,
    error
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
    }
  },
  mutations: {
    setTitle(state, newValue) {
      state.title = newValue;
    },
    setDescription(state, newValue) {
      state.description = newValue;
    },
    addQuestion(state, newValue) {
      state.questions.push(newValue);
    },
    incrementQuestionId(state) {
      state.questionId++;
    },
    resetQuestionId(state) {
      state.questionId = 0;
    },
    pushItem(state, item) {
      state.items.push(item);
    },
    initItems(state) {
      state.items = [
        {
          itemName: "New Option",
          itemId: 0
        }
      ];
    },
    editItems(state, payload) {
      state.items[payload.index] = {
        itemName: payload.itemName,
        order: payload.index
      };
    },
    deleteItemFromItems(state, index) {
      state.items.splice(index, 1);
    },
    reorderItems(state) {
      state.items.forEach((item, index) => {
        item.order = index;
      });
    },
    reorderQuestions(state) {
      state.questions.forEach((question, index) => {
        question.order = index;
      });
    },
    deleteQuestion(state, index) {
      state.questions.splice(index, 1);
    },
    clearForm(state) {
      state.questions = [];
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
