import React from 'react';
import styled from 'styled-components';
import Footer from "./Footer";
import Header from "./Header"

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const ContentWrapper = styled.div`
  flex: 1;
`;

const Layout = (props) => {
    return (
        <LayoutContainer>
            <Header></Header>
            <ContentWrapper>
                {props.children}
            </ContentWrapper>
            <Footer></Footer>
        </LayoutContainer>
    )
}

export default Layout;
