import {
  hasChild,
  localRead
} from '@/libs/util'
import {
  routerJson
} from '@/libs/routerJson'
import store from '@/store'
import {
  forEach
} from '@/libs/tools'



// 加载菜单
export const loadMenu = () => {
  let list = []
  let data = localRead('route')
  if (!data) {
    return list
  }
  list = formatMenu(JSON.parse(data))
  return list
}

// 格式化菜单
export const formatMenu = (list) => {
  let res = []
  forEach(list.sysMenuList, item => {
    let obj = {};
    if (item.url.indexOf('log') != -1) {
      obj = routerJson.log
    } else {
      obj = routerJson[item.url]
    }
    res.push(obj)
  })
  return res
}
