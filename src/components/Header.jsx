import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Logo from "../assets/holidaze-logo.png";
import { clear, load } from "../api/storage";

const NavBar = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgb(33, 53, 85);
  padding: 20px;
  position: relative;
`;

const LogoImg = styled.img`
  height: 80px;
  padding: 15px;

`;

const Navigation = styled.nav`
  ul {
    list-style: none;
    display: flex;
    margin: 0;
    padding: 0;
    justify-content: center;
  }
  
  li {
    margin: 10px 30px;
  }
  
  a {
    color: white;
    text-decoration: none;
    border-radius: 8px;
    box-shadow: inset 0 0 0 0 #4F709C;
    padding: 10px;
    transition: color .3s ease-in-out, box-shadow .3s ease-in-out;

    &:hover {
      color: #fff;
      box-shadow: inset 200px 0 0 0 #4F709C;
      border-radius: 8px;
    }
  }

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    right: 0;
    height: 100%;
    width: ${(props) => (props.open ? "200px" : "0")};
    overflow-x: hidden;
    background-color: #213555;
    transition: width 0.3s;
    z-index: 2;

    ul {
      flex-direction: column;
      padding-left: 15px;
    }

    li {
      margin: 20px;
    }
  }
`;

const Hamburger = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: block;
    position: absolute;
    right: 20px;
  }
  div {
    width: 25px;
    height: 2px;
    background-color: ${(props) => (props.open ? "transparent" : "white")};
    margin: 6px 0;
  }
`;

const Close = styled.div`
  color: white; 
`; 

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const user = load("profile");

  const handleLogout = () => {
    clear();
    window.location.href = "/login";
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <NavBar>
      <Link to="/">
        <LogoImg src={Logo} alt="Holidaze Logo" />
      </Link>
      <Hamburger open={menuOpen} onClick={toggleMenu}>
        <div></div>
        <div></div>
        <div></div>
      </Hamburger>
      <Navigation open={menuOpen}>
        <ul>
          {menuOpen && (
            <li style={{ alignSelf: "flex-end" }}>
              <Close onClick={toggleMenu}>X</Close>
            </li>
          )}
          <li>
            <Link to="/" onClick={toggleMenu}>
              Home
            </Link>
          </li>
          {user ? (
            <>
              <li>
                <Link to={`/profile/${user.name}`} onClick={toggleMenu}>
                  Profile
                </Link>
              </li>
              <li>
                <a href="#!" onClick={handleLogout}>
                  Logout
                </a>
              </li>
            </>
          ) : (
            <li>
              <Link to="/login" onClick={toggleMenu}>
                Log in
              </Link>
            </li>
          )}
        </ul>
      </Navigation>
    </NavBar>
  );
}
