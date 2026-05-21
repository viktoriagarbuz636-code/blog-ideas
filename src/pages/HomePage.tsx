import { Link } from 'react-router-dom';
import styles from './HomePage.module.css';

function HomePage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Добро пожаловать в Блог Идей!</h1>

      <p className={styles.subtitle}>
        Это место, где вы можете делиться своими мыслями, находить вдохновение от других и воплощать
        идеи в жизнь!
      </p>

      <div className={styles.infoSection}>
        <h3 className={styles.sectionTitle}>Что вы можете делать на сайте?</h3>

        <ul className={styles.featuresList}>
          <li className={styles.featureItem}>💡 Публиковать свои идеи</li>
          <li className={styles.featureItem}>👀 Смотреть идеи других пользователей</li>
          <li className={styles.featureItem}>✏️ Редактировать свои идеи</li>
          <li className={styles.featureItem}>🗑️ Удалять идеи</li>
        </ul>
      </div>

      <Link to="/gallery" className={styles.ctaButton}>
        Начать просмотр идей →
      </Link>
    </div>
  );
}

export default HomePage;
