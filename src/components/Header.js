import React from 'react';
import Navbar from './Navbar';

const Header = ({ children }) => {
  return (
    <header>
      <Navbar />
      {children}
    </header>
  );
};

export default React.memo(Header);
