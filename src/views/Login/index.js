import React, { Component } from 'react'

import { Form, Icon, Input, Button, Checkbox, Card } from 'antd';

import './index.less'

import { connect } from 'react-redux'

import { login } from '../../actions/user'

import { Redirect } from 'react-router-dom'

const mapState = state => ({
  islogin: state.user.islogin,
  isloading: state.user.isloading
})
@connect(mapState, { login })
class Login extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.login({ username: values.username, password: values.password });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      this.props.islogin ?
        <Redirect to='/admin' /> 
        :
        <Card title="admin 登陆" className='qf-login-wrapper'>
          <Form onSubmit={this.handleSubmit} className="login-form" >
            <Form.Item>
              {getFieldDecorator('username', {
                rules: [{ required: true, message: '请输入用户名' }],
              })(
                <Input
                  disabled={this.props.isloading}
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="用户名"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '请输入密码' }],
              })(
                <Input
                  disabled={this.props.isloading}
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="密码"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(<Checkbox loading={this.props.isloading}>记住密码</Checkbox>)}
              <Button type="primary" htmlType="submit" className="login-form-button" loading={this.props.isloading}>
                登陆
          </Button>
            </Form.Item>
          </Form>
        </Card>
    );
  }
}
export default Form.create({ name: 'normal_login' })(Login);