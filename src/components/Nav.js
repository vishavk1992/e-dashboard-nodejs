import React from 'react'
import { Link, useNavigate } from 'react-router-dom';



const Nav = () => {

  const auth = localStorage.getItem('user');
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate('/singup')
    // console.log("Logout Successfully")
  }

  return (
    <div>
      <img className='logo' src='https://www.logolynx.com/images/logolynx/a6/a671ef222a6e136f8fe7fd9cfc97e57b.png' alt='logo' />
      {
        auth ?
          <ul className='nav-ul'>
            <li><Link to="/">Products</Link></li>
            <li><Link to="/add"> Add Products</Link></li>
            <li><Link to="/profile">Profile</Link></li>
            <li><Link to="/signup" onClick={logout}>Logout ({JSON.parse(auth).name})</Link> </li>
          </ul>
        : <ul className='nav-ul nav-right'>
            <li><Link to="/signup">Sign Up</Link></li>
            <li><Link to="/login">Login</Link></li>
          </ul>
      }
    </div>
  )
}

export default Nav;