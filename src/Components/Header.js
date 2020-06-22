import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import '../App.css';
import { Link } from 'react-router-dom'

class Header extends Component {
  render() {
    return (
      <nav>
        <ul class="navul">
          <li><NavLink tag={Link}  to="/">Headcount</NavLink></li>
          <li><NavLink tag={Link}  to="/how-it-works">How it works</NavLink></li>
          <li><NavLink tag={Link}  to="/for-stores">For Stores</NavLink></li>
          <li><NavLink tag={Link}  to="/contact">Contact Us!</NavLink></li>
        </ul>
      </nav>
    );
  }
}

export default Header;