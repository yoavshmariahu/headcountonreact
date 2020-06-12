import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import '../App.css';

class Header extends Component {
  render() {
    return (
      <nav>
        <ul>
          <li><NavLink to="/">Headcount</NavLink></li>
          <li><NavLink to="/how-it-works">How it works</NavLink></li>
          <li><NavLink to="/about">About</NavLink></li>
        </ul>
      </nav>
    );
  }
}

export default Header;