import Vue from 'vue'
import VueRouter from 'vue-router'
import NotFound from '../views/NotFound.vue'
import SignIn from '../views/SignIn.vue'
import SignUp from '../views/SignUp.vue'
import MainPage from '../views/MainPage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'root',
    redirect: '/signin'
  },
  {
    path: '/mainpage',
    name: 'main-page',
    component: MainPage
  },
  {
    path: '/user/self',
    name: 'user-self',
    component: () => import('../views/UserSelf.vue')
  },
  {
    path: '/user/self/following',
    name: 'user-following',
    component: () => import('../views/UserFollow.vue')
  },
  {
    path: '/user/self/follower',
    name: 'user-follower',
    component: () => import('../views/UserFollow.vue')
  },
  {
    path: '/setting',
    name: 'setting',
    component: () => import('../views/Setting.vue')
  },
  {
    path: '/tweetpage/:id',
    name: 'tweet-page',
    component: () => import('../views/TweetPage.vue')
  },
  {
    path: '/signup',
    name: 'sign-up',
    component: SignUp
  },
  {
    path: '/signin',
    name: 'sign-in',
    component: SignIn
  },
  {
    path: '*',
    name: 'not-found',
    component: NotFound
  }
]

const router = new VueRouter({
  routes
})

export default router
