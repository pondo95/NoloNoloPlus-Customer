import Footer from "./Footer";
import Navbar from "./TopNavbar";
import Head from "next/head";

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
