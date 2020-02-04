import actionTypes from './actionTypes'

import { loginApi } from '../requests'

import { message } from 'antd'

const startLogin = (params) => {
  return {
    type: actionTypes.START_LOGIN
  }
}

const loginSuccess = (params) => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    payload: {
      ...params
    }
  }
}

export const changetx = (params) => {
  return {
    type: actionTypes.CHANGE_TX,
    payload: {
      ...params
    }
  }
}

export const loginFailed = (params) => {
  window.localStorage.removeItem('authToken')
  window.localStorage.removeItem('userInfo')
  return {
    type: actionTypes.LOGIN_FAILED
  }
}

export const login = (parmas) => {
  return dispatch => {
    dispatch(startLogin())
    loginApi(parmas).then(res => {
      if(res.data.code === 200) {
        message.success('登陆成功！');
        const {
          authToken,
          ...userInfo
        } = res.data.data
        window.localStorage.setItem('authToken', authToken)
        window.localStorage.setItem('userInfo', JSON.stringify(userInfo))
        dispatch(loginSuccess(res.data.data))
      } else {
        message.error('登陆失败...');
        dispatch(loginFailed())
      }
    })
  }
}