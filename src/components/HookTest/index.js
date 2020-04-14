
// import Child from './child.js'

// export const ExampleContext = React.createContext(null);//创建createContext上下文

// function ReducerCom() {
//   const [exampleState, exampleDispatch] = useReducer(example, defaultState);
//   return (
//     <ExampleContext.Provider value={{exampleState, dispatch: exampleDispatch }}>
//       <Child></Child>
//     </ExampleContext.Provider>
//   )
// }

// export default ReducerCom

import React from 'react'

const mapState = state => {
  return {
    notificationsCount: state.notifications.list.filter(item => item.hasRead === false).length,
    avatar: state.user.avatar,
    displayName: state.user.displayName
  }
}

function index(props) {
  return (
    <div>
      <span>{props.displayName}</span>
    </div>
  )
}

export default index