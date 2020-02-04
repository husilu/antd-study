import actionTypes from './actionTypes'

import { getNotifications } from '../requests'

const startMarkAsRead = () => {
  return {
    type: actionTypes.START_MARK_AS_READ
  }
}

const finishMarkAsRead = () => {
  return {
    type: actionTypes.FINISH_MARK_AS_READ
  }
}

export const markNotificationAsReadById = (id) => {
  return dispatch => {
    dispatch(startMarkAsRead())
    setTimeout(() => {
      dispatch({
        type: actionTypes.MARK_NOTIFICATION_AS_READ_BY_ID,
        payload: {
          id
        }
      })
      dispatch(finishMarkAsRead())
    }, 2000)
  }
}

export const markAllNotificationAsReadById = () => {
  return dispatch => {
    dispatch(startMarkAsRead())
    setTimeout(() => {
      dispatch({
        type: actionTypes.MARK_ALL_NOTIFICATIONS_AS_READ_BY_ID
      })
      dispatch(finishMarkAsRead())
    }, 2000)
  }
}


export const getNotification = () => {
  return dispatch => {
    dispatch(startMarkAsRead())
    getNotifications().then(res => {
      dispatch({
        type: actionTypes.GET_NOTIFICATUION_DATA,
        payload: {
          list: res.list
        }
      })
      dispatch(finishMarkAsRead())
    })
  }
} 