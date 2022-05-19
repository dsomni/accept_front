import { IProjectCard } from '@custom-types/ui/IProjectCard';
import { useLocale } from '@hooks/useLocale';
import { Button } from '@mantine/core';
import { capitalize } from '@utils/capitalize';
import { FC } from 'react';
import styles from './projectCard.module.css';
import Link from 'next/link';
import { ChevronRightIcon } from '@modulz/radix-icons';

export const ProjectCard: FC<{
  left: boolean;
  card: IProjectCard;
}> = ({ left, card }) => {
  const { locale } = useLocale();

  return (
    <div
      className={
        styles.wrapper + ' ' + (left ? styles.left : styles.right)
      }
    >
      <div
        className={
          styles.card + ' ' + (left ? styles.left : styles.right)
        }
      >
        <div className={styles.content}>
          <div
            className={styles.image}
            style={{
              backgroundImage: `url(/${card.image})`,
            }}
          >
            <div className={styles.title}>
              {capitalize(card.title(locale))}
            </div>
          </div>
          <div className={styles.description}>
            {card.description(locale)}
          </div>
          <Link href={card.href} passHref>
            <Button
              className={styles.button}
              variant="outline"
              radius="md"
              component="a"
              rightIcon={<ChevronRightIcon width={32} height={32} />}
            >
              {capitalize(locale.projects.view)}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
