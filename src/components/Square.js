import React from 'react'

export default function Square({value,onSquareClick,isDisabled}) {


  return (
    <div>
      <button className='square' onClick={onSquareClick} style={{pointerEvents:isDisabled?"none":"all"}}>
        <b>{value}</b>
      </button>
      
    </div>
  )
}
