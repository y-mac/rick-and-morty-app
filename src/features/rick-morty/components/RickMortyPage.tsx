import React from 'react';
    import useRickMortyApi from '../../../hooks/useRickMortyApi';
import { Link } from 'react-router-dom';

const RickMortyPage: React.FC = () => {
  const { characters, loading, error, page, totalPages, goToNextPage, goToPreviousPage } = useRickMortyApi();

  if (loading) return <div>Loading characters...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Rick and Morty Characters</h1>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '20px',
        justifyContent: 'center',
        width: '100%',
        maxWidth: '1560px',
        margin: '0 auto'
      }}>
        {characters.map((character) => (
          <div key={character.id} style={{
            border: '1px solid rgba(255, 255, 255, 0.2)',
            padding: '10px',
            borderRadius: '8px',
            width: '200px',
            textAlign: 'center',
            background: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
            color: 'white'
          }}>
            <img src={character.image} alt={character.name} style={{ width: '100%', height: 'auto', borderRadius: '4px' }} />
            <h2>
              <Link to={`/rick-morty/${character.id}`}>{character.name}</Link>
            </h2>
            <p>Status: {character.status}</p>
            <p>Species: {character.species}</p>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
        <button onClick={goToPreviousPage} disabled={page === 1}>Previous</button>
        <span>Page {page} of {totalPages}</span>
        <button onClick={goToNextPage} disabled={page === totalPages}>Next</button>
      </div>
    </div>
  );
};

export default RickMortyPage;
