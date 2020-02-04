import React, { Component } from 'react'

import { Card, Button, Table, Tag, Modal, message, Tooltip } from 'antd';

import { Typography } from 'antd';

import { getArticles, deleteArticle } from '../../requests'

import { withRouter } from 'react-router-dom'

import moment from 'moment'

import XLSX from 'xlsx'

const { Text } = Typography;

const titleDisplayMap = {
  id: 'id',
  title: '标题',
  author: '作者',
  createAt: '出版时间',
  amount: '出版量'
}

// const dataSource = [
//   {
//     key: '1',
//     name: '胡彦斌',
//     age: 32,
//     address: '西湖区湖底公园1号',
//   },
//   {
//     key: '2',
//     name: '胡彦祖',
//     age: 42,
//     address: '西湖区湖底公园1号',
//   },
// ];

// const columns = [
//   {
//     title: 'id',
//     dataIndex: 'id',
//     key: 'id',
//   },
//   {
//     title: '文章标题',
//     dataIndex: 'title',
//     key: 'title',
//   },
//   {
//     title: '文章作者',
//     dataIndex: 'author',
//     key: 'author',
//   },
//   {
//     title: '阅读量',
//     dataIndex: 'amount',
//     key: 'amount',
//   },
//   {
//     title: '出版时间',
//     dataIndex: 'createAt',
//     key: 'createAt',
//     render: (text, record, index) => {
//     }
//   },
//   {
//     title: '操作',
//     dataIndex: 'actions',
//     key: 'actions',
//     render: (text, record, index) => {
//       return <Button>编辑</Button>
//     }
//   }
// ];
// @withRouter()
class ArticleList extends Component {
  constructor() {
    super()
    this.state = {
      total: 0,
      dataSource: [],
      columns: [],
      isLoading: false,
      limited: 10,
      offset: 0,
      visible: false,
      confirmLoading: false,
      deleteId: null,
      deleteTile: ''
    }
  }
  createColumns = (columnKeys) => {
    const columns = columnKeys.map(item => {
      if (item === 'amount') {
        return {
          title: titleDisplayMap[item],
          dataIndex: item,
          key: item,
          render: (text, record, index) => {
            const { amount } = record;
            return amount > 250 ? <Tooltip title={`阅读量大于250`}><Tag color='red'>{amount}</Tag></Tooltip> : <Tooltip title={`阅读量小于250`}><Tag color='blue'>{amount}</Tag></Tooltip>
          }
        }
      } else if (item === 'createAt') {
        return {
          title: titleDisplayMap[item],
          dataIndex: item,
          key: item,
          render: (text, record, index) => {
            const { createAt } = record;
            return <div>{moment(createAt).format('YYYY-MM-DD HH:mm:ss')}</div>
          }
        }
      }
      return {
        title: titleDisplayMap[item],
        dataIndex: item,
        key: item
      }
    })
    columns.push({
      title: '操作',
      dataIndex: 'actions',
      key: 'actions',
      render: (text, record, index) => {
        return <div><Button type='primary' className='mr10' onClick={this.toEdit.bind(this, record.id)}>编辑</Button><Button onClick={this.deleteHandler.bind(this, record)}>删除</Button></div>
      }
    })
    return columns;
  }
  toEdit = (id) => {
    // console.log(this.props)
    this.props.history.push(`/admin/article/edit/${id}`)
  }
  deleteHandler = (record) => {
    this.setState({
      visible: true,
      deleteId: record.id,
      deleteTile: record.title
    })
  }
  closeHandler = () => {
    // console.log('quxiao ')
    this.setState({
      visible: false,
      confirmLoading: false
    })
  }
  okHandler = () => {
    this.setState({
      confirmLoading: true
    })
    deleteArticle(this.state.deleteId).then(res => {
      message.success(res.msg);
      // 到第一页
      this.setState({
        offset: 0
      }, () => {
        this.getData()
      })
      this.getData()
    }).finally(() => {
      this.setState({
        confirmLoading: false,
        visible: false
      })
    })
  }
  getData = () => {
    this.setState({
      isLoading: true
    })
    getArticles(this.state.offset, this.state.limited).then(res => {
      const columnKeys = Object.keys(res.list[0])
      const columns = this.createColumns(columnKeys)
      // console.log(this)
      if(this.updater.isMounted(this)) {
        this.setState({
          dataSource: res.list,
          total: res.total,
          columns
        })
      } else {
        return 
      }
      this.setState({
        dataSource: res.list,
        total: res.total,
        columns
      })
    }).catch(err => {

    }).finally(() => {
      if(!this.updater.isMounted(this)) return
      this.setState({
        isLoading: false
      })
    })
  }
  onPageChange = (page, pageSize) => {
    this.setState({
      offset: pageSize * (page - 1),
      limited: pageSize
    }, () => {
      this.getData()
    })
  }
  onShowSizeChange = (current, size) => {
    this.setState({
      offset: 0,
      limited: size
    }, () => {
      this.getData()
    })
  }
  exportHandler = () => {
    const data = [Object.keys(this.state.dataSource[0])]
    for (let i = 0; i < this.state.dataSource.length; i++) {
      data.push(Object.values(this.state.dataSource[i]))
    }
    const ws = XLSX.utils.aoa_to_sheet([['id', 'name'], ['1', 'rose'], ['2', 'kack']]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
    XLSX.writeFile(wb, `sheet-${moment().format('YYYY-MM-DD-HH-mm-ss')}js.xlsx`);
  }
  componentDidMount() {
    this.getData()
  }
  componentWillUnmount () {
    
  }
  render() {
    return (
      <Card title="文章列表" bordered={false} extra={<Button onClick={this.exportHandler}>导出excel</Button>}>
        <Table
          loading={this.state.isLoading}
          rowKey={record => record.id}
          dataSource={this.state.dataSource}
          columns={this.state.columns}
          pagination={{
            total: this.state.total,
            hideOnSinglePage: true,
            showQuickJumper: true,
            onChange: this.onPageChange,
            showSizeChanger: true,
            onShowSizeChange: this.onShowSizeChange,
            current: this.state.offset / this.state.limited + 1
          }}
        />
        <Modal
          title="确认删除"
          visible={this.state.visible}
          confirmLoading={this.state.confirmLoading}
          onOk={this.okHandler}
          onCancel={this.closeHandler}
          maskClosable={false}
        >
          <Text type="secondary"> 是否删除《{this.state.deleteTile}》? 此操作不可逆，请谨慎处理！！</Text>
        </Modal>
      </Card>
    )
  }
}
export default withRouter(ArticleList)