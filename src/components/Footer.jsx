import React from 'react';
import styled from 'styled-components';

const StyledFooter = styled.footer`
    background-color: #213555;
    color: white;
    text-align: center;
    padding: 20px;
    margin-top: auto;
`;

function Footer() {
    return (
        <StyledFooter>
            © {new Date().getFullYear()}. Designed and built by Christiane Nanette Dragvik
        </StyledFooter>
    );
}

export default Footer;
