import React from 'react';
import logo from '../../logo.svg'
import { Link } from 'react-router-dom';
import {Nav , NavLink, NavMenu, Bars} from './NavbarElements';

const Navbar = ({handleNavToggle}) => {
    return (
        <>
            <Bars onClick={handleNavToggle}/>
            <Nav>
                <img src={logo} className="App-logo" alt="logo" />
                <Link to="/" className="WebPageTitle">React Projects</Link>
                <NavMenu>
                    <NavLink to='/about' activestyle="true">
                        About
                    </NavLink>
                    <NavLink to='/calculator' activestyle="true">
                        Calculator
                    </NavLink>
                    <NavLink to='/blogs' activestyle="true">
                        Blogs
                    </NavLink>
                    <NavLink to='/sing-up' activestyle="true">
                        Singup
                    </NavLink>
                </NavMenu>
            </Nav>
        </>
    );
    
}

export default Navbar;