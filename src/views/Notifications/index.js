import React, { Component } from 'react'

import { Card, Button, List, Avatar, Badge, Spin } from 'antd'

import { connect } from 'react-redux'

import { markNotificationAsReadById, markAllNotificationAsReadById } from '../../actions/notifications'

const data = [
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
];

const mapState = state => {
  return {
    list: state.notifications
  }
}
@connect(mapState, { markNotificationAsReadById, markAllNotificationAsReadById })
class Notifications extends Component {
  render() {
    return (
      <Spin spinning={this.props.list.isLoading}>
        <Card
          title='通知中心'
          bordered={false}
          extra={<Button onClick={this.props.markAllNotificationAsReadById.bind(this)} disabled={this.props.list.list.every(item => item.hasRead === true)}>全部标记为已读</Button>}
        >
          <List
            itemLayout="horizontal"
            dataSource={this.props.list.list}
            renderItem={item => (
              <List.Item extra={item.hasRead ? null : <Button onClick={this.props.markNotificationAsReadById.bind(this, item.id)}>标记为已读</Button>}>
                <List.Item.Meta
                  title={<Badge dot={!item.hasRead}>{item.title}</Badge>}
                  description={item.desc}
                />
              </List.Item>
            )}
          />
        </Card>
      </Spin>
    )
  }
}

export default Notifications