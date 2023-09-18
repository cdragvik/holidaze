import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Logo from "../assets/holidaze-logo.png";
import { clear, load } from "../api/storage";
import { Close, Hamburger, LogoImg, NavBar, Navigation } from "../styles/HeaderStyles";

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
