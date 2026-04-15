import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className='bg-black mb-4'>
      <ul className='text-white flex justify-center gap-4 py-1'>
        <li>
            <NavLink to='/' >Home</NavLink>
        </li>
        {/* <li>
            <NavLink to='/login' >Login</NavLink>
        </li> */}
        <li>
            <NavLink to='/create-users' >create-user</NavLink>
        </li>
        <li>
            <NavLink to='/get-users' >User-List</NavLink>
        </li>
        <li>
            <NavLink to='/mills' >Mills</NavLink>
        </li>
        <li>
            <NavLink to='/cost' >Cost</NavLink>
        </li>
        <li>
            <NavLink to='/create-balance' >Balance</NavLink>
        </li>
        <li>
            <NavLink to='/admin-dashboard' >Dashboard</NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
