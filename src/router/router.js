import {createRouter, createWebHashHistory, createWebHistory} from "vue-router";

const routes =[
    {
        path: '/',
        component:() => import('@/views/IndexPage.vue')
    },
    {
        path: '/index',
        name: 'index',
        component:() => import('@/views/IndexPage.vue')
    },
    {
        path: '/App',
        name: 'App',
        component:() => import('@/views/apppages/AppPage.vue')
    },
]

const router = createRouter({
    //history: createWebHistory(process.env.BASE_URL),
    history: process.env.IS_ELECTRON ? createWebHashHistory(process.env.BASE_URL) : createWebHistory(process.env.BASE_URL),
    routes
})

export default router