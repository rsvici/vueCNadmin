/*
 * @Descripttion: 
 * @version: 
 * @Author: rsvici
 * @Date: 2019-01-07 14:52:59
 * @LastEditors: rsvici
 * @LastEditTime: 2019-08-12 12:35:48
 */
import Vue from 'vue'
import Router from 'vue-router'
import routes from './routers'
import store from '@/store'
import iView from 'iview'
import {
  setToken,
  getToken,
  localSave,
  localRead,
  getUserId,
  canTurnTo
} from '@/libs/util'
import config from '@/config'
const {
  homeName
} = config

// 引入加载菜单
import {
  loadMenu,
  formatMenu
} from '@/libs/router_util'
import {
  getUserInfo // 这里是封装的后台返回菜单数据的接口，方法名称根据实际情况改变
} from '@/api/user'

Vue.use(Router)
const router = new Router({
  routes: [...routes, ...loadMenu()],
  mode: 'hash'
})

const LOGIN_PAGE_NAME = 'login'

const turnTo = (to, access, next) => {
  // console.log(to, access, next);
  next()
  // if (canTurnTo(to.name, access, routes)) next() // 有权限，可访问
  // else next({
  //   replace: true,
  //   name: 'error_401'
  // }) // 无权限，重定向到401页面
}

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start()
  const token = getToken()
  const menu = localRead('route') // 读取路由数据
  if (!token && to.name !== LOGIN_PAGE_NAME) {
    // 未登录且要跳转的页面不是登录页
    next({
      name: LOGIN_PAGE_NAME // 跳转到登录页
    })
  } else if (!token && to.name === LOGIN_PAGE_NAME) {
    // 未登陆且要跳转的页面是登录页
    next() // 跳转
  } else if (token && to.name === LOGIN_PAGE_NAME) {
    // 已登录且要跳转的页面是登录页		
    next({
      name: homeName // 跳转到homeName页
    })
  } else {
    store.dispatch('getUserInfo').then(newres => {
      // 如果本地不存在路由数据则动态获取
      if (!menu || menu.length === 0) {
        console.log(111)
        getUserInfo({
          userId: getUserId()
        }).then(res => {
          console.log(res)
          var list = []
          var menuData = res.data.data
          localSave('route', JSON.stringify(menuData))
          // 格式化菜单
          list = formatMenu(menuData)
          // 将404路由动态注入，防止第一次没有路由数据跳转到404,
          list.push({
            path: '*',
            name: 'error_404',
            meta: {
              hideInMenu: true
            },
            component: () => import('@/view/error-page/404.vue')
          })
          // 刷新界面菜单
          store.commit('updateMenuList', list)
          turnTo(to, [], next)
        })
      } else {
        turnTo(to, [], next)
      }
    }).catch(() => {
      setToken('')
      next({
        name: 'login'
      })
    })
  }
})

router.afterEach(to => {
  iView.LoadingBar.finish()
  window.scrollTo(0, 0)
})

export default router
