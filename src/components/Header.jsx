import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/holidaze-logo.png";
import { clear, load } from "../api/storage";
import { Hamburger, LogoContainer, LogoImg, NavBar, Navigation } from "../styles/HeaderStyles";

export default function Header() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const user = load("profile");

  const handleLogout = () => {
    clear();
    navigate('/login');
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <NavBar>
      <LogoContainer>
        <Link to="/">
          <LogoImg src={Logo} alt="Holidaze Logo" />
        </Link>
      </LogoContainer>
      <Hamburger className={menuOpen ? "active" : ""} onClick={toggleMenu}>
        <div className="bar1"></div>
        <div className="bar2"></div>
        <div className="bar3"></div>
      </Hamburger>
      <Navigation open={menuOpen}>
        <ul>
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
                <a onClick={handleLogout}>
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
