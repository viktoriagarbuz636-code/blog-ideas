import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { Idea } from '../types';

function GalleryPage() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchIdeas();
  }, []);

  const fetchIdeas = async () => {
    try {
      setLoading(true);

      const response = await fetch('http://localhost:3001/ideas');

      if (!response.ok) {
        throw new Error('Ошибка загрузки идей');
      }

      const data = await response.json();
      setIdeas(data);
    } catch (err) {
      console.error(err);
      setError('Не удалось загрузить идеи');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div style={{ padding: '20px' }}>Загрузка идей...</div>;
  }

  if (error) {
    return <div style={{ padding: '20px', color: 'red' }}>{error}</div>;
  }

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm('Вы уверены, что хотите удалить идею?');

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/ideas/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Ошибка удаления');
      }

      setIdeas((prevIdeas) => prevIdeas.filter((idea) => idea.id !== id));
    } catch (err) {
      console.error(err);
      alert('Не удалось удалить идею');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Галерея идей</h1>

      {ideas.length === 0 ? (
        <p>Пока нет идей</p>
      ) : (
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '20px',
          }}
        >
          {ideas.map((idea) => (
            <div
              key={idea.id}
              style={{
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '16px',
                width: '300px',
              }}
            >
              <h3>{idea.name}</h3>

              <p>
                <strong>Автор:</strong> {idea.nick}
              </p>

              <p>{idea.description}</p>

              <Link to={`/edit/${idea.id}`}>
                <button>Редактировать</button>
                <button
                  onClick={() => handleDelete(idea.id)}
                  style={{
                    marginLeft: '10px',
                  }}
                >
                  Удалить
                </button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default GalleryPage;
