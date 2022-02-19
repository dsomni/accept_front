import { useUser } from '@hooks/useUser';
import { DefaultLayout } from '@layouts/DefaultLayout';
import { ReactElement } from 'react';
import { cardList } from '@constants/CardList';
import TopContent from '@components/MainPage/TopContent/TopContent';

function IndexPage() {
  return (
    <div>
      <TopContent />
      <div>
        {/* {cardList.map((card, index) => {
          <ProjectCard left={index % 2} card={card} />;
        })} */}
      </div>
    </div>
  );
}
IndexPage.getLayout = (page: ReactElement) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};
export default IndexPage;
