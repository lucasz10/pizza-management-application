import React, { useEffect, useState } from 'react';

const Home = () => {
  const [isOwner, setOwner] = useState();

  useEffect(() => {
    const checkOwner = () => {
      const storedOwner = localStorage.getItem('isOwner');

      if (storedOwner === 'false') {
        setOwner(false);
      } else {
        setOwner(true);
      }
    };
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
