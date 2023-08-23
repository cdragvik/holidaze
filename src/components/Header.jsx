import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Logo from "../assets/holidaze-logo.png";
import { clear, load } from "../api/storage";


const NavBar = styled.nav`
  background-color: #213555;
`;

const LogoImg = styled.img`
  height: 120px;
  padding: 20px;
  display: flex;
  margin: auto;
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
`;

export default function Header() {
  const user = load("profile"); // Load the user's profile from local storage or your authentication context

  const handleLogout = () => {
    clear(); // Clear user's token and profile from local storage

    // Redirect to the login page
    window.location.href = "/login";
  };

  return (
    <NavBar>
      <a href="/">
        <LogoImg src={Logo} alt="Holidaze Logo" />
      </a>
      <Navigation>
        <ul>
          <li>
            <a href="/">Home</a>
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
              <a href="/login">Log in</a>
            </li>
          )}
        </ul>
      </Navigation>
    </NavBar>
  );
}
