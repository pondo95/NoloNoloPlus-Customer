import Footer from "./Footer";
import Navbar from "./TopNavbar";

function Layout ({ children })  {
  return (
    <>
    
        <Navbar />
        {children}
        <Footer />
    </>
  );
};

export default Layout;
