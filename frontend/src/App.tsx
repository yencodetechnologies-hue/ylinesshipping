import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Splash from "./components/Splash";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import PostEnquiry from "./pages/PostEnquiry";
import ResourcePage from "./pages/ResourcePage";

function ScrollToHash() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.slice(1);
      const t = setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 80);
      return () => clearTimeout(t);
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShowSplash(false), 2200);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <Splash visible={showSplash} />
      <ScrollToHash />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/post-enquiry" element={<PostEnquiry />} />
        <Route path="/resources/:slug" element={<ResourcePage />} />
      </Routes>
    </>
  );
}
