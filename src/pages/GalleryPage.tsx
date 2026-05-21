import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { Idea } from '../types';
import styles from './GalleryPage.module.css';

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

  if (loading) {
    return <div className={styles.empty}>⏳ Загрузка идей...</div>;
  }

  if (error) {
    return <div className={styles.empty}>❌ {error}</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>💡 Галерея идей</h1>

      {ideas.length === 0 ? (
        <p className={styles.empty}>Пока нет идей. Будьте первым, кто добавит идею!</p>
      ) : (
        <div className={styles.grid}>
          {ideas.map((idea) => (
            <div key={idea.id} className={styles.card}>
              <h2 className={styles.ideaTitle}>💡 {idea.name}</h2>

              <p className={styles.author}>👤 Автор: {idea.nick}</p>

              <p className={styles.description}>{idea.description}</p>

              <div className={styles.buttonGroup}>
                <Link to={`/edit/${idea.id}`} className={styles.editButton}>
                  ✏️ Редактировать
                </Link>

                <button onClick={() => handleDelete(idea.id)} className={styles.deleteButton}>
                  🗑️ Удалить
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default GalleryPage;
