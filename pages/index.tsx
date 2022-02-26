import { DefaultLayout } from '@layouts/DefaultLayout';
import { ReactElement } from 'react';
import { cardList } from '@constants/CardList';
import TopContent from '@components/MainPage/TopContent/TopContent';
import { ProjectCard } from '@components/MainPage/ProjectCard/ProjectCard';

function IndexPage() {
  return (
    <>
      <TopContent />
      <div>
        {cardList.map((card, index) => {
          return (
            <ProjectCard
              key={index}
              left={index % 2 == 0}
              card={card}
            />
          );
        })}
      </div>
    </>
  );
}
IndexPage.getLayout = (page: ReactElement) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};
export default IndexPage;
