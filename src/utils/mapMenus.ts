import type { RouteRecordRaw } from 'vue-router'
import type { IMenu, IMenuChild } from '@/api/type'
import type { IBreadcrumb } from '@/components/type'

let firstMenu: any = null
let firstRoute: RouteRecordRaw | undefined = undefined

//动态注册路由
export function mapMenuToRoutes(userMenus: IMenu[]): RouteRecordRaw[] {
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
        //第一个匹配到的路由(用于匹配/main路径的默认选中)
        if (!firstRoute && !firstMenu) {
          firstMenu = menu
          firstRoute = route
        }
      } else {
        getRoute(menu.children ?? [])
      }
    }
  }
  getRoute(userMenus)

  return routes
}

//根据路径匹配路由(用于更改侧边栏的默认选中)
export function pathMapToMenu(
  userMenus: IMenu[] | IMenuChild[],
  currentPath: string,
  breadcrumbs?: IBreadcrumb[]
): any {
  for (const menu of userMenus) {
    if (menu.type === 1) {
      //findMenu = return menu.type === 2 && menu.url === currentPath
      const findMenu = pathMapToMenu(menu.children ?? [], currentPath)
      if (findMenu) {
        //保存父路由
        breadcrumbs?.push({ name: menu.name })
        //保存子路由
        breadcrumbs?.push({ name: findMenu.name })
        return findMenu
      }
    } else if (menu.type === 2 && menu.url === currentPath) {
      return menu
    }
  }
}

//面包屑参数(name,path)
export function pathMapBreadcrumbs(
  userMenus: IMenu[] | IMenuChild[],
  currentPath: string
): any {
  const breadcrumbs: IBreadcrumb[] = []
  pathMapToMenu(userMenus, currentPath, breadcrumbs)
  return breadcrumbs
}

export { firstMenu, firstRoute }
