import { IProjectCard } from '@custom-types/ui/IProjectCard';
import { useLocale } from '@hooks/useLocale';

import { FC } from 'react';
import styles from './projectCard.module.css';
import { ChevronRight } from 'tabler-icons-react';
import { Button, Icon } from '@ui/basics';

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
            <div className={styles.title}>{card.title(locale)}</div>
          </div>
          <div className={styles.description}>
            {card.description(locale)}
          </div>

          <Button
            className={styles.button}
            variant="outline"
            href={card.href}
            rightIcon={
              <Icon color="var(--primary)">
                <ChevronRight />
              </Icon>
            }
          >
            {locale.projects.view}
          </Button>
        </div>
      </div>
    </div>
  );
};
