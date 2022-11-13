import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Imported components
import { Header, Footer } from '/components'

// Imported pages for Routing
import Login from './pages/Login';
import CreateAccount from './pages/createAccount';
import Home from './pages/Home';


function App() {
  return (
    
    <Router>
      <Header />
      <div className="flex-column justify-center align-center min-100-vh bg-primary">
        <Routes>
          <Route 
            path="/" 
            element={<Login />} 
          />
          <Route 
            path="/createAccount" 
            element={<CreateAccount />} 
          />
          <Route 
            path="/:userId/home" 
            element={<Home />} 
          />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
