import { Link } from "react-router-dom";
import styled from "styled-components";

export const SubmitButton = styled.button`
  background-color: #4F709C;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin: 20px;

  &:hover {
    background-color: #213555;
  }
`;

export const SecondaryButton = styled(Link)`
  background-color: #d8c4b6b8;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 10px;
  text-decoration: none;
  color: #fff;

  &:hover {
    background-color: #b5a398b8;
  }
`;