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
                    <NavLink to='/about' activeStyle>
                        About
                    </NavLink>
                    <NavLink to='/calculator' activeStyle>
                        Calculator
                    </NavLink>
                    <NavLink to='/blogs' activeStyle>
                        Blogs
                    </NavLink>
                    <NavLink to='/sing-up' activeStyle>
                        Singup
                    </NavLink>
                </NavMenu>
            </Nav>
        </>
    );
    
}

export default Navbar;