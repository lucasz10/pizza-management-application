import React from 'react';
// Here we are importing a CSS file as a dependency
import '../styles/Header.css';

function Header() {
  return (
    <header className="text-center w-100">
      <h1> Welcome to the Pizza Management App!</h1>
    </header>
  );
}

export default Header;
