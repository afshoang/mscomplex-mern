import React from 'react'

const StatusCard = props => {
  return (
    <div className='p-7 flex items-center bg-mainBg shadow-main-shadow rounded-main relative 
    overflow-hidden z-[1] transition-colors mb-7 before:content-[""] before:w-full before:pt-[100%] before:rounded-[50%] 
    before:bg-gradient-to-r before:from-primary before:to-[#f99c8c] before:absolute before:left-[-50%] before:top-0 before:scale-0 
    before:transition-transform hover:before:scale-[3] before:duration-700 hover:text-white duration-500
    '>
      <div className='w-[30%] h-full text-[3rem] flex items-center justify-center z-[1]'>
        <i className={`${props.icon}`}></i>
      </div>
      <div className='flex-1 text-center capitalize z-[1]'>
        <h4 className='text-4xl mb-2.5'>{props.count}</h4>
        <span>{props.title}</span>
      </div>
    </div>
  )
}

export default StatusCard