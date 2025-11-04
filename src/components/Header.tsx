import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header style={{
      background: '#333',
      padding: '10px 0',
      color: 'white',
      position: 'fixed',
      top: 0,
      left:0,
      width: '100%',
      zIndex: 1000
    }}>
      <div style={{
        maxWidth: '1260px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 20px'
      }}>
        <div style={{ fontSize: '1.5em', fontWeight: 'bold' }}>My App</div>
        <nav>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', gap: '15px' }}>
            <li>
              <Link to="/rick-morty" style={{ color: 'white', textDecoration: 'none' }}>Rick and Morty</Link>
            </li>
            <li>
              <Link to="/products" style={{ color: 'white', textDecoration: 'none' }}>Products</Link>
            </li>
            <li>
              <Link to="/products/create" style={{ color: 'white', textDecoration: 'none' }}>Create Product</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
