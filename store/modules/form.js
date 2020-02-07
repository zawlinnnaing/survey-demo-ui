import axios from "../../modules/app-axios";
export default {
  namespaced: true,
  state: {
    forms: []
  },
  mutations: {
    removeForm(state, formId) {
      let index = state.forms.findIndex(ele => ele.id == formId);
      state.forms.splice(index, 1);
    },
    setForms(state, forms) {
      state.forms = forms;
    }
  },
  actions: {
    async fetchAllForms({ commit }) {
      try {
        let { data } = await axios.get("/forms");
        commit("setForms", data);
      } catch (e) {
        throw e;
      }
    },
    async deleteForm({ commit }, id) {
      try {
        await axios.delete(`/forms/${id}`);
        commit("removeForm", id);
      } catch (e) {
        throw e;
      }
    }
  }
};
