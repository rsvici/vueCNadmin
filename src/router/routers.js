import Main from '@/components/main'
import parentView from '@/components/parent-view'

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面不会缓存
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */

export default [{
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: () => import('@/view/login/login.vue')
  },
  {
    path: '/',
    name: '_home',
    redirect: '/home',
    component: Main,
    meta: {
      notCache: true
    },
    children: [{
      path: '/home',
      name: 'home',
      meta: {
        title: '首页',
        notCache: true,
        icon: 'md-home'
      },
      component: () => import('@/view/single-page/home')
    }]
  },
  // 商户中心
  {
    path: '/market1',
    name: 'market1',
    meta: {
      // hideInBread: true,
      hideInMenu: true,
      title: '商户中心'
    },
    component: Main,
    children: [{
        path: '/market',
        name: 'market',
        meta: {
          // hideInBread: true,
          hideInMenu: true,
          title: '商户列表',
          notCache: true,
          icon: 'md-home'
        },
        component: () => import('@/view/business/market/list.vue')
      },
      {
        path: '/marketAdd',
        name: 'marketAdd',
        meta: {
          // hideInBread: true,
          hideInMenu: true,
          title: '添加商户',
          notCache: true
        },
        component: () => import('@/view/business/market/add.vue')
      },
      {
        path: '/marketUpdate',
        name: 'marketUpdate',
        meta: {
          // hideInBread: true,
          hideInMenu: true,
          title: '修改商户',
          notCache: true
        },
        component: () => import('@/view/business/market/update.vue')
      }
    ]
  },
  // 活动中心
  {
    path: '/active1',
    name: 'active1',
    meta: {
      hideInMenu: true,
      title: '活动中心'
    },
    component: Main,
    children: [{
        path: '/active',
        name: 'active',
        meta: {
          // hideInMenu:true,
          title: '活动列表',
          notCache: true,
          icon: 'md-home'
        },
        component: () => import('@/view/business/active/list.vue')
      },
      {
        path: '/activeAdd',
        name: 'activeAdd',
        meta: {
          // hideInBread: true,
          // hideInMenu:true,
          title: '添加活动',
          notCache: true
        },
        component: () => import('@/view/business/active/add.vue')
      },
      {
        path: '/activeUpdata',
        name: 'activeUpdata',
        meta: {
          // hideInBread: true,
          // hideInMenu:true,
          title: '修改活动',
          notCache: true
        },
        component: () => import('@/view/business/active/update.vue')
      },
      {
        path: '/activeShwo',
        name: 'activeShwo',
        meta: {
          // hideInBread: true,
          // hideInMenu:true,
          title: '查看活动',
          notCache: true
        },
        component: () => import('@/view/business/active/show.vue')
      }
    ]
  },
  {
    path: '/401',
    name: 'error_401',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/401.vue')
  },
  {
    path: '/500',
    name: 'error_500',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/500.vue')
  },
  {
    path: '*',
    name: 'error_404',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/404.vue')
  }
]
