import React, { Component } from 'react'

import { Layout, Menu, Icon } from 'antd';

import { withRouter } from 'react-router-dom'

import logo from './logo.png';

import './frame.less';

const { SubMenu } = Menu;

const { Header, Content, Sider } = Layout;

class Frame extends Component {
  onMenuClick = ({ item, key, keyPath, domEvent }) => {
    this.props.history.push(key)
  }
  render() {
    return (
      <Layout>
        <Header className="qf-header" style={{ backgroundColor: '#fff' }}>
          <div className="qf-logo">
            <img src={logo} alt="" />
          </div>
        </Header>
        <Layout>
          <Sider width={200} style={{ background: '#fff' }}>
            <Menu
              mode="inline"
              onClick={this.onMenuClick}
              style={{ height: '100%', borderRight: 0 }}
              selectedKeys = {[this.props.location.pathname]}
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