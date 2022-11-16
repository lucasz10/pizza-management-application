import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Import react-bootstrap styles
import 'bootstrap/dist/css/bootstrap.min.css';

import CreateChef from '../components/CreateChef';

import Auth from '../utils/auth';
import OwnerToppings from '../components/OwnerToppings';

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
          <h3>Welcome to your dashboard, owner!</h3>
          <CreateChef />
          <h3 className="my-5"> Manage Your Toppings!</h3>
          <OwnerToppings />
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
