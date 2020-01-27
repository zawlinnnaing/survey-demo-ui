import Vue from "vue";
import Router from "vue-router";
import Foo from "../src/components/Foo.vue";
import CreateForm from "../src/components/CreateForm";
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
    }
  ]
});
