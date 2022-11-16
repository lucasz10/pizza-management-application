import React, { useState } from 'react';
import { createUser } from '../utils/api';

import { checkPassword, validateEmail } from '../utils/helpers';

function CreateOwner() {
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
    alert('User created! Please log in.');
    setUserName('');
    setPassword('');
    setEmail('');
  };

  return (
    <div>
      <h2>Create an owner account!</h2>

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

export default CreateOwner;
