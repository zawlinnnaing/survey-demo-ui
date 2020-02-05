import Vue from "vue";
import Router from "vue-router";

// Route components
// import CreateForm from "../src/components/CreateForm";
import CreateFormSuccess from "../src/components/CreateFormSuccess";
import ShowForm from "../src/components/ShowForm";
import Forms from "../src/components/Forms";
import ShowChart from "../src/components/ShowChart";
import ErrorComponent from "../src/components/Error";
import Login from "../src/components/Login";
import Register from "../src/components/Register";

import { CreateForm } from "../src/components";
// Middlewares
import authMiddleware from "./middlewares/auth";
import guestMiddleware from "./middlewares/guest";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Home",
      component: Forms
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
      beforeEnter: guestMiddleware
    },
    {
      path: "/register",
      name: "Register",
      component: Register,
      beforeEnter: guestMiddleware
    },
    {
      path: "/create-form",
      name: "CreateForm",
      component: CreateForm,
      beforeEnter: authMiddleware
    },
    {
      path: "/create-form/success/:message",
      name: "CreateFormSuccess",
      component: CreateFormSuccess,
      beforeEnter: authMiddleware
    },
    {
      path: "/show-form/:formId",
      name: "ShowForm",
      component: ShowForm
    },
    {
      path: "/forms",
      component: Forms,
      name: "Forms"
    },
    {
      path: "/chart/:formId",
      component: ShowChart,
      name: "ShowChart",
      beforeEnter: authMiddleware
    },
    {
      path: "/errors",
      component: ErrorComponent,
      name: "Errors"
    }
  ]
});
