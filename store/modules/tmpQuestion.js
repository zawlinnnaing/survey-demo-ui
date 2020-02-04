export default {
  namespaced: true,
  state: {
    question: "",
    required: false,
    items: [],
    type: "",
    order: 0
  },
  getters: {},
  mutations: {
    setQuestion(state, value) {
      state.question = value;
    },
    setRequired(state, value) {
      console.log("from set required :", value);
      state.required = value;
    },
    setItems(state, item) {
      state.required = item;
    },
    setType(state, value) {
      state.type = value;
    },
    setOrder(state, value) {
      state.order = value;
    },
    setObj(state, obj) {
      state.question = obj.question;
      state.required = obj.required;
      state.items = obj.items;
      state.type = obj.type;
      state.order = obj.order;
    },
    clear(state) {
      state.question = "";
      state.required = false;
      state.items = [];
      state.type = "";
      state.order = 0;
    }
  }
};
