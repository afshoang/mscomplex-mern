import React from 'react'

const Section = props => {
  return (
    <div className='py-12'>
        {props.children}
    </div>
  )
}

export const SectionTitle = props => {
  return (
    <div className='mb-16 px-4'>
        <h3 className='text-4xl text-center'>{props.children}</h3>
    </div>
  )
}

export const SectionBody = props => {
  return (
    <div className='container px-4'>
        {props.children}
    </div>
  )
}

export default Section