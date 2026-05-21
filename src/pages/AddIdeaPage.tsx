import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AddIdeaPage.module.css';

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

      navigate('/gallery');
    } catch (err) {
      console.error(err);

      setError('Не удалось создать идею');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>✨ Добавить новую идею</h1>

      {error && <div className={styles.error}>❌ {error}</div>}

      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Ваш никнейм</label>

          <input
            type="text"
            value={nick}
            onChange={(e) => setNick(e.target.value)}
            required
            disabled={loading}
            className={styles.input}
            placeholder="Например: VictoriaDev"
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Название идеи</label>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            disabled={loading}
            className={styles.input}
            placeholder="Краткое название идеи"
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Описание идеи</label>

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={5}
            disabled={loading}
            className={styles.textarea}
            placeholder="Подробно расскажите о своей идее..."
          />
        </div>

        <button type="submit" disabled={loading} className={styles.submitButton}>
          {loading ? '⏳ Отправка...' : '🚀 Опубликовать идею'}
        </button>
      </form>
    </div>
  );
}

export default AddIdeaPage;
