import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const Index = resolve => {
  require.ensure(['../components/Index.vue'], () => {
      resolve(require('../components/Index.vue'))
  })
}

const Login = resolve => {
  require.ensure(['../components/Login.vue'], () => {
      resolve(require('../components/Login.vue'))
  })
}

const ArticleWrite = resolve => {
  require.ensure(['../components/ArticleWrite.vue'], () => {
      resolve(require('../components/ArticleWrite.vue'))
  })
}

const ArticleList = resolve => {
  require.ensure(['../components/ArticleList.vue'], () => {
      resolve(require('../components/ArticleList.vue'))
  })
}

const ArticleUpdate = resolve => {
  require.ensure(['../components/ArticleUpdate.vue'], () => {
      resolve(require('../components/ArticleUpdate.vue'))
  })
}

const CategoryAdd = resolve => {
  require.ensure(['../components/CategoryAdd.vue'], () => {
      resolve(require('../components/CategoryAdd.vue'))
  })
}

const CategoryList = resolve => {
  require.ensure(['../components/CategoryList.vue'], () => {
      resolve(require('../components/CategoryList.vue'))
  })
}

const CategoryUpdate = resolve => {
  require.ensure(['../components/CategoryUpdate.vue'], () => {
      resolve(require('../components/CategoryUpdate.vue'))
  })
}



export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      meta:{
        requireAuth: true
      },
      children:[
        {
          path: '/article/write',
          name: 'ArticleWrite',
          component: ArticleWrite,
          meta:{
            requireAuth: true
          }
        },
        {
          path: '/article/list',
          name: 'ArticleList',
          component: ArticleList,
          meta:{
            requireAuth: true
          }
        },
        {
          path: '/article/update',
          name: 'ArticleUpdate',
          component: ArticleUpdate,
          meta:{
            requireAuth: true
          }
        },
        {
          path: '/category/add',
          name: 'CategoryAdd',
          component: CategoryAdd,
          meta:{
            requireAuth: true
          }
        },
        {
          path: '/category/list',
          name: 'CategoryList',
          component: CategoryList,
          meta:{
            requireAuth: true
          }
        },
        {
          path: '/category/update',
          name: 'CategoryUpdate',
          component: CategoryUpdate,
          meta:{
            requireAuth: true
          }
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta:{
        requireAuth: false
      }
    }
  ]
})
