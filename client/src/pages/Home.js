import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Import react-bootstrap styles
import 'bootstrap/dist/css/bootstrap.min.css';

// Import Components for use
import CreateChef from '../components/CreateChef';
import OwnerToppings from '../components/OwnerToppings';
import ChefDashboard from '../components/ChefDashboard';
import CreatePizza from '../components/CreatePizza';

// Import Auth methods from Utils
import Auth from '../utils/auth';

const Home = () => {
  const [isOwner, setOwner] = useState();
  let navigate = useNavigate();
  useEffect(() => {
    // Checks if user is logged in. If they are not, reroutes them to login
    const checkLoggedIn = () => {
      if (!Auth.loggedIn()) {
        navigate('/login');
      }
    };
    // Changes the home page rendering based on if user is an owner
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
          <h3>Welcome to your dashboard, chef!</h3>
          <CreatePizza />
          <ChefDashboard />
        </div>
      )}
    </div>
  );
};

export default Home;
