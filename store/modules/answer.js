import axios from "../../modules/app-axios";
import questionTypes from "../../config/app";

export const answer = {
  namespaced: true,
  state: {
    answers: []
  },
  getters: {
    findAnswerByQuestionId: state => id => {
      return state.answers.find(ele => ele.questionId == id);
    }
  },
  mutations: {
    pushAnswer(state, payload) {
      let obj = {};
      obj.questionId = payload.questionId;
      if (questionTypes.listQuestionTypes.includes(payload.type)) {
        obj.listAnswers = payload.answer;
      } else {
        obj.textAnswer = payload.answer;
      }
      state.answers.push(obj);
    },
    populateAnswers(state, questions) {
      state.answers = [];
      questions.forEach(ele => {
        let obj = {};
        obj.questionId = ele.id;
        if (questionTypes.listQuestionTypes.includes(ele.type)) {
          obj.listAnswers = [];
        } else {
          obj.textAnswer = "";
        }
        state.answers.push(obj);
      });
    },
    findAndUpdateAnswer(state, payload) {
      state.answers.forEach(ele => {
        if (ele.questionId == payload.questionId) {
          if (questionTypes.listQuestionTypes.includes(payload.type)) {
            ele.listAnswers = payload.answer;
          } else {
            ele.textAnswer = payload.answer;
          }
        }
      });
    },
    clearAnswers(state) {
      state.answers = [];
    }
  },
  actions: {
    async submitAnswers({ state, commit }, payload) {
      try {
        let url = "/forms/" + payload.formId + "/answers/" + payload.token;
        let data = state.answers;
        await axios.post(url, data);
        commit("clearAnswers");
      } catch (e) {
        throw e;
      }
    }
  }
};
