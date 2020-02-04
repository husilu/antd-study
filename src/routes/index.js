import {
  Dashboard,
  ArticleList,
  Login,
  NotFound,
  Settings,
  ArticleEdit,
  Notifications,
  NoAuth,
  Profile
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
    isNav: true, // 是一级菜单，
    roles: ['001','002','003']
  },
  {
    pathname: '/admin/article',
    component: ArticleList,
    title: '文章管理',
    icon: 'unordered-list',
    exact: true,
    isNav: true,
    roles: ['001','002']
    // children:
  },
  {
    pathname: '/admin/article/edit/:id',
    component: ArticleEdit,
    title: '文章编辑',
    roles: ['001']
  },
  {
    pathname: '/admin/settings',
    component: Settings,
    title: '系统设置',
    icon: 'setting',
    isNav: true,
    roles: ['001']
  },
  {
    pathname: '/admin/notifications',
    component: Notifications,
    title: '通知中心',
    roles: ['001','002','003']
  },
  {
    pathname: '/admin/noauth',
    component: NoAuth,
    roles: ['001','002','003']
  },
  {
    pathname: '/admin/profile',
    component: Profile,
    title: '个人设置',
    roles: ['001', '002', '003']
  }
]