import { ITournament } from '@custom-types/data/ITournament';
import { FC, memo } from 'react';
import Description from '@components/Tournament/Description/Description';

const Preview: FC<{ tournament: ITournament }> = ({ tournament }) => {
  return (
    <>
      <Description tournament={tournament} />
    </>
  );
};

export default memo(Preview);
