import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'baseUrl',
            component: () => import('./views/baseUrl/BaseUrl.vue')
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('./views/login/Login.vue')
        },
        {
            path: '/chat',
            name: 'chat',
            component: () => import('./views/chat/Chat.vue')
        },
        {
            path: '/ai',
            name: 'ai',
            component: () => import('./views/ai/Ai.vue')
        }
    ]
})
