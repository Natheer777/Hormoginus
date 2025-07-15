import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import { useEffect } from 'react';
import { Home, Products } from './pages';
import Contact from './pages/Contact/Contact';
import VerifyProduct from './pages/VerifyProduct';
import ProductById from './pages/ProductById';
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
          {/* راوت للآي دي الرقمي فقط */}
          <Route path="/:id(\\d+)" element={<ProductById />} />
          {/* راوت لاسم المنتج */}
          <Route path="/:productName" element={<Products />} />
          {/* إذا كنت تحتاج VerifyProduct لشيء خاص */}
          {/* <Route path="/verify/:id" element={<VerifyProduct />} /> */}
        </Routes>
      </Router>
    </>
  )
}

export default App
