import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddIdeaPage() {
  const [nick, setNick] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError('');

      const response = await fetch('http://localhost:3001/ideas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nick,
          name,
          description,
        }),
      });

      if (!response.ok) {
        throw new Error('Ошибка создания идеи');
      }

      await response.json();

      navigate('/gallery');
    } catch (err) {
      console.error(err);
      setError('Не удалось создать идею');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: '600px',
        margin: '40px auto',
        padding: '20px',
      }}
    >
      <h1>Добавить новую идею</h1>

      {error && (
        <div
          style={{
            color: 'red',
            marginBottom: '16px',
          }}
        >
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '16px' }}>
          <label>Ваш никнейм:</label>

          <input
            type="text"
            value={nick}
            onChange={(e) => setNick(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '10px',
              marginTop: '8px',
            }}
          />
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label>Название идеи:</label>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '10px',
              marginTop: '8px',
            }}
          />
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label>Описание:</label>

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={4}
            style={{
              width: '100%',
              padding: '10px',
              marginTop: '8px',
            }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '10px 20px',
            cursor: 'pointer',
          }}
        >
          {loading ? 'Создание...' : 'Опубликовать идею'}
        </button>
      </form>
    </div>
  );
}

export default AddIdeaPage;
