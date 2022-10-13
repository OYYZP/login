import router from '@/router'
import store from '@/store'
// 导入进度条模块
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
// 前置守卫
const writelist = ['/login', '/404']
router.beforeEach((to, from, next) => {
  // 开启进度条
  nprogress.start()
  // 如果有token
  if (store.getters.token) {
    // 判断是不是在登录页
    if (to.path === '/login') {
      // 如果有则跳到主页
      next('/')
    } else {
    // 如果不是则放行
      next()
    }
  } else {
    //  如果没有token,再判断是不是登录页
    if (writelist.indexOf(to.path) > -1) {
      next()
    } else {
      next('/login')
    }
  }
  //   由于手动更改路径访问会导致进度条无法关闭,则需要强制关闭
  nprogress.done()
})
// 后置守卫
router.afterEach(() => {
  nprogress.done()
})
