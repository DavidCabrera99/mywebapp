import React from 'react';
import crown from '../../svg/crown.svg'
import { Link } from 'react-router-dom';
import { Button} from '@mui/material';
import { FaPaintBrush} from 'react-icons/fa'
import {Nav , NavLink, NavMenu, Bars} from './NavbarElements';
import styled from 'styled-components';

const Navbar = ({handleNavToggle}) => {
    return (
        <>
            <Nav>
            <Bars onClick={handleNavToggle}/>
                <img src={crown} className="App-logo" alt="logo" />
                <Link to="/" className="WebPageTitle">Legendary Blogs</Link>
                
                <NavMenu>
                    <Link to="/place">
                        <MyButton variant='contained' startIcon={<FaPaintBrush style={{
                            margin: '6px 12px',
                        }}/>} >Place
                        </MyButton>
                    </Link>
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

const MyButton = styled(Button)`
font-size: 0px !important;
border-radius: 25px !important;
align-self: center;

transition: ease-in-out 0.2s !important;
:hover {
    font-size: 1.2rem !important;
    margin: 6px 0px !important;
}

`

export default Navbar;