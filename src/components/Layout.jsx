import Header from "./Header"

const Layout = (props) => {
    return (
        <>
            <Header></Header>
                {props.children}
        </>
    )
}

export default Layout;