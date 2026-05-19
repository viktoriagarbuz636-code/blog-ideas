import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function EditIdeaPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [nick, setNick] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchIdea();
  }, [id]);

  const fetchIdea = async () => {
    try {
      setLoading(true);

      const response = await fetch(`http://localhost:3001/ideas/${id}`);

      if (!response.ok) {
        throw new Error('Идея не найдена');
      }

      const data = await response.json();

      setNick(data.nick);
      setName(data.name);
      setDescription(data.description);
    } catch (err) {
      console.error(err);
      setError('Ошибка загрузки идеи');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError('');

      const response = await fetch(`http://localhost:3001/ideas/${id}`, {
        method: 'PUT',
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
        throw new Error('Ошибка обновления идеи');
      }

      navigate('/gallery');
    } catch (err) {
      console.error(err);
      setError('Не удалось обновить идею');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div style={{ padding: '20px' }}>Загрузка...</div>;
  }

  if (error) {
    return <div style={{ padding: '20px', color: 'red' }}>{error}</div>;
  }

  return (
    <div
      style={{
        maxWidth: '600px',
        margin: '40px auto',
        padding: '20px',
      }}
    >
      <h1>Редактирование идеи #{id}</h1>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '16px' }}>
          <label>Никнейм:</label>

          <input
            type="text"
            value={nick}
            onChange={(e) => setNick(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              marginTop: '8px',
            }}
          />
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label>Название:</label>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            rows={4}
            style={{
              width: '100%',
              padding: '10px',
              marginTop: '8px',
            }}
          />
        </div>

        <button type="submit">Сохранить изменения</button>
      </form>
    </div>
  );
}

export default EditIdeaPage;
