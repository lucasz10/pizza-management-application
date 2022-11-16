import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Imported components
import { Header, Footer } from '/components';

// Imported pages for Routing
import { Login, CreateAccount, Home } from './pages';

function App() {
  return (
    <Router>
      <Header />
      <div className="flex-column justify-center align-center min-100-vh bg-primary">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
