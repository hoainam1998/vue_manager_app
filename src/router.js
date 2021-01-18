import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'
import Login from './views/Login'
import Create_user from './views/Create_User'
import Table from './views/Table'
Vue.use(Router)

export default new Router({
    routes:[
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/',
            name: 'home',
            component: Home,
            children:[
                {
                    path: 'create',
                    component: Create_user
                },
                {
                    path: '/',
                    component: Table

                }
            ]
        }
    ]
})