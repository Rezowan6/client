import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className='bg-black mb-4'>
      <ul className='text-white flex justify-center gap-4 py-1'>
        <li>
            <NavLink to='/' >Home</NavLink>
        </li>
        <li>
            <NavLink to='/login' >Login</NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
