import React from 'react';

import { render } from 'react-dom'

import App from './App'

import './index.less'

import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import { mainRoutes } from './routes'

import zhCN from 'antd/es/locale/zh_CN';

import {
  ConfigProvider
} from 'antd'

render(
  <ConfigProvider locale={zhCN}>
    <Router>
      <Switch>
        <Route path='/admin' render={(routerProps) => {
          // TODO：后期这里要做权限认证 需要登录才能访问/admin
          return <App {...routerProps} />
        }} />
        {
          mainRoutes.map(route => {
            return <Route component={route.component} path={route.pathname} key={route.pathname} />
          })
        }
        <Redirect to='/admin' exact from='/' />
        <Redirect to='/404' />
      </Switch>
    </Router>
  </ConfigProvider>,
  document.querySelector('#root')
)