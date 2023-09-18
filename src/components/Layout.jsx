import { styled } from "styled-components";
import Footer from "./Footer";
import Header from "./Header"

const LayoutContainer = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
`;


const Layout = (props) => {
    return (
        <LayoutContainer>
            <Header></Header>
                {props.children}
            <Footer></Footer>
        </LayoutContainer>
    )
}

export default Layout;