import React from 'react';
import {Link} from "react-router-dom"

export default function Header() {
  return (
    <div>
      <div>
        <Link to="/">
          <h1>MERN-ESTATE</h1>
        </Link>

        <ul>
          <Link to="/about">
            <li>About</li>
          </Link>
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="/profile">
      
            <li>Contact Us</li>
          </Link>
        </ul>
      </div>
    </div>
  );
}
