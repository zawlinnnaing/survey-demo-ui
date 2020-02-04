import Vue from "vue";
import Vuex from "vuex";
import actions from "./actions";
import { answer } from "./modules/answer";
import tmpQuestion from "./modules/tmpQuestion";
import error from "./modules/error";
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
          itemName: "New Option"
        }
      ];
    },
    setItems(state, items) {
      state.items = items;
    },
    moveQuestions(state, payload) {
      state.questions.splice(
        payload.newIndex,
        0,
        state.questions.splice(payload.oldIndex, 1)[0]
      );
    },
    editItems(state, payload) {
      state.items[payload.index] = {
        itemName: payload.itemName,
        order: payload.index
      };
    },
    editQuestion(state, questionObj) {
      let index = state.questions.findIndex(
        ele => ele.order == questionObj.order
      );
      // console.log("from edit question", questionObj);
      state.questions.splice(index, 1, questionObj);
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
