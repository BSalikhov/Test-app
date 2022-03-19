import Vue from "vue";
import VueRouter from "vue-router";

import App from "./App";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: App,
    redirect: "/posts",
    children: [
      {
        path: "posts",
        name: "posts",
        component: () =>
          import(/* webpackChunkName: "posts" */ "@/views/Posts"),
      },
      {
        path: ":id",
        name: "post-details",
        component: () =>
          import(/* webpackChunkName: "post-details" */ "@/views/PostDetails"),
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
