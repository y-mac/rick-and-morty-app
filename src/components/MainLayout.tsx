import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';

const MainLayout: React.FC = () => {
  const location = useLocation();
  const showHeader = location.pathname !== '/';

  return (
    <>
      {showHeader && <Header />}
      <Outlet />
    </>
  );
};

export default MainLayout;
