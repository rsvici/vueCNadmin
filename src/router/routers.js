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
  {
    path: '/wechatList',
    name: 'wechatList',
    meta: {
      hideInBread: true,
    },
    component: Main,
    children: [{
      path: '/wechatList',
      name: 'wechatList',
      meta: {
        title: '微信矩阵',
        notCache: true,
        icon: 'md-home',
      },
      component: () => import('@/view/wechatlist/list.vue')
    }, {
      path: 'wechatAdd',
      name: 'wechatAdd',
      meta: {
        title: '添加微信矩阵',
        notCache: true,
        hideInMenu: true,
        icon: 'md-home',
      },
      component: () => import('@/view/wechatlist/add.vue')
    }, {
      path: 'wechatUpdate',
      name: 'wechatUpdate',
      meta: {
        title: '修改微信矩阵',
        notCache: true,
        hideInMenu: true,
        icon: 'md-home',
      },
      component: () => import('@/view/wechatlist/update.vue')
    }]
  },

  {
    path: '/userInfo',
    name: 'userInfo',
    component: Main,
    meta: {
      hideInBread: true
    },
    children: [{
      path: '/userInfo',
      name: 'userInfo',
      meta: {
        title: '注册用户信息',
        notCache: true,
        icon: 'md-home',
      },
      component: () => import('@/view/userinfo/userinfo.vue')
    }]
  },
  {
    path: '/check',
    name: 'check',
    component: Main,
    meta: {
      hideInBread: true
    },
    children: [{
      path: '/check',
      name: 'check',
      meta: {
        title: '活动审核',
        notCache: true,
        icon: 'md-home',
      },
      component: () => import('@/view/check/list.vue')
    }]
  },
  {
    path: '/comment',
    name: 'comment',
    component: Main,
    meta: {
      hideInBread: true
    },
    children: [{
      path: '/comment',
      name: 'comment',
      meta: {
        title: '评论管理',
        notCache: true,
        icon: 'md-home',
      },
      component: () => import('@/view/comment/list.vue')
    }]
  },
  {
    path: '/hotActive',
    name: 'hotActive',
    component: Main,
    meta: {
      title: '热门活动',
      notCache: true,
      icon: 'md-home'
    },
    children: [{
        path: '/HBanner',
        name: 'HBanner',
        meta: {
          title: '热门精彩',
          notCache: true,
        },
        component: () => import('@/view/business/active/list.vue')
      },
      {
        path: '/HFindWonderful',
        name: 'HFindWonderful',
        meta: {
          title: '发现精彩',
          notCache: true,
        },
        component: () => import('@/view/business/active/list.vue')
      }, {
        path: '/HhotSpace',
        name: 'HhotSpace',
        meta: {
          title: '热门场馆',
          notCache: true,
        },
        component: () => import('@/view/business/active/list.vue')
      }, {
        path: '/HGame',
        name: 'HGame',
        meta: {
          title: '电子竞技',
          notCache: true,
        },
        component: () => import('@/view/business/active/list.vue')
      }
    ]
  },
  {
    path: '/busniss',
    name: 'busniss',
    meta: {
      icon: 'md-menu',
      title: '热门商圈'
    },
    component: Main,
    children: [{
        path: 'zhongshan',
        name: 'zhongshan',
        meta: {
          icon: 'md-funnel',
          title: '中山公园商圈'
        },
        props: {
          busnissId: '0'
        },
        component: () => import('@/view/business/list/zhongshan.vue')
      },
      {
        path: 'xinhongqiao',
        name: 'xinhongqiao',
        meta: {
          // access: ['super_admin'],
          icon: 'md-funnel',
          title: '新虹桥商圈'
        },
        props: {
          busnissId: '1'
        },
        component: () => import('@/view/business/list/xinhongqiao.vue')
      },
      {
        path: 'linkong',
        name: 'linkong',
        meta: {
          icon: 'md-funnel',
          title: '临空商圈'
        },
        props: {
          busnissId: '2'
        },
        component: () => import('@/view/business/list/linkong.vue')
      }
    ]
  },
  {
    path: '/market1',
    name: 'market1',
    meta: {
      // hideInBread: true,
      hideInMenu: true,
      title: '商户中心',

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
        icon: 'md-home',
      },
      component: () => import('@/view/business/market/list.vue')
    }, {
      path: '/marketAdd',
      name: 'marketAdd',
      meta: {
        // hideInBread: true,
        hideInMenu: true,
        title: '添加',
        notCache: true,
      },
      component: () => import('@/view/business/market/add.vue')
    }]
  },
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
        icon: 'md-home',
      },
      component: () => import('@/view/business/active/list.vue')
    }, {
      path: '/activeAdd',
      name: 'activeAdd',
      meta: {
        // hideInBread: true,
        // hideInMenu:true,
        title: '添加',
        notCache: true,
      },
      component: () => import('@/view/business/active/add.vue')
    }]
  },

  {
    path: '/log',
    name: 'log',
    component: Main,
    meta: {
      hideInBread: true
    },
    children: [{
      path: '/log',
      name: 'log',
      meta: {
        title: '日志信息',
        notCache: true,
        icon: 'md-home',
      },
      component: () => import('@/view/log/log.vue')
    }]
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
