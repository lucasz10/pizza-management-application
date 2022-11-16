import React, { useState } from 'react';
import { createUser } from '../utils/api';

import { checkPassword, validateEmail } from '../utils/helpers';

function CreateChef() {
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    const { target } = e;
    const inputType = target.name;
    const inputValue = target.value;

    if (inputType === 'email') {
      setEmail(inputValue);
    } else if (inputType === 'userName') {
      setUserName(inputValue);
    } else {
      setPassword(inputValue);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email) || !userName) {
      setErrorMessage('Email or username is invalid');
      return;
    }
    if (!checkPassword(password)) {
      setErrorMessage(
        `Choose a more secure password for the account: ${userName}`
      );
      return;
    }

    const formData = {
      username: userName,
      email: email,
      password: password,
      isOwner: false,
      owner_id: localStorage.getItem('user_id'),
    };

    try {
      const res = await createUser(formData);

      if (!res.ok) {
        setErrorMessage('Something Went Wrong!');
        throw new Error('something went wrong!');
      }

      const newUser = await res.json();
      console.log(newUser);
    } catch (err) {
      console.error(err);
    }
    alert('User created! Let your chefs know they can login');
    setUserName('');
    setPassword('');
    setEmail('');
  };

  return (
    <div>
      <h2>Create an account for your chefs! </h2>

      <form className="form">
        <input
          value={email}
          name="email"
          onChange={handleInputChange}
          type="email"
          placeholder="email"
        />
        <input
          value={userName}
          name="userName"
          onChange={handleInputChange}
          type="text"
          placeholder="username"
        />
        <input
          value={password}
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

export default CreateChef;
