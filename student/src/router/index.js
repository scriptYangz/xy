import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import User from '@/views/user/User'
import Litexam from '@/views/litexam/Litexam'
import Score from '@/views/Score'
import Exampaper from '@/views/exampaper/Exampaper'
import Records from '@/views/records/Records'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/user',
      name: 'user',
      component: User
    },
    {
      path: '/litexam',
      name: 'litexam',
      component: Litexam
    },
    {
      path: '/score',
      name: 'score',
      component: Score
    },
    {
      path: '/exampaper',
      name: 'exampaper',
      component: Exampaper
    },
    {
      path: '/records',
      name: 'records',
      component: Records
    },
  ]
})
