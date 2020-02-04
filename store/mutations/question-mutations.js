export default {
  addQuestion(state, newValue) {
    state.questions.push(newValue);
  },
  incrementQuestionId(state) {
    state.questionId++;
  },
  resetQuestionId(state) {
    state.questionId = 0;
  },
  moveQuestions(state, payload) {
    state.questions.splice(
      payload.newIndex,
      0,
      state.questions.splice(payload.oldIndex, 1)[0]
    );
  },
  editQuestion(state, questionObj) {
    let index = state.questions.findIndex(
      ele => ele.order == questionObj.order
    );
    state.questions.splice(index, 1, questionObj);
  },
  reorderQuestions(state) {
    state.questions.forEach((question, index) => {
      question.order = index;
    });
  },
  deleteQuestion(state, order) {
    let index = state.questions.findIndex(ele => ele.order == order);
    state.questions.splice(index, 1);
  }
};
