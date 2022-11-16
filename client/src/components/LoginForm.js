import React, { useState } from 'react';
import { login } from '../utils/api';

import Auth from '../utils/auth';

function LoginForm() {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await login(formState);
      if (!res.ok) {
        setErrorMessage('Invalid email or password!');
        return;
      }
      const data = await res.json();
      console.log(data);
      Auth.loginToken(data);
    } catch (err) {
      console.error(err);
    }

    setFormState({
      email: '',
      password: '',
    });
  };

  return (
    <div>
      <form className="form">
        <input
          value={formState.email}
          name="email"
          onChange={handleInputChange}
          type="email"
          placeholder="email"
        />
        <input
          value={formState.password}
          name="password"
          onChange={handleInputChange}
          type="password"
          placeholder="Password"
        />
        <button type="button" onClick={handleFormSubmit}>
          Submit
        </button>
      </form>
      {errorMessage && (
        <div>
          <p className="error-text">{errorMessage}</p>
        </div>
      )}
    </div>
  );
}

export default LoginForm;
