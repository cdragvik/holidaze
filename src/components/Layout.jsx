import Footer from "./Footer";
import Header from "./Header"

const Layout = (props) => {
    return (
        <>
            <Header></Header>
                {props.children}
            <Footer></Footer>
        </>
    )
}

export default Layout;