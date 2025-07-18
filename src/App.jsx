import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import { useEffect } from 'react';
import { Home, AllProduct , Contact } from './pages';
import VerifyProduct from './pages/VerifyProduct';
import DynamicRouteHandler from './components/DynamicRouteHandler';
function App() {
  useEffect(() => {
    setInterval(() => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          } else {
            entry.target.classList.remove("show");
          }
        });
      });

      const Elements = document.querySelectorAll(".left ,.right ,.top ,.hidden");
      Elements.forEach((el) => observer.observe(el));

      return () => {
        Elements.forEach((el) => observer.unobserve(el));
      };
    });
  }, []);
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/:param" element={<DynamicRouteHandler />} />
          <Route path="/Products" element={<AllProduct />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
