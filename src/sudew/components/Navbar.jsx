import React from 'react'
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div>
         <nav>
            
            <label htmlFor=" user"> new user</label>
            <div> <Link to="/n"> signup </Link></div>
         </nav>
    </div>
  )
}

export default Navbar