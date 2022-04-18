import { RouteRecordRaw } from 'vue-router'
export function mapMenusToRoutes(userMenus: any): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []
  // const router = useRouter()
  // 1.先去加载默认所有的 routes
  const allRoutes: RouteRecordRaw[] = []

  // require.context(参数一：要查找的路径，参数二：是否递归查找，参数三：文件后缀名)

  // import.meta.globEager(参数：要查找的路径)
  // 此函数会加载目录下所有的文件，返回一个对象，对象的 key 值为每个文件的相对路径， value 值为每个文件的模块

  // 获取取所有的路由对象
  const routeFiles = import.meta.globEager('../router/main/**/*.ts')

  // 将路由对象转换为数组遍历添加到 allRoutes
  Object.values(routeFiles).forEach((routeFile) => {
    allRoutes.push(routeFile.default)
  })

  // 根据菜单添加对应的 route
  const _recurseGetRoute = (menus: any[]) => {
    // debugger
    menus.forEach((menu) => {
      if (menu.type === 2) {
        const route = allRoutes.find((route) => route.path === menu.url)
        if (route) {
          routes.push(route)
        }
      } else {
        _recurseGetRoute(menu.children)
      }
    })
  }
  _recurseGetRoute(userMenus)
  return routes
}
