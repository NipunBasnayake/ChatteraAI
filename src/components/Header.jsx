import React from 'react';

const Header = () => {
  return (
    <header className="text-center py-3">
      <h1 className="custom-header">ChatterAI</h1>
      <p className="text-light opacity-75 mb-2">Intelligent conversations at your fingertips</p>
      <hr className="custom-divider" />
    </header>
  );
};

export default Header;