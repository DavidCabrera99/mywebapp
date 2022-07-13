import React from 'react';
import {Nav , NavLink, NavMenu} from './NavbarElements';

const Navbar = () => {
    return (
        <>
            <Nav>
                <NavMenu>
                    <NavLink to='/about' activeStyle>
                        About
                    </NavLink>
                    <NavLink to='/contact' activeStyle>
                        About
                    </NavLink>
                    <NavLink to='/blogs' activeStyle>
                        About
                    </NavLink>
                    <NavLink to='/sing-up' activeStyle>
                        About
                    </NavLink>
                </NavMenu>
            </Nav>
        </>
    );
    
}

export default Navbar;