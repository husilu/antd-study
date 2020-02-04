import React from 'react';

import { render } from 'react-dom'

import App from './App'

import './index.less'

import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import { mainRoutes } from './routes'

import zhCN from 'antd/es/locale/zh_CN';

import { Provider } from 'react-redux'

import store from './store'

import {
  ConfigProvider
} from 'antd'

render(
  <Provider store={store}>
    <ConfigProvider locale={zhCN}>
      <Router>
        <Switch>
          <Route path='/admin' component={App} />
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
    </ConfigProvider>
  </Provider>,
  document.querySelector('#root')
)