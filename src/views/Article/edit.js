import React, { Component, createRef } from 'react'

import { withRouter } from 'react-router-dom'

import { Card, Button, Form, Icon, Input, DatePicker, message, Spin } from 'antd'

import E from 'wangeditor';

import { articleDetail, articleEdit } from '../../requests/index';

import moment from 'moment';

import './index.less';

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}
@Form.create()
class ArticleEdit extends Component {
  constructor(props) {
    super(props)
    this.editor = null
    this.editorRef = createRef()
    this.state = {
      id: null,
      usernameError: false,
      titlevalidateStatus: '',
      titlehelp: '',
      formLayout: 'horizontal',
      subloading: false
    }
  }
  initEditor = () => {
    this.editor = new E(this.editorRef.current);
    this.editor.customConfig.onchange = (html) => {
      this.props.form.setFieldsValue({ content: html })
    }
    this.editor.create()
  }
  getData = (id) => {
    articleDetail(id).then(res => {
      res.createAt = moment(res.createAt)
      const { id, ...data } = res
      this.props.form.setFieldsValue(data)
      this.editor.txt.html(res.content)
      this.setState({
        subloading: false
      })
    })
  }
  componentDidMount() {
    this.initEditor()
    this.setState({
      subloading: true
    })
    this.getData(this.props.match.params.id)
  }
  myvalidator = (rule, value, callback) => {
    if (value && value.length < 10) {
      this.setState({
        titlevalidateStatus: 'error',
        titlehelp: 'title长度不能小于10'
      })
      callback('title长度不能小于10')
    } else if (value && value.length > 20) {
      this.setState({
        titlevalidateStatus: 'error',
        titlehelp: 'title长度不能大于20'
      })
      callback('title长度不能大于20')
    } else {
      callback()
    }
  }
  backHandler = () => {
    this.props.history.goBack()
  }
  oncreateAtChange = (date, dateString) => {

  }
  handleSubmit = e => {
    e.preventDefault();
    this.setState({
      subloading: true
    })
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let params = values;
        params.createAt = params.createAt.valueOf();
        params.id = this.props.match.params.id
        articleEdit(params).then(res => {
          message.success(res.msg)
          this.setState({
            subloading: false
          }, () => {
            this.props.history.push(`/admin/article`)
          })
        })
        // console.log('Received values of form: ', values);
      }
    });
  };
  render() {
    const { formLayout } = this.state;
    const formItemLayout =
      formLayout === 'horizontal'
        ? {
          labelCol: { span: 2 },
          wrapperCol: { span: 14 },
        }
        : null;
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
    const usernameError = isFieldTouched('username') && getFieldError('username');
    const amountError = isFieldTouched('amountError') && getFieldError('amountError');
    // const titleError = isFieldTouched('title') && getFieldError('title');
    return (
      <Card title='编辑文章' extra={<Button onClick={this.backHandler}>返回</Button>}>
        <Spin spinning={this.state.subloading}>
          <Form layout={this.state.formLayout} onSubmit={this.handleSubmit} labelAlign='right' {...formItemLayout}>
            <Form.Item label='作者'>
              {getFieldDecorator('author', {
                rules: [{ required: true, message: '请填写作者' }
                ]
              })(
                <Input
                  placeholder="author"
                />
              )}
            </Form.Item>
            <Form.Item label='标题'>
              {getFieldDecorator('title', {
                rules: [
                  { required: true, message: '请填写title' },
                  {
                    validator: this.myvalidator
                  }
                ]
              })(
                <Input
                  placeholder="title"
                />
              )}
            </Form.Item>
            <Form.Item label='阅读量'>
              {getFieldDecorator('amount', {
                rules: [{ required: true, message: '请填写阅读量' },
                { pattern: new RegExp('^([1-9][0-9]*)$'), message: '请填写正确的阅读量' }
                ],
              })(
                <Input
                  placeholder="amount"
                />
              )}
            </Form.Item>
            <Form.Item label='发布时间'>
              {getFieldDecorator('createAt', {
                rules: [{ required: true, message: '请选择发布时间' }
                ],
              })(
                <DatePicker onChange={this.oncreateAtChange} placeholder="请选择发布时间" showTime />
              )}
            </Form.Item>
            <Form.Item label='内容'>
              {getFieldDecorator('content', {
                rules: [{ required: true, message: '请填写内容' }
                ],
              })(
                <div ref={this.editorRef} className='qf-editor'>
                </div>
              )}
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 2 }}>
              <Button type="primary" htmlType="submit">
                提交
              </Button>
            </Form.Item>
          </Form>
        </Spin>
      </Card>
    )
  }
}

export default withRouter(ArticleEdit)