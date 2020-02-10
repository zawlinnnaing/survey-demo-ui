import axios from "../../modules/app-axios";
export default {
  namespaced: true,
  state: {
    forms: [],
    answerLinks: []
  },
  mutations: {
    removeForm(state, formId) {
      let index = state.forms.findIndex(ele => ele.id == formId);
      state.forms.splice(index, 1);
    },
    setForms(state, forms) {
      state.forms = forms;
    },
    setAnswerLinks(state, answerLinks) {
      state.answerLinks = answerLinks;
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
    },
    async generateAnswerLinks({ commit }, payload) {
      try {
        let url = `/forms/${payload.formId}/tokens`;
        let { data } = await axios.post(url, {
          count: payload.count
        });
        let answerLinks = data.tokens.map(ele => {
          return {
            link: `${payload.baseUrl}${ele.token}`,
            answered: ele.answered
          };
        });
        commit("setAnswerLinks", answerLinks);
      } catch (e) {
        throw e;
      }
    },
    async getAnswerLinks({ commit }, payload) {
      try {
        let url = `/forms/${payload.formId}/links`;
        let { data } = await axios.get(url);
        let answerLinks = data.AccessTokens.map(ele => {
          return {
            link: `${payload.baseUrl}${ele.token}`,
            answered: ele.answered
          };
        });
        commit("setAnswerLinks", answerLinks);
      } catch (e) {
        throw e;
      }
    }
  }
};
