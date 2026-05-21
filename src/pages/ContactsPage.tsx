import styles from './ContactsPage.module.css';
import victoriaPhoto from './assets/victoria.png';
import dariaPhoto from './assets/daria.png';
import { useState } from 'react';

const developers = [
  {
    name: 'Виктория Гарбуз',
    role: 'Frontend Developer',
    description:
      'Студентка 4 курса ИММиКН им. И. И. Воровича ЮФУ, направление «Педагогическое образование», профиль «Математика и информатика». Создаю современные и удобные интерфейсы на React и TypeScript.',
    email: 'garbuz@sfedu.ru',
    telegram: 'https://t.me/kubankruto',
    photo: victoriaPhoto,
  },
  {
    name: 'Дарья Таранец',
    role: 'UI/Frontend Developer',
    description:
      'Студентка 4 курса ИММиКН им. И. И. Воровича ЮФУ, направление «Педагогическое образование», профиль «Математика и информатика». Уделяю внимание адаптивному дизайну, удобству интерфейсов и работе с React-приложениями.',
    email: 'taranets@sfedu.ru',
    telegram: 'https://t.me/drsbrns',
    photo: dariaPhoto,
  },
];

function ContactsPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Форма обратной связи:', formData);
    alert('Сообщение отправлено в консоль');
    setFormData({
      name: '',
      email: '',
      message: '',
    });
  };
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Контакты разработчиков</h1>
      <p className={styles.subtitle}>
        Небольшая карточка с информацией о каждом разработчике проекта.
      </p>

      <div className={styles.grid}>
        {developers.map((developer) => (
          <article key={developer.email} className={styles.card}>
            <img src={developer.photo} alt={`Фото ${developer.name}`} className={styles.photo} />

            <h2 className={styles.name}>{developer.name}</h2>
            <p className={styles.role}>{developer.role}</p>
            <p className={styles.description}>{developer.description}</p>

            <div className={styles.contactBlock}>
              <h3 className={styles.sectionTitle}>Электронная почта</h3>
              <a
                href={`mailto:${developer.email}?subject=Вопрос%20по%20проекту`}
                className={styles.emailLink}
              >
                {developer.email}
              </a>
            </div>
            <div className={styles.contactBlock}>
              <h3 className={styles.sectionTitle}>Социальные сети</h3>

              <a
                href={developer.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
              >
                Telegram
              </a>
            </div>
          </article>
        ))}
      </div>
      <section className={styles.formSection}>
        <h2 className={styles.formTitle}>Обратная связь</h2>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Ваше имя</label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className={styles.formInput}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className={styles.formInput}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="message">Сообщение</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className={styles.formTextarea}
              rows={5}
              required
            />
          </div>

          <button type="submit" className={styles.formButton}>
            Отправить
          </button>
        </form>
      </section>
    </div>
  );
}

export default ContactsPage;
