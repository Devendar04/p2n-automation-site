import { useEffect } from "react";
import ScrollHover from "./lib/scrollHover";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import BlogAndFAQ from "./pages/BlogAndFAQ";
import Works from "./pages/Works";
import PressAndMedia from "./pages/PressAndMedia";
import Certificates from "./pages/Certificates";
import ProjectsShowcase from "./pages/ProjectsShowcase";
import Careers from "./pages/Careers";
import Partners from "./pages/Partners";
import CareersPage from "./pages/CareersPage";
import AdminPortal from "./pages/AdminPortal";
import ServicesPage from "./pages/ServicesPage";
import ServiceDetail from "./pages/ServiceDetail";
import BlogPost from "./pages/BlogPost";
import ProjectsPage from "./pages/ProjectsPage";

/** Scrolls to the #hash target after navigation (or to top when there is none). */
function ScrollToHash() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }
    // wait a frame so the target page has rendered
    const id = decodeURIComponent(hash.slice(1));
    const t = setTimeout(() => document.getElementById(id)?.scrollIntoView(), 50);
    return () => clearTimeout(t);
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToHash />
      <ScrollHover />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/blog" element={<BlogAndFAQ />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/works" element={<Works />} />
        <Route path="/press" element={<PressAndMedia />} />
        <Route path="/certificates" element={<Certificates />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/live" element={<ProjectsShowcase />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/careers/openings" element={<Careers />} />
        <Route path="/partners" element={<Partners />} />
        <Route path="/admin" element={<AdminPortal />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/:slug" element={<ServiceDetail />} />
        {/* /contact reuses Home as a placeholder — build ContactPage.jsx
            the same way as the others and swap it in here once ready. */}
        <Route path="/contact" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
