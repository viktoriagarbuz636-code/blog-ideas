import { Link, useLocation } from 'react-router-dom';
import styles from './Header.module.css';

export function Header() {
  const location = useLocation();

  const getLinkClass = (path: string) => {
    return location.pathname === path ? `${styles.link} ${styles.linkActive}` : styles.link;
  };

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <span className={styles.brand}>Блог Идей</span>

        <Link to="/" className={getLinkClass('/')}>
          Главная
        </Link>

        <Link to="/gallery" className={getLinkClass('/gallery')}>
          Галерея идей
        </Link>

        <Link to="/add" className={getLinkClass('/add')}>
          Добавить идею
        </Link>

        <Link to="/contacts" className={getLinkClass('/contacts')}>
          Контакты
        </Link>
      </nav>
    </header>
  );
}
