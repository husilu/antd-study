import { Loading } from '../components'

import Loadable from './loadable';

const ArticleList = Loadable({
  loader: () => import('./Article/index.js'),
  loading: Loading
})
const Login = Loadable({
  loader: () => import('./Login'),
  loading: Loading
})
const NotFound = Loadable({
  loader: () => import('./NotFound'),
  loading: Loading
})
const Dashboard = Loadable({
  loader: () => import('./Dashboard'), // loadble.js 在componentDidMount里面获取到这个组件，通过promise.then获取到之后再显示该组件，实现按需加载
  loading: Loading // 传loading组件
})
const Settings = Loadable({
  loader: () => import('./Settings'),
  loading: Loading
})
const ArticleEdit = Loadable({
  loader: () => import('./Article/edit.js'),
  loading: Loading
})

export {
  Dashboard,
  ArticleList,
  Login,
  NotFound,
  Settings,
  ArticleEdit
}