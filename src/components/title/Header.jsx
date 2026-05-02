import React from 'react'

const Header = ({title}) => {
  return (
    <>
      <h2 className='text-xl lg:text-2xl font-light text-cyan-500 py-4'>{title}</h2>
    </>
  )
}

export default Header
