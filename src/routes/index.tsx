import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from '../features/auth/components/LoginForm';
import RickMortyPage from '../features/rick-morty/components/RickMortyPage';
import ProtectedRoute from '../components/ProtectedRoute';
import CharacterDetailPage from '../features/rick-morty/components/CharacterDetailPage';
import ProductsPage from '../features/products/components/ProductsPage';

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route
          path="/rick-morty"
          element={
            <ProtectedRoute>
              <RickMortyPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/rick-morty/:id"
          element={
            <ProtectedRoute>
              <CharacterDetailPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <ProductsPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
