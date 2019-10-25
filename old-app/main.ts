import Vue from "vue";
import VueRouter from "vue-router";
import http from "./http";

import * as routeNames from "./constants/routeNames";
import config from "./config";

import App from "./components/app.vue";
import MultiPostView from "./components/views/multi-post-view.vue";
import SinglePostView from "./components/views/single-post-view.vue";

Vue.use(VueRouter);
Vue.use(http, { baseUrl: config.baseApiUrl});

const router = new VueRouter({
    routes: [
        { name: routeNames.PostBySlug, path: "/posts/:postSlug", component: SinglePostView, props: true },
        { name: routeNames.Posts, path: "/posts", component: MultiPostView },
        { name: routeNames.PostsWithTag, path: "/posts/tagged/:tag", component: MultiPostView, props: true },
        { name: routeNames.Error, path: "/oops"},
        { path: "*", redirect: "/posts"}
    ],
    scrollBehavior: (to, from, saved) => {
        if(saved){
            const handler = (e: Event) => {
                e.target.removeEventListener(e.type, handler);

                window.scrollTo({ left: saved.x, top: saved.y, behavior: "smooth" });
            }

            document.addEventListener("scrollToSaved", handler);
        }
    }
});

new App({
    el: "#app",
    router: router
})