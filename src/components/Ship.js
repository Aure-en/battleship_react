import React from 'react'

const Ship = React.forwardRef(({ id, length }, ref) => {

  return (

    <div className="ship" ref={ref} id={id}>
      {
        Array(length).fill(null).map((cell, index) => {
          return <div key={index} className="cell cell--ship"></div>
        })
      }
    </div>
  )
})

export default Ship