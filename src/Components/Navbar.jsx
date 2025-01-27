import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import logo from '../assets/search.png'
import { useContext } from 'react';
import AuthContext from '../Provider/AuthContext';

const Navbar = () => {
  const { user , userLogOut } = useContext(AuthContext)
  const navigate = useNavigate();

  const links = <>
    <li className='mr-3'><NavLink to={'/'}>Home</NavLink></li>
    <li className='mr-3'><NavLink to={'/addItems'}>Add Lost & Found Item</NavLink></li>
    <li className='mr-3'><NavLink to={'/lostFoundItems'}>Lost and Found Items</NavLink></li>
    <li className='mr-3'><NavLink to={'/recoveredItems'}>Recovered Items</NavLink></li>
    <li className='mr-3'><NavLink to={'/myItems'}>My Items</NavLink></li>
    
    


  </>
  return (
    <div className="navbar text-white fixed z-10 bg-opacity-35 bg-black">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
            {links}
          </ul>
        </div>
        <Link to={'/'} className="btn btn-ghost text-xl"><img src={logo} className='w-12' alt="" />ReclaimIt</Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {links}
        </ul>
      </div>
      <div className="navbar-end">
        {
          user && user?.email ?
          <>
          <img  className='w-11 rounded-full mr-3' src={user.photoURL} alt="" />
          <button onClick={() =>{
            userLogOut();
            navigate('/')
          }} className='btn'>Logout</button>
          </>
          :
          <Link to={'/login'} className="btn">Login</Link>
        }
      </div>
    </div>
  );
};

export default Navbar;