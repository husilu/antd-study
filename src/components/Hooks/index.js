import React, { useState, useEffect, useReducer } from 'react'

export default function (props) {
  const [count, setCount] = useState(props.tip)
  const [day, setDay] = useState(50)
  const [num, dispatch] = useReducer((state, action) => {
    switch(action.type) {
      case 'add':
      return [
        ...state,
        {
          id:state.length
        }
      ]
      case 'sub':
      return state - 1;
      default:
        return state;
    }
  }, ['ss'])
  useEffect(() => {
    console.log(count)
  }, [count])
  return (
    <div>
      <button onClick={() => {
        setCount(count + 1)
      }}>+</button>
      {count}
      <button onClick={() => {
        setCount(count - 1)
      }}>-</button>
      <button onClick={() => {
        setDay(day + 1)
      }}>+</button>
      {day}
      <button onClick={() => {
        setDay(day - 1)
      }}>-</button>
      <div>
        {num.map(item => {
          return (
            <span>
              {item}
            </span>
          )
        })}
        <button onClick={() => dispatch({type: 'add'})}>+ </button>
      </div>
    </div>
  )
}
