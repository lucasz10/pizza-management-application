import React from 'react';
// Here we are importing a CSS file as a dependency
import '../styles/Header.css';
import Button from 'react-bootstrap/Button';

import Auth from '../utils/auth';

function Header() {
  const logout = async (e) => {
    e.preventDefault();
    Auth.logout();
  };

  return (
    <header className="text-center col w-100">
      <div>
        <h1> Welcome to the Pizza Management App!</h1>
        {Auth.loggedIn() ? (
          <Button variant="dark" className="mx-2 col-1" onClick={logout}>
            Logout
          </Button>
        ) : (
          <></>
        )}
      </div>
    </header>
  );
}

export default Header;
