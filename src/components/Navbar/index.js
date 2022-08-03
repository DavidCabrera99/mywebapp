import React from 'react';
import crown from '../../svg/crown.svg'
import { Link } from 'react-router-dom';
import {Nav , NavLink, NavMenu, Bars} from './NavbarElements';

const Navbar = ({handleNavToggle}) => {
    return (
        <>
            <Nav>
            <Bars onClick={handleNavToggle}/>
                <img src={crown} className="App-logo" alt="logo" />
                <Link to="/" className="WebPageTitle">Legndary Blogs</Link>
                <NavMenu>
                    <NavLink to='/blogs' activestyle="true">
                        Blogs
                    </NavLink>
                    <NavLink to='/about' activestyle="true">
                        About
                    </NavLink>
                    {/*<NavLink to='/calculator' activestyle="true">
                        Calculator
                    </NavLink>*/}
                    {/*<NavLink to='/sing-up' activestyle="true">
                        Singup
                    </NavLink>*/}
                </NavMenu>
            </Nav>
        </>
    );
    
}

export default Navbar;