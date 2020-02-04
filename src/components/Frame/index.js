import React, { Component } from 'react'

import { Layout, Menu, Icon, Dropdown, Avatar, Badge } from 'antd';

import { withRouter } from 'react-router-dom'

import logo from './logo.png';

import './frame.less';

import { connect } from 'react-redux'

import { loginFailed } from '../../actions/user'

import { getNotification } from '../../actions/notifications'

const { SubMenu } = Menu;

const { Header, Content, Sider } = Layout;

// 这里的数据就是组件里面用this.props.属性名 可以获取到的数据 这里面的数据就是从reducer里面获取到的数据
const mapState = state => {
  return {
    notificationsCount: state.notifications.list.filter(item => item.hasRead === false).length,
    avatar: state.user.avatar,
    displayName: state.user.displayName
  }
}
@connect(mapState, { getNotification, loginFailed })
class Frame extends Component {
  constructor() {
    super()
  }
  componentDidMount() {
    this.props.getNotification()
  }
  onMenuClick = ({ item, key, keyPath, domEvent }) => {
    this.props.history.push(key)
  }
  onDropdownMenuClick = ({ item, key, keyPath, domEvent }) => {
    this.props.history.push(key)
  }
  logOutHandler = () => {
    this.props.loginFailed();
    // this.props.history.push('/admin');
  }
  dropDownRender = () => {
    return (
      <Menu onClick={this.onDropdownMenuClick}>
        <Menu.Item key="/admin/notifications">
          <Badge dot={this.props.notificationsCount > 0}>
            通知中心
        </Badge>
        </Menu.Item>
        <Menu.Item key="/admin/profile">
          <a target="_blank" rel="noopener noreferrer">
            个人设置
      </a>
        </Menu.Item>
        <Menu.Item key="/login">
          <a target="_blank" rel="noopener noreferrer" onClick={this.logOutHandler}>
            退出登陆
          </a>
        </Menu.Item>
      </Menu>
    )
  }
  render() {
    const selectedKey = this.props.location.pathname.split('/')
    selectedKey.length = 3;
    return (
      <Layout>
        <Header className="qf-header" style={{ backgroundColor: '#fff' }}>
          <div className="qf-logo">
            <img src={logo} alt="" />
          </div>
          <div>
            <Dropdown overlay={this.dropDownRender}>
              <div>
                <Avatar src={this.props.avatar} /> 欢迎您! {this.props.displayName}<Icon type="down" /><Badge count={this.props.notificationsCount}></Badge>
              </div>
            </Dropdown>
          </div>
        </Header>
        <Layout>
          <Sider width={200} style={{ background: '#fff' }}>
            <Menu
              mode="inline"
              onClick={this.onMenuClick}
              style={{ height: '100%', borderRight: 0 }}
              selectedKeys={[selectedKey.join('/')]}
            >
              {/* <Menu.Item key="5">option5</Menu.Item> */}
              {
                this.props.menus.map(item => {
                  return (
                    <Menu.Item key={item.pathname}>
                      <Icon>{item.icon}</Icon>
                      <span>{item.title}</span>
                    </Menu.Item>
                  )
                })
              }
            </Menu>
          </Sider>
          <Layout style={{ padding: '16px' }}>
            <Content
              style={{
                background: '#fff',
                height: '100%',
              }}
            >
              {this.props.children}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    )
  }
}
export default withRouter(Frame)