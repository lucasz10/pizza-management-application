import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Auth from '../utils/auth';

const Home = () => {
  const [isOwner, setOwner] = useState();
  let navigate = useNavigate();
  useEffect(() => {
    // Checks if user is logged in. If they are, reroutes them to homepage
    const checkLoggedIn = () => {
      if (!Auth.loggedIn()) {
        navigate('/login');
      }
    };

    const checkOwner = () => {
      const storedOwner = localStorage.getItem('isOwner');

      if (storedOwner === 'false') {
        setOwner(false);
      } else {
        setOwner(true);
      }
    };
    checkLoggedIn();
    checkOwner();
  });

  return (
    <div>
      {isOwner ? (
        <div>
          <h3>You are an owner!</h3>
        </div>
      ) : (
        <div>
          <h3>You are not an owner!</h3>
        </div>
      )}
    </div>
  );
};

export default Home;
