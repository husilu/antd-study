import actionType from '../actions/actionTypes'

const initState = {
  isLoading: false,
  list: []
}

export default (state = initState, action) => {
  switch (action.type) {
    case actionType.MARK_NOTIFICATION_AS_READ_BY_ID:
      const newList = state.list.map(item => {
        if (item.id === action.payload.id) {
          item.hasRead = true
        }
        return item
      })
      return {
        ...state,
        list: newList
      }
    case actionType.MARK_ALL_NOTIFICATIONS_AS_READ_BY_ID:
      const newList2 = state.list.map(item => {
        item.hasRead = true
        return item
      })
      return {
        ...state,
        list: newList2
      }
    case actionType.START_MARK_AS_READ:
      return {
        ...state,
        isLoading: true
      }
    case actionType.FINISH_MARK_AS_READ:
      return {
        ...state,
        isLoading: false
      }
    case actionType.GET_NOTIFICATUION_DATA:
      return {
        ...state,
        list: action.payload.list
      }
    default:
      return state
  }
}