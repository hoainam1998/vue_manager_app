import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'
import Login from './views/Login'
import Create_user from './views/Create_User'
import Table_User from './views/Table_User'
import User from './views/User_board'
import Product from './views/Product_board'
import Table_Product from'./views/Table_Product'
import Create_Product from './views/Create_Product'
Vue.use(Router)

export default new Router({
    routes:[
        {
            path: '/',
            name: 'login',
            component: Login
        },
        {
            path: '/home',
            name: 'home',
            component: Home,
            children:[
                {
                    path: '',
                    component: User,
                    name: "user",
                    children:[
                        {
                            path: '',
                            name: 'user_table',
                            component: Table_User
                        },
                        {
                            path: 'create_user',
                            component: Create_user
                        }
                    ]
                },
                {
                    path: 'product',
                    component: Product,
                    children:[
                        {
                            path: '',
                            name: "product_table",
                            component: Table_Product
                        },
                        {
                            path: "create_product",
                            component: Create_Product
                        }
                    ]

                }
            ]
        }
    ]
})