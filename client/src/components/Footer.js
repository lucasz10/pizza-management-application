import React from 'react';
import Button from 'react-bootstrap/Button';
// Here we are importing a CSS file as a dependency
import '../styles/Footer.css';

function Footer() {
  return (
    <footer className="w-100 align-items-center">
      <h3> Links for the Developer: </h3>
      <div className="col px-5">
        <Button
          variant="dark"
          href="mailto:lucas.zach10@gmail.com"
          className="mx-2"
        >
          Send an Email!
        </Button>
        <Button
          variant="dark"
          href="https://www.linkedin.com/in/zachary-lucas-234a78166/"
          className="mx-2"
        >
          My LinkedIn
        </Button>
      </div>
    </footer>
  );
}

export default Footer;
