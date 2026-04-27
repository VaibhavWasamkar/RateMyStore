import AppHeader from "./AppHeader";

const Layout = ({ children }) => {
    return (
        <div className="home">
            <AppHeader />
            <div style={{
                maxWidth: "1200px",
                marginInline: "auto"
            }}>
                {children}
            </div>
        </div>
    );
};

export default Layout;