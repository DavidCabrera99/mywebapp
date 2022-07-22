import {Link} from 'react-router-dom'
import { FaTimes} from 'react-icons/fa'
import styled from 'styled-components'
import React from 'react'

const Menu = ({handleNavToggle})=>{
    return (
        <StyledMenu className="animate__animated animate__fadeInRight">
            <StyledLink  onClick={handleNavToggle} to='/'>Home</StyledLink>
            {/*<StyledLink onClick={handleNavToggle} to='/calculator'>Calculator</StyledLink>*/}
            <StyledLink onClick={handleNavToggle} to='/blogs'>Blogs</StyledLink>
            {/*<StyledLink onClick={handleNavToggle} to='/sing-up'>SingUp</StyledLink>*/}
            <StyledLink onClick={handleNavToggle} to='/about'>About</StyledLink>
            <CloseToggle onClick={handleNavToggle}/>
        </StyledMenu>
    )
}

const StyledMenu = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    width: 100%;
    @media screen and (min-width: 360px) {
        width: 70%;
    }

    background-color: rgba(255,255,255,0.95);
    z-index:99;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
const StyledLink = styled(Link)`
    color: #222;
    text-decoration: none;
    font-size: clamp(3rem,4vw,6vw);
    font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
    transition: .2s all ease-in-out;

    user-select: none;
    &:hover {
        transition: .2s all ease-in-out;
        color: orangered;
    }

`

const CloseToggle = styled(FaTimes)`
    position: fixed;
    top: 5%;
    right: 4%;
    background:#222;
    color: #fff;
    padding: .75rem;
    display: flex;
    place-items: center;
    font-size: 2rem;
    cursor: pointer;
    &:hover {
        transition: .2s all ease-in-out;
        color: orangered;
    }
`

export default Menu;
