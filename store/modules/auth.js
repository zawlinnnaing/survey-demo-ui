import axios from "../../modules/app-axios";

export default {
  namespace: true,
  state: {
    loggedIn: false,
    name: "",
    email: ""
  },
  mutations: {
    setLoggedIn(state, value) {
      state.loggedIn = Boolean(value);
    },
    setName(state, name) {
      state.name = name;
    },
    setEmail(state, value) {
      state.email = value;
    }
  },

  actions: {
    async registerUser({ commit }, payload) {
      try {
        let res = await axios.post("/register", payload);
        axios.setAuthorizationHeader(res.accessToken);
        commit("setLoggedIn", true);
        commit("setName", res.data.name);
        commit("setEmail", res.data.email);
      } catch (error) {
        console.error(error);
        throw e;
      }
    },
    async logoutUser({ commit }) {
      try {
        await axios.get("/logout");
        commit("setLoggedIn", false);
        commit("setName", "");
        commit("setEmail", "");
      } catch (e) {
        console.log(e);
        throw e;
      }
    },
    async loginUser({ commit }, payload) {
      try {
        let { data } = await axios.post("/login", payload);
        axios.setAuthorizationHeader(data.accessToken);
        commit("setLoggedIn", true);
        commit("setName", data.name);
        commit("setEmail", data.email);
      } catch (e) {
        console.log(e);
        throw e;
      }
    }
  }
};
