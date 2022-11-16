import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// Here we are importing a CSS file as a dependency
import '../styles/Header.css';
import Button from 'react-bootstrap/Button';
import { logout } from '../utils/api';

import { getLoggedInStatus } from '../utils/api';

function Header() {
  const [loggedIn, setLoggedIn] = useState(false);
  let navigate = useNavigate();
  useEffect(() => {
    const loginStatus = async () => {
      try {
        const res = await getLoggedInStatus();
        if (res.ok) {
          setLoggedIn(true);
        }
      } catch (err) {
        console.error(err);
      }
    };
    loginStatus();
  });

  const sendLogout = async (e) => {
    e.preventDefault();
    try {
      const res = await logout();

      if (!res.ok) {
        throw new Error('something went wrong!');
      }
      alert('Successfully logged out!');
      navigate(`/login`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header className="text-center col w-100">
      <div>
        <h1> Welcome to the Pizza Management App!</h1>
        {loggedIn ? (
          <Button variant="dark" className="mx-2 col-1" onClick={sendLogout}>
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
