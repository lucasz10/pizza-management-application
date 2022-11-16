import React from 'react';

import LoginForm from '../components/LoginForm';
import CreateNewAccount from '../components/CreateUser';

const LoginPage = () => {
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
