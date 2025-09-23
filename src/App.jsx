import './App.css'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import { useEffect } from 'react';
import {
  Home, AllProduct, Contact, Dash
} from './pages';
import { Login } from './sections';
import DynamicRouteHandler from './components/DynamicRouteHandler';
function App() {

  const queryClient = new QueryClient();


  function PrivateRoute({ children }) {
    const token = localStorage.getItem("token");
    return token ? children : <Navigate to="/login" />;
  }




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
        <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dash />
              </PrivateRoute>
            }
          />
          <Route path="/" element={<Home />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/:param" element={<DynamicRouteHandler />} />
          <Route path="/Products" element={<AllProduct />} />
        </Routes>
      </Router>
      </QueryClientProvider>

    </>
  )
}

export default App
