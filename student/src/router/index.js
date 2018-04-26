import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import User from '@/views/user/User'
import Litexam from '@/views/litexam/Litexam'
import Score from '@/views/Score'
import Exampaper from '@/views/exampaper/Exampaper'
import Records from '@/views/records/Records'
import Phaseexam from '@/views/phaseexam/Phaseexam'
import Courseback from '@/views/courseback/Courseback'
import Addcourseback from '@/views/courseback/Addcourseback'
import cbDetail from '@/views/courseback/cbDetail'


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
      component: User,
      meta: {  requiresAuth: true } 
    },
    {
      path: '/litexam',
      name: 'litexam',
      component: Litexam,
      meta: {  requiresAuth: true } 
    },
    {
      path: '/score',
      name: 'score',
      component: Score,
      meta: {  requiresAuth: true } 
    },
    {
      path: '/exampaper',
      name: 'exampaper',
      component: Exampaper,
      meta: {  requiresAuth: true } 
    },
    {
      path: '/records',
      name: 'records',
      component: Records,
      meta: {  requiresAuth: true } 
    },
    {
      path: '/phaseexam',
      name: 'phaseexam',
      component: Phaseexam,
//    meta: {  requiresAuth: true } 
    },
    {
      path: '/courseback',
      name: 'courseback',
      component: Courseback,
//    meta: {  requiresAuth: true } 
    },
    {
    	path: '/addcourseback',
      name: 'addcourseback',
      component: Addcourseback,
//    meta: {  requiresAuth: true } 
    },
    {
    	path: '/cbdetail',
      name: 'cbdetail',
      component: cbDetail,
//    meta: {  requiresAuth: true } 
    },
  ]
})
