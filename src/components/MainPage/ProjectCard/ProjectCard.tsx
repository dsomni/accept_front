import { IProjectCard } from '@custom-types/IProjectCard';
import { useLocale } from '@hooks/useLocale';
import { Button } from '@mantine/core';
import { capitalize } from '@utils/capitalize';
import { FC } from 'react';
import styles from './projectCard.module.css';
import Link from 'next/link';

export const ProjectCard: FC<{ left: boolean; card: IProjectCard }> = ({
  left,
  card,
}) => {
  const { locale } = useLocale();

  return (
    <div className={styles.wrapper + ' ' + (left ? styles.left : styles.right)}>
      <div className={styles.card + ' ' + (left ? styles.left : styles.right)}>
        <div
          className={styles.image}
          style={{ backgroundImage: `url(/${card.image})` }}
        />
        <div className={styles.content}>
          <div className={styles.title}>{capitalize(card.title(locale))}</div>
          <div className={styles.description}>{card.description(locale)}</div>
          <Link href={card.href} passHref>
            <Button variant="outline" radius="md" component="a">
              {capitalize(locale.projects.view)}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
