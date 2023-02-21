import { IContactCard } from '@custom-types/ui/IContactCard';
import { FC, memo } from 'react';
import Link from 'next/link';
import styles from './contactCard.module.scss';
import { useWidth } from '@hooks/useWidth';

const ContactCard: FC<{ card: IContactCard }> = ({ card }) => {
  const { phoneOnly } = useWidth();
  return (
    <div className={styles.cardWrapper}>
      <div className={styles.cardTitle}>{card.title}</div>
      <div className={styles.cardContent}>
        <div className={styles.cardDescription}>
          {card.description}
        </div>
        <div className={styles.values}>
          {card.contacts.map((contact, index) => (
            <div className={styles.valueWrapper} key={index}>
              {contact.icon}
              {contact.href ? (
                <Link href={contact.href} passHref legacyBehavior>
                  <a className={styles.link}>
                    {contact.text(phoneOnly)}
                  </a>
                </Link>
              ) : (
                <div className={styles.link}>
                  {contact.text(phoneOnly)}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default memo(ContactCard);
