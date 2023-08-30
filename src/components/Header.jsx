import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Logo from "../assets/holidaze-logo.png";
import { clear, load } from "../api/storage";

const NavBar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #213555;
  padding: 0 20px;
`;

const LogoImg = styled.img`
  height: 100px;
  padding: 10px;
`;

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

  @media (max-width: 768px) {
    ul {
      display: ${(props) => (props.open ? "block" : "none")};
      position: absolute;
      top: 100px;
      right: 0;
      width: 100%;
      text-align: right;
      background-color: #213555;
      padding: 20px;
    }
  }
`;

const Hamburger = styled.div`
  display: none;
  font-size: 24px;
  color: white;

  @media (max-width: 768px) {
    display: block;
  }
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
      <Hamburger onClick={toggleMenu}>
        <div>☰</div>
      </Hamburger>
      <Navigation open={menuOpen}>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {user ? (
            <>
              <li>
                <Link to={`/profile/${user.name}`}>Profile</Link>
              </li>
              <li>
                <a href="#!" onClick={handleLogout}>
                  Logout
                </a>
              </li>
            </>
          ) : (
            <li>
              <Link to="/login">Log in</Link>
            </li>
          )}
        </ul>
      </Navigation>
    </NavBar>
  );
}
