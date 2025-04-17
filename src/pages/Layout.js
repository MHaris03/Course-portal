// Layout.js
import React from 'react';
import Header from './Header';

function Layout({ children, loggedIn, onProfileClick, onLoginClick }) {
  return (
    <div className="app">
      <Header loggedIn={loggedIn} onProfileClick={onProfileClick} onLoginClick={onLoginClick} />
      <main className="main-content">{children}</main>
    </div>
  );
}

export default Layout;
