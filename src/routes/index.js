import {
  Dashboard,
  ArticleList,
  Login,
  NotFound,
  Settings,
  ArticleEdit
} from '../views';

export const mainRoutes = [
{
  pathname: '/404',
  component: NotFound
},
{
  pathname: '/login',
  component: Login
}]

export const adminRoutes = [
  {
    pathname: '/admin/dashboard',
    component: Dashboard,
    title: '仪表盘',
    icon: 'dashboard',
    isNav: true // 是一级菜单
  },
  {
    pathname: '/admin/article',
    component: ArticleList,
    title: '文章管理',
    icon: 'unordered-list',
    exact: true,
    isNav: true,
    // children:
  },
  {
    pathname: '/admin/article/edit/:id',
    component: ArticleEdit,
    title: '文章编辑'
  },
  {
    pathname: '/admin/settings',
    component: Settings,
    title: '设置',
    icon: 'setting',
    isNav: true
  }
]