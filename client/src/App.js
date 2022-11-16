import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import react-bootstrap styles
import 'bootstrap/dist/css/bootstrap.min.css';

// Imported components
import Header from './components/Header';
import Footer from './components/Footer';

// Imported pages for Routing
import LoginPage from './pages/LoginPage';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <Header />
      <div className="flex-column text-center align-center min-100-vh">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
