import React from 'react';
// Style
import './_style.scss';

export const Header: React.FC = () => (
  <header className="Header">
    <div className="container-fluid">
      <div className="Header__wrapper">
        <img
          //
          alt="Aiesec Logo"
          className="Header__logo"
          src="https://cdn-expa.aiesec.org/assets/images/aiesec_logo_black.svg"
        />
      </div>
    </div>
  </header>
);
