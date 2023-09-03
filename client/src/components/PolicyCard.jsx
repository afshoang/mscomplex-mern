import React from 'react'

const PolicyCard = props => {
  return (
    <div className='text-center flex flex-col gap-3 border border-[#ebeef0] border-solid p-6'>
        <div className='text-primary flex justify-center items-center text-[30px]'>
            <i className={props.icon}></i>
        </div>
        <h5 className='text-sm font-medium uppercase'>{props.name}</h5>
        <p className='text-[#888] '>{props.description}</p>
    </div>
  )
}

export default PolicyCard