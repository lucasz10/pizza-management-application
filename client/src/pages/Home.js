import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLoggedInStatus, getOwnerStatus } from '../utils/api';

const Home = () => {
  let navigate = useNavigate;
  const [isOwner, setIsOwner] = useState(true);

  useEffect(() => {
    const loginStatus = async () => {
      try {
        const res = await getLoggedInStatus();
        if (!res.ok) {
          setIsOwner(false);
        }
      } catch (err) {
        console.error(err);
      }
    };

    const ownerStatus = async () => {
      try {
        const res = await getLoggedInStatus();
        if (res.ok) {
          navigate('/');
        }
      } catch (err) {
        console.error(err);
      }
    };
    loginStatus();
    ownerStatus();
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
