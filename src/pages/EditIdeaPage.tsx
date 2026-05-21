import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import styles from './EditIdeaPage.module.css';

function EditIdeaPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [nick, setNick] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      setIsSubmitting(true);
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
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <div className={styles.loading}>⏳ Загрузка идеи...</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>✏️ Редактирование идеи</h1>

      <p className={styles.subtitle}>ID идеи: {id}</p>

      {error && <div className={styles.error}>❌ {error}</div>}

      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Никнейм</label>

          <input
            type="text"
            value={nick}
            onChange={(e) => setNick(e.target.value)}
            required
            disabled={isSubmitting}
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Название идеи</label>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            disabled={isSubmitting}
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Описание</label>

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={5}
            disabled={isSubmitting}
            className={styles.textarea}
          />
        </div>

        <div className={styles.actions}>
          <button type="submit" disabled={isSubmitting} className={styles.saveButton}>
            {isSubmitting ? '⏳ Сохранение...' : '💾 Сохранить'}
          </button>

          <button
            type="button"
            onClick={() => navigate('/gallery')}
            className={styles.cancelButton}
          >
            ↩️ Отмена
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditIdeaPage;
