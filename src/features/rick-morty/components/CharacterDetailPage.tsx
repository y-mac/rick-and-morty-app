import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  image: string;
  origin: { name: string; url: string };
  location: { name: string; url: string };
}

const CharacterDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCharacter = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Character = await response.json();
        setCharacter(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCharacter();
    }
  }, [id]);

  if (loading) return <div>Loading character details...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!character) return <div>No character found.</div>;

  return (
    <div style={{
      padding: '20px',
      maxWidth: '800px',
      margin: 'auto',
      textAlign: 'center',
      background: 'rgba(255, 255, 255, 0.15)',
      borderRadius: '10px',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
      color: 'white'
    }}>
      <h1>{character.name}</h1>
      <img src={character.image} alt={character.name} style={{ width: '300px', height: 'auto', borderRadius: '10px' }} />
      <p><strong>Status:</strong> {character.status}</p>
      <p><strong>Species:</strong> {character.species}</p>
      <p><strong>Gender:</strong> {character.gender}</p>
      <p><strong>Origin:</strong> {character.origin.name}</p>
      <p><strong>Last Known Location:</strong> {character.location.name}</p>
    </div>
  );
};

export default CharacterDetailPage;
