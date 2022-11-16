import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import LoginForm from '../components/LoginForm';
import CreateNewAccount from '../components/CreateUser';
import Auth from '../utils/auth';

const LoginPage = () => {
  let navigate = useNavigate();
  useEffect(() => {
    // Checks if user is logged in. If they are, reroutes them to homepage
    const checkLoggedIn = () => {
      if (Auth.loggedIn()) {
        navigate('/');
      }
    };
    checkLoggedIn();
  });

  return (
    <div className="flex-row justify-center">
      <div className="col-12 col-md-10 mb-3 p-3">
        <LoginForm />
      </div>

      <div className="col-12 col-md-10 my-3">
        <CreateNewAccount />
      </div>
    </div>
  );
};

export default LoginPage;
