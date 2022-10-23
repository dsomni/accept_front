import { IProjectCard } from '@custom-types/ui/IProjectCard';
import { useLocale } from '@hooks/useLocale';
import { Button, Icon } from '@ui/basics';

import { FC } from 'react';
import { ChevronRight } from 'tabler-icons-react';
import styles from './projectCard.module.css';

export const ProjectCard: FC<{
  left: boolean;
  card: IProjectCard;
}> = ({ left, card }) => {
  const { locale } = useLocale();
  const position = left ? styles.left : styles.right;

  return (
    <div className={`${styles.wrapper} ${position}`}>
      <div className={`${styles.card} ${position}`}>
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
