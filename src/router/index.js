import Vue from "vue";
import Router from "vue-router";
import Filmes from "@/components/template/Filmes.vue";
import Details from "@/components/template/Details.vue";
import Favoritos from "@/components/template/Favoritos.vue";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      name: "inicio",
      path: "/",
      component: Filmes,
    },
    {
      path: "/movie/:id",
      name: "Filme",
      component: Details,
    },
    {
      name: "favoritos",
      path: "/favoritos",
      component: Favoritos,
    },
  ],
});

export default router;
