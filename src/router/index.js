import Vue from 'vue'
import VueRouter from 'vue-router'
import NotFound from '../views/NotFound.vue'
import SignIn from '../views/SignIn.vue'
import SignUp from '../views/SignUp.vue'
import MainPage from '../views/MainPage.vue'
import store from '../store'

Vue.use(VueRouter)

const authIsAdmin = (to, from, next) => {
  const currentUser = store.state.currentUser
  if (currentUser && currentUser.role !== 'admin') {
    next('/404')
    return
  }
  next()
}
const authIsUser = (to, from, next,) => {
  const currentUser = store.state.currentUser
  if (currentUser.role !== 'user') {
    next('/404')
    return
  }
  next()
}

const routes = [
  {
    path: '/',
    name: 'root',
    redirect: '/signin'
  },
  {
    path: '/mainpage',
    name: 'main-page',
    component: MainPage,
    beforeEnter: authIsUser
  },
  {
    path: '/user/self',
    name: 'user-self',
    component: () => import('../views/UserSelf.vue'),
    beforeEnter: authIsUser
  },
  {
    path: '/user/self/followings',
    name: 'user-following',
    component: () => import('../views/UserFollow.vue'),
    beforeEnter: authIsUser
  },
  {
    path: '/user/self/followers',
    name: 'user-follower',
    component: () => import('../views/UserFollow.vue'),
    beforeEnter: authIsUser
  },
  {
    path: '/users/:id',
    name: 'other-user',
    component: () => import('../views/OtherUsersPage.vue'),
    beforeEnter: authIsUser
  },
  {
    path: '/user/:id/followers',
    name: 'other-user-follower',
    component: () => import('../views/OtherUsersFollow.vue'),
    beforeEnter: authIsUser
  },
  {
    path: '/user/:id/followings',
    name: 'other-user-following',
    component: () => import('../views/OtherUsersFollow.vue'),
    beforeEnter: authIsUser
  },
  {
    path: '/setting',
    name: 'setting',
    component: () => import('../views/Setting.vue'),
    beforeEnter: authIsUser
  },
  {
    path: '/tweetpage/:id',
    name: 'tweet-page',
    component: () => import('../views/TweetPage.vue'),
    beforeEnter: authIsUser
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
    path: '/admin',
    name: 'admin-signin',
    component: () => import('../views/AdminSignIn.vue')
  },
  {
    path: '/admin_main',
    name: 'admin-main',
    component: () => import('../views/AdminMain.vue'),
    beforeEnter: authIsAdmin
  },
  {
    path: '/admin_users',
    name: 'admin-users',
    component: () => import('../views/AdminUsers.vue'),
    beforeEnter: authIsAdmin
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

router.beforeEach(async (to, from, next) => {
  const tokenInLocal = localStorage.getItem('token')
  const tokenInStore = store.state.token
  let isAuthenticated = store.state.isAuthenticated

  // 若兩種token不同就重新檢驗
  if (tokenInLocal && tokenInLocal !== tokenInStore) {
    isAuthenticated = await store.dispatch('fetchCurrentUser')
  }

  const pathsWithoutAuthentication = ['sign-up', 'sign-in', 'admin-signin']

  // 若token無效則轉入登入頁
  if (!isAuthenticated && !pathsWithoutAuthentication.includes(to.name)) {
    next('/signin')
    return
  }
  // 若token有效則轉入主頁面
  if (isAuthenticated && pathsWithoutAuthentication.includes(to.name)) {
    const currentUserRole = store.state.currentUser.role

    if (currentUserRole === 'user') {
      next('/mainpage')
    } else if (currentUserRole === 'admin') {
      next('/admin_main')
    }
  }

  next()
})

export default router
