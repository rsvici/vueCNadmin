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
  // 微信矩阵
  {
    path: '/wechatList',
    name: 'wechatList',
    meta: {
      hideInBread: true
    },
    component: Main,
    children: [{
        path: '/wechatList',
        name: 'wechatList',
        meta: {
          title: '微信矩阵',
          notCache: true,
          icon: '_juzhenduoxuan'
        },
        component: () => import('@/view/wechatlist/list.vue')
      },
      {
        path: 'wechatAdd',
        name: 'wechatAdd',
        meta: {
          title: '添加微信矩阵',
          notCache: true,
          hideInMenu: true,
          icon: 'md-home'
        },
        component: () => import('@/view/wechatlist/add.vue')
      },
      {
        path: 'wechatUpdate',
        name: 'wechatUpdate',
        meta: {
          title: '修改微信矩阵',
          notCache: true,
          hideInMenu: true,
          icon: 'md-home'
        },
        component: () => import('@/view/wechatlist/update.vue')
      }
    ]
  },
  // 积分管理
  {
    path: '/integralt',
    name: 'integralt',
    meta: {
      hideInBread: true
    },
    component: Main,
    children: [{
        path: '/integralt',
        name: 'integralt',
        meta: {
          title: '积分管理',
          notCache: true,
          icon: '_jifen'
        },
        component: () => import('@/view/integralt/list.vue')
      },
      {
        path: 'integraltAdd',
        name: 'integraltAdd',
        meta: {
          title: '添加积分信息',
          notCache: true,
          hideInMenu: true,
          icon: 'md-home'
        },
        component: () => import('@/view/integralt/add.vue')
      },
      {
        path: 'integraltUpdate',
        name: 'integraltUpdate',
        meta: {
          title: '修改积分信息',
          notCache: true,
          hideInMenu: true,
          icon: 'md-home'
        },
        component: () => import('@/view/integralt/update.vue')
      }
    ]
  },
  // 活动类型
  // 活动类型
  // 活动类型
  {
    path: '/activitytype',
    name: 'activitytype',
    meta: {
      hideInBread: true
    },
    component: Main,
    children: [{
        path: '/activitytype',
        name: 'activitytype',
        meta: {
          title: '活动类型',
          notCache: true,
          icon: '_huodong-copy'
        },
        component: () => import('@/view/activitytype/list.vue')
      },
      {
        path: 'activitytypeAdd',
        name: 'activitytypeAdd',
        meta: {
          title: '添加活动类型',
          notCache: true,
          hideInMenu: true,
          icon: 'md-home'
        },
        component: () => import('@/view/activitytype/add.vue')
      },
      {
        path: 'activitytypeUpdate',
        name: 'activitytypeUpdate',
        meta: {
          title: '修改活动类型',
          notCache: true,
          hideInMenu: true,
          icon: 'md-home'
        },
        component: () => import('@/view/activitytype/update.vue')
      }
    ]
  },
  // 用户信息
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
        icon: '_yonghu'
      },
      component: () => import('@/view/userinfo/userinfo.vue')
    }]
  },
  // 审核列表
  {
    path: '/check',
    name: 'list',
    component: Main,
    meta: {
      hideInBread: true
    },
    children: [{
        path: '/list',
        name: 'list',
        meta: {
          title: '审核列表',
          notCache: true,
          icon: '_shenhe'
        },
        component: () => import('@/view/check/list.vue')
      },
      {
        path: '/activeCheck',
        name: 'activeCheck',
        meta: {
          hideInMenu: true,
          title: '活动审核',
          notCache: true,
          icon: '_shenhe'
        },
        component: () => import('@/view/check/check.vue')
      },
      {
        path: '/activeCheckShow',
        name: 'activeCheckShow',
        meta: {
          hideInMenu: true,
          title: '活动查看',
          notCache: true,
          icon: '_shenhe'
        },
        component: () => import('@/view/check/show.vue')
      }
    ]
  },
  // 评论
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
        icon: '_pinglun'
      },
      component: () => import('@/view/comment/list.vue')
    }]
  },
  // 热门活动
  {
    path: '/hotActive',
    name: 'hotActive',
    component: Main,
    meta: {
      title: '热门活动',
      notCache: true,
      icon: '_remen'
    },
    children: [{
        path: '/HBanner',
        name: 'HBanner',
        meta: {
          title: '推荐banner',
          notCache: true
        },
        component: () => import('@/view/hotActive/list.vue')
      },
      {
        path: '/HFindWonderful',
        name: 'HFindWonderful',
        meta: {
          title: '精彩',
          notCache: true
        },
        component: () => import('@/view/hotActive/list.vue')
      },
      {
        path: '/HhotSpace',
        name: 'HhotSpace',
        meta: {
          title: '热门',
          notCache: true
        },
        component: () => import('@/view/hotActive/list.vue')
      },
      {
        path: '/HGame',
        name: 'HGame',
        meta: {
          title: '运动',
          notCache: true
        },
        component: () => import('@/view/hotActive/list.vue')
      },
      {
        path: '/hotActiveAdd',
        name: 'hotActiveAdd',
        meta: {
          hideInBread: true,
          hideInMenu: true,
          title: '添加热门活动',
          notCache: true
        },
        component: () => import('@/view/hotActive/add.vue')
      },
      {
        path: '/hotActiveUpdata',
        name: 'hotActiveUpdata',
        meta: {
          hideInBread: true,
          hideInMenu: true,
          title: '修改热门活动',
          notCache: true
        },
        component: () => import('@/view/hotActive/update.vue')
      },
      {
        path: '/hotActiveShow',
        name: 'hotActiveShow',
        meta: {
          hideInBread: true,
          hideInMenu: true,
          title: '查看热门活动',
          notCache: true
        },
        component: () => import('@/view/hotActive/show.vue')
      }
    ]
  },
  // 热门商圈
  {
    path: '/busniss',
    name: 'busniss',
    meta: {
      icon: '_shangquan-',
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
      },
      {
        path: '/busnissAdd',
        name: 'busnissAdd',
        meta: {
          // hideInBread: true,
          hideInMenu: true,
          title: '添加商场',
          notCache: true
        },
        component: () => import('@/view/business/list/add.vue')
      },
      {
        path: '/busnissUpdate',
        name: 'busnissUpdate',
        meta: {
          // hideInBread: true,
          hideInMenu: true,
          title: '修改商场',
          notCache: true
        },
        component: () => import('@/view/business/list/update.vue')
      }

    ]
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
  // 权限管理
  {
    path: '/access',
    name: 'access',
    component: Main,
    meta: {
      title: '权限管理',
      notCache: true,
      icon: '_quanxian'
    },
    children: [{
        path: '/sysUser',
        name: 'sysUser',
        meta: {
          title: '用户管理',
          notCache: true
        },
        component: () => import('@/view/access/user.vue')
      },
      {
        path: '/sysRole',
        name: 'sysRole',
        meta: {
          title: '角色管理',
          notCache: true
        },
        component: () => import('@/view/access/role.vue')
      }

    ]
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
        icon: '_rizhi-'
      },
      component: () => import('@/view/log/log.vue')
    }]
  },

  {
    path: '/newshoplist',
    name: 'newshoplist',
    component: Main,
    meta: {
      hideInBread: true
    },
    children: [{
      path: '/newshoplist',
      name: 'newshoplist',
      meta: {
        title: '管理商场',
        notCache: true,
        icon: '_shangchang'
      },
      props: {
        busnissId: '0'
      },
      component: () => import('@/view/business/list/zhongshan.vue')
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
