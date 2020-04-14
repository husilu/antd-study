import React, { Component } from 'react'
import AntdTable from './antd'
import FixedTbale from './fixed'
import style from './index.less'

export default class index extends Component {
  render() {
    return (
      <div className={style.p2}>
        <AntdTable></AntdTable>
      </div>
    )
  }
}
