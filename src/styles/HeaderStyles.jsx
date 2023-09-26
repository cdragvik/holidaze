import { styled } from "styled-components";

export const NavBar = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgb(33, 53, 85);
  padding: 15px;
  position: relative;
  min-height: 100px;  /* Set a minimum height */

  @media (max-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%; /* Ensure the nav bar spans the entire width */
    padding: 20px 10px; /* Adjust padding to create some space on the sides */
  }
`;

export const LogoImg = styled.img`
  height: 80px;
  padding: 10px;

`;

export const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%; /* Ensure the container spans the entire width */

  @media (max-width: 768px) {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
`;
export const Navigation = styled.nav`
  ul {
    list-style: none;
    display: flex;
    flex-direction: row;
    align-items: center; 
    margin: 0;
    padding: 0;
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
      padding-top: 80px;  /* Adjust padding-top to ensure links are displayed below the close button */
    }

    li {
      margin: 20px;
    }
  }
`;


export const Hamburger = styled.div`
  
  cursor: pointer;
  z-index: 3;
  position: absolute;
  right: 50px; 
  top: 20px;

  .bar1, .bar2, .bar3 {
    width: 35px;
    height: 3px;
    background-color: #ffffff;
    margin: 8px 0;
    transition: 0.4s;
  }

  &.active .bar1 {
    transform: rotate(-45deg) translate(-11px, 6px);
  }

  &.active .bar2 {
    opacity: 0;
  }

  &.active .bar3 {
    transform: rotate(45deg) translate(-9px, -5px);
  }

  @media (min-width: 769px) {
    display: none;
  }
`;