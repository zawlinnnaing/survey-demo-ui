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
    }
  }
};
