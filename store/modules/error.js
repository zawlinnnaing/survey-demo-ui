export default {
  namespaced: true,
  state: {
    messages: []
  },
  mutations: {
    setMessage(state, message) {
      state.messages.push(message);
    },
    clearMessages(state) {
      state.messages = [];
    }
  }
};
