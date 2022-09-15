import type { RouteRecordRaw } from 'vue-router'

export function mapMenuToRoutes(userMenus: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []
  //1. 先去加载默认所有的routes
  const allRoutes: RouteRecordRaw[] = []
  //使用vite提供的函数批量导入
  const routeFiles = import.meta.glob('../router/main/**/**/*.ts', {
    eager: true //变为module
  })
  Object.keys(routeFiles).forEach((key) => {
    const route = (routeFiles[key] as any).default
    allRoutes.push(route)
  })

  //2. 根据菜单获取需要添加的routes
  const getRoute = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 2) {
        const route = allRoutes.find((route) => {
          return route.path === menu.url
        })
        if (route) routes.push(route)
      } else {
        getRoute(menu.children)
      }
    }
  }
  getRoute(userMenus)

  return routes
}
