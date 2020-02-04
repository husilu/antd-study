import React, { Component } from 'react'

import { adminRoutes } from './routes';

import { Route, Switch, Redirect } from 'react-router-dom'

import { Frame } from './components'

import { connect } from 'react-redux'

const menus = adminRoutes.filter(route => route.isNav === true)

const mapState = state => ({
  islogin: state.user.islogin,
  role:state.user.role
})
@connect(mapState)
class App extends Component {
  render() {
    return (
      this.props.islogin ?
      <Frame menus={menus}>
        <Switch>
          {
            adminRoutes.map(route => {
              return (<Route
                exact={route.exact}
                key={route.pathname}
                path={route.pathname}
                render={(routerProps) => {
                  const hasPermission = route.roles.includes(this.props.role)
                  return hasPermission ? <route.component {...routerProps} /> : <Redirect to='/admin/noauth' />
                }} />)
            })
          }
          <Redirect to={adminRoutes[0].pathname} from='/admin' exact />
          <Redirect to='/404' />
        </Switch>
      </Frame> 
      :
      <Redirect to='/login' ></Redirect>
    )
  }
}
export default App