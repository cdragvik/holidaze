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

const Navigation = styled.nav`
    ul {
        list-style: none;
        display: flex;
        margin: 0;
        padding: 0;
    }

    li {
        margin-right: 20px;
    }

    a {
        color: white;
        text-decoration: none;
        font-weight: bold;
    }
`;

export default function Header() {
    return ( 
        <NavBar>
            <a href="/"><LogoImg src={Logo}/></a>
            <Navigation>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/login">Log in</a></li>
                </ul>
            </Navigation>
        </NavBar>
    );
}