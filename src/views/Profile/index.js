import React, { Component } from 'react'

import { Card, Upload, Spin } from 'antd'

import axios from 'axios'

import { connect } from 'react-redux'

import { changetx } from '../../actions/user'

const mapState = state => ({
  avatar: state.user.avatar
})

@connect(mapState, { changetx })
class Profile extends Component {
  state = {
    isUploading: false
  }
  handleUploadAvatar = ({file}) => {
    const data = new FormData()
    data.append('Token', 'd09a270ae8fcfa1f5a71b5be882ff3afa07bf0bd:1A6o2SYl2I3IcNAWcfatv8gSSsg=:eyJkZWFkbGluZSI6MTU4MDcyNTI2OSwiYWN0aW9uIjoiZ2V0IiwidWlkIjoiNzA4NzExIiwiYWlkIjoiMTY2MTk1MSIsImZyb20iOiJmaWxlIn0=')
    data.append('file', file)
    this.setState({
      isUploading: true
    })
    axios.post('http://up.imgapi.com/', data).then(res=> {
      this.setState({
        isUploading: false
      })
      this.props.changetx({
        avatar: res.data.linkurl
      })
    }).catch(err => {
      // 自行处理错误
    })
  }
  render() {
    return (
      <Card title='个人设置' bordered={false}>
        <Upload showUploadList={false} customRequest={this.handleUploadAvatar}>
          <Spin
            spinning={this.state.isUploading}
          >
            {
              this.props.avatar ? <img src={this.props.avatar} alt="头像" style={{width: 240, height: 240}}/> : <span>点击上传</span>
            }
          </Spin>
        </Upload>
      </Card>
    )
  }
}

export default Profile
