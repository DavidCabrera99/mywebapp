import {FaBars} from "react-icons/fa"
import {NavLink as Link} from "react-router-dom"
import styled from "styled-components"



export const Nav = styled.nav`
    background: linear-gradient(90deg, #660000, #1112e7);
    height: 85px;
    display: flex;
    position: sticky;
    top: 0;
    justify-content: flex-start;
    padding: 0.2rem ;
    z-index:12;
    @media screen and (max-width: 768px) {
        height: 42px;
    }
    `;

export const NavLink = styled(Link)`
    background: orangered;
    display: flex;
    align-items: center;
    text-decoration: none;
    font-weight: bold;
    color: #010111;
    padding: 0 1rem;
    height: 100%;
    cursor: pointer;
    &.active {
        color: #ffffff;
    }
    `;
export const Bars = styled(FaBars)`
    display: none;
    color: #808080;
    @media screen and (max-width: 768px) {
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        transform: translate(-75%, 25%);
        font-size: 1.8rem;
        cursor: pointer;
    }

`;

export const NavMenu = styled.div`
    display:flex;
    position:absolute;
    height:85px;
    padding: 0.2rem;
    top:0;
    right:0;
    align-items: center;
    margin-right: 0px;
    /* Second Nav */
    /* margin-right: 24px; */
    /* Thrid Nav */
    /* width:100vw;
    white-spaced:nowrap; */
    @media screen and (max-width:768px) {
        display:none;
    }

`