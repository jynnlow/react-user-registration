import React from 'react';
import { Link } from 'react-router-dom';

function Nav() {
  return (
    <nav>
      <ul className="nav-links">
        <Link to="/">
          <li> Register User</li>
        </Link>
        <Link to="/get-users">
          <li>Get Users</li>
        </Link>
      </ul>
    </nav>
  );
}

export default Nav;
