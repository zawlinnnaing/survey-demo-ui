import store from "../../store";

export default (to, from, next) => {
  if (store.state.auth.loggedIn) {
    next();
  } else {
    next({ name: "Login", query: { redirect: to.fullPath } });
  }
};
