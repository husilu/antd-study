import actionType from '../actions/actionTypes'

const islogin = window.localStorage.getItem('authToken');

const userInfo = JSON.parse(window.localStorage.getItem('userInfo'))

const initState = {
  ...userInfo,
  islogin: islogin ? true : false,
  isloading: false
}

export default (state = initState, action) => {
  switch (action.type) {
    case actionType.START_LOGIN:
      return {
        ...state,
        isloading: true
      }
    case actionType.LOGIN_SUCCESS:
      const newState = action.payload
      return {
        ...state,
        ...newState,
        isloading: false,
        islogin: true
      }
    case actionType.LOGIN_FAILED:
      return {
        ...state,
        islogin: false,
        isloading: false
      }
    case actionType.CHANGE_TX:
      const newuserInfo = { ...userInfo, avatar: action.payload.avatar }
      window.localStorage.setItem('userInfo', JSON.stringify(newuserInfo))
      return {
        ...state,
        avatar: action.payload.avatar
      }
    default:
      return state
  }
}