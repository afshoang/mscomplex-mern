import React from 'react'

const Button = props => {
    const bg = props.backgroundColor ? `bg-[${props.backgroundColor}]` : 'bg-primary'

  return (
    <button
        className={`btn ${bg} color-[#1C2430] hover:opacity-60 duration-150 p-3 rounded text-sm leading-4 capitalize`}
        onClick={props.onClick ? () => props.onClick() : null}
    >
        <span className="text-center">{props.children}</span>
        {
            props.icon ? (
                <span className='ml-3'>
                    <i className={`bx ${props.icon} bx-tada`}></i>
                </span>
            ) : null
        }
    </button>
  )
}

export default Button