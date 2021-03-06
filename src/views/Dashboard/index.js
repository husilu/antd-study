import React, { Component, createRef } from 'react'
import './dashboard.less';
import { Card, Row, Col } from 'antd'
import echarts from 'echarts';
import { Tabs, Modal, Button } from 'antd';
import style from './dashboard.less'
import Box from '../../components/Box'

import Hoook from '../../components/HookTest'

import { getarticleChart } from '../../requests'
const overViewColors = []
const menuDataRender = data => {
  let res = data.map((item => {
    return item.name
  }))
  return res;
}
export default class Dashboard extends Component {
  constructor() {
    super()
    this.chartRef = createRef()
    this.state = {
      visible: false,
      content: ''
    }
    this.articleChart = null
  }
  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };
  showModal = (arg) => {
    this.setState({
      visible: true,
    }, () => {
      this.setState({
        content: arg
      })
    });
  };
  getData = () => {
    getarticleChart().then(res => {
      const amountArr = res.amount.map(item => {
        return item.value
      })
      const dateArr = res.amount.map(item => {
        return item.month
      })
      this.setState({
        amountArr: amountArr,
        dateArr: dateArr
      }, this.initArticleChart)
    })
  }
  initArticleChart = () => {
    var option = {
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: this.state.dateArr
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: this.state.amountArr,
        type: 'line',
        areaStyle: {}
      }]
    };
    // 使用刚指定的配置项和数据显示图表。
    this.articleChart.setOption(option);
  }
  componentDidMount() {
    this.articleChart = echarts.init(this.chartRef.current);
    this.getData();
  }
  render() {
    // console.log('dashboard render')
    const tabs = [{ title: 'tab1' }, { title: 'tab2' }, { title: 'tab3' }]
    return (
      <>
        <Card
          title='概览'
          bordered={false}
        >
          <Row gutter={16}>
            <Col className="gutter-row" span={6}>
              <div className="qf-gutter-box" style={{ backgroundColor: '#29B6F6' }}>col-6</div>
            </Col>
            <Col className="gutter-row" span={6}>
              <div className="qf-gutter-box" style={{ backgroundColor: '#AB47BC' }}>col-6</div>
            </Col>
            <Col className="gutter-row" span={6}>
              <div className="qf-gutter-box" style={{ backgroundColor: '#FF7043' }}>col-6</div>
            </Col>
            <Col className="gutter-row" span={6}>
              <div className="qf-gutter-box" style={{ backgroundColor: '#43A047' }}>col-6</div>
            </Col>
          </Row>
        </Card>
        <Card
          title='最近浏览量'
          bordered={false}
        >
          <div ref={this.chartRef} style={{ width: '500px', height: '300px' }}>
          </div>
          <Button type="primary" onClick={this.showModal.bind(this, 'argstring')}>
            Open Modal
          </Button>
        </Card>
        <p className={style.red}>
          红色的p
        </p>
        <Box>
        </Box>
        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>{this.state.content}</p>
        </Modal>
      </>
    )
  }
}
