import Vue from "vue";
import Router from "vue-router";
import Foo from "../src/components/Foo.vue";
import CreateForm from "../src/components/CreateForm";
import CreateFormSuccess from "../src/components/CreateFormSuccess";
import ShowForm from "../src/components/ShowForm";
Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/foo",
      name: "FooRoute",
      component: Foo
    },
    {
      path: "/create-form",
      name: "CreateForm",
      component: CreateForm
    },
    {
      path: "/create-form/success",
      name: "CreateFormSuccess",
      component: CreateFormSuccess
    },
    {
      path: "/show-form/:formId",
      component: ShowForm
    }
  ]
});
