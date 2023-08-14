import React from "react";
import styled from 'styled-components';
import Logo from "../assets/holidaze-logo.png"; 

const NavBar = styled.nav`
    background-color: #213555;
`
const LogoImg = styled.img`
    height: 120px;
    padding: 20px;
    display: flex;
    margin: auto;

`

export default function Header() {
    return ( 
        <NavBar>
            <LogoImg src={Logo}/>
        </NavBar>
    )
}