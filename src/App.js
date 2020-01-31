import React, { Component } from 'react'

import { adminRoutes } from './routes';

import { Route, Switch, Redirect } from 'react-router-dom'

import { Frame } from './components'

const menus = adminRoutes.filter(route => route.isNav === true)
class App extends Component {
  render() {
    return (
      <Frame menus={menus}>
        <Switch>
          {
            adminRoutes.map(route => {
              return (<Route
                exact={route.exact}
                key={route.pathname}
                path={route.pathname}
                render={(routerProps) => {
                  return <route.component {...routerProps} />
                }} />)
            })
          }
          <Redirect to={adminRoutes[0].pathname} from='/admin' exact />
          <Redirect to='/404' />
        </Switch>
      </Frame>
    )
  }
}
export default App