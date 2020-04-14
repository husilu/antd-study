import React, { useState, memo } from 'react'
const Child = memo(({data}) =>{
  console.log('child render...', data.name)
  return (
      <div>
          <div>child</div>
          <div>{data.name}</div>
      </div>
  );
})

const Hook =()=>{
  console.log('Hook render...')
  const [count, setCount] = useState(0)
  const [name, setName] = useState('rose')

  const data = {
      name
  }

  return(
      <div>
          <div>
              {count}
          </div>
          <button onClick={()=>setCount(count+1)}>update count </button>
          <Child data={data}/>
      </div>
  )
}


export default Hook