import React, { Component } from 'react'

import { Layout, Menu, Icon, Dropdown, Avatar, Badge } from 'antd';

import { withRouter } from 'react-router-dom'

import logo from './logo.png';

import './frame.less';

const { SubMenu } = Menu;

const { Header, Content, Sider } = Layout;

class Frame extends Component {
  constructor() {
    super()
    this.menu = (
      <Menu onClick={this.onDropdownMenuClick}>
        <Menu.Item key="/admin/notifications">
          <Badge dot>
            通知中心
      </Badge>
        </Menu.Item>
        <Menu.Item key="/admin/settings">
          <a target="_blank" rel="noopener noreferrer">
            个人设置
      </a>
        </Menu.Item>
        <Menu.Item key="login">
          <a target="_blank" rel="noopener noreferrer">
            退出登陆
      </a>
        </Menu.Item>
      </Menu>
    )
  }
  onMenuClick = ({ item, key, keyPath, domEvent }) => {
    this.props.history.push(key)
  }
  onDropdownMenuClick = ({ item, key, keyPath, domEvent }) => {
    this.props.history.push(key)
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
            <Dropdown overlay={this.menu}>
              <div>
                <Avatar icon="user" /> 欢迎您! <Icon type="down" /><Badge count={10}></Badge>
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