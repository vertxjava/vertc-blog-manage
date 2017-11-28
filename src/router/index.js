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
