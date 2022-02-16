import { FC, memo } from 'react';
import { CustomDropdown } from './CustomDropdown/CustomDropdown';
import IHeaderLink from '@custom-types/IHeaderLink';
import { HeaderLink } from './HeaderLink';

const Links: FC<{
  links: IHeaderLink[];
  dropdownLinks: IHeaderLink[];
  dropdownLabel: string;
  current: string;
}> = ({ links, dropdownLinks, dropdownLabel, current }) => {
  return (
    <div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '32px',
          lineHeight: '19px',
        }}
      >
        {links.map((link, index) => (
          <HeaderLink link={link} key={index} current={current} />
        ))}
        <CustomDropdown
          links={dropdownLinks}
          label={dropdownLabel}
          current={current}
        />
      </div>
    </div>
  );
};

export default memo(Links);
