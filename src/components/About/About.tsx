import ProjectHistory from '@components/ProjectHistory/ProjectHistory';
import Contacts from '@ui/Contacts/Contacts';
import { FC, memo } from 'react';
import styles from './about.module.scss';

const About: FC<{}> = ({}) => {
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.contactsWrapper}>
          <Contacts />
        </div>
        <div className={styles.aboutWrapper}>
          <div className={styles.title}>О нас</div>
          <div className={styles.history}>
            <div>
              Тестирующая система Accept была создана в 2020 году
              специально для Вятского многопрофильного лицея города
              Вятские Поляны.
            </div>
            <div>
              Название Accept - это рекурсивный акроним,
              расшифровывающийся так:
              <br /> Accept is a Controlled Contraption for Education
              and Program Testing
            </div>
            <div>
              В начале работы команда столкнулась со множеством
              технических трудностей, так как опыт разработки проектов
              подобного масштаба полностью отсутствовал. Тем не менее,
              первая версия системы увидела свет уже в феврале 2021
              года и активно развивалась и совершенствовалась вплоть
              до конца 2021 года.
            </div>
            <div>
              За это время, мы получили много обратной связи как от
              преподавателей, так и от учеников. Становилось очевидно,
              что изначально выбранный инструментарий разработки не
              позволял эффективно интегрировать новый функционал. В
              связи с этим возникла идея модернизации системы, а
              точнее полной её замены.
            </div>
            <div>
              Благодаря накопленному за год опыту и обратной связи
              пользователей, мы смогли создать продукт, который не
              только стал намного приятнее и удобнее визуально, но и
              расширил функциональные возможности. Новая гибкая
              архитектура позволяет безболезненно модифицировать и
              дополнять систему.
            </div>
            <div>
              Наша команда надеется, что Accept послужит опорой для
              качественного образования и поможет педагогам привить
              ученикам любовь к программированию.
            </div>
          </div>
        </div>
        <div className={styles.timeline}>
          <ProjectHistory />
        </div>
      </div>
    </>
  );
};

export default memo(About);
