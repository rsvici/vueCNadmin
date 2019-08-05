import Main from '@/components/main'
export const routerJson = {
  //首页
  "home": {
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
  "wechatList": {
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
  "integralt": {
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
  "activitytype": {
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
  "userInfo": {
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
  "check": {
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
  "comment": {
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
  "hotActive": {
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
  "busniss": {
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
  // 权限管理
  "access": {
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
  // 日志
  "log": {
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
  // 新店铺
  "newshoplist": {
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
  }
}
