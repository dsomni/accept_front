import { useLocale } from '@hooks/useLocale';
import { FC, memo, useCallback, useMemo } from 'react';
import {
  CustomTransferList,
  Item,
} from '@ui/CustomTransferList/CustomTransferList';
import styles from './groupSelector.module.css';
import { IGroup } from '@custom-types/data/IGroup';
import { InputWrapper } from '@ui/basics';
import inputStyles from '@styles/ui/input.module.css';

const GroupSelector: FC<{
  form: any;
  groups: IGroup[];
  initialGroups: string[];
  classNames?: any;
  field: string;
  shrink?: boolean;
}> = ({ form, groups, initialGroups, field, classNames, shrink }) => {
  const { locale } = useLocale();

  const [availableGroups, selectedGroups] = useMemo(() => {
    let newAvailableGroups = [];
    let newSelectedGroups = [];

    for (let i = 0; i < groups.length; i++) {
      const group = { ...groups[i], label: groups[i].name };
      if (initialGroups.includes(group.spec)) {
        newSelectedGroups.push(group);
      } else {
        newAvailableGroups.push(group);
      }
    }

    return [newAvailableGroups, newSelectedGroups];
  }, [groups, initialGroups]);

  const itemComponent = useCallback(
    (group: IGroup, handleSelect: any) => {
      return (
        <div
          className={`${styles.itemWrapper} ${
            shrink ? inputStyles.shrink : ''
          }`}
          onClick={() => handleSelect(group)}
          style={{ cursor: 'pointer' }}
        >
          {group.name}
        </div>
      );
    },
    [shrink]
  );

  const setUsed = useCallback(
    (groups: Item[]) =>
      form.setFieldValue(
        field,
        groups.map((group) => group.spec)
      ),
    [form.setFieldValue] // eslint-disable-line
  );

  return (
    <div>
      <InputWrapper shrink={shrink} {...form.getInputProps(field)}>
        <CustomTransferList
          defaultOptions={availableGroups}
          defaultChosen={selectedGroups}
          setUsed={setUsed}
          classNames={{ ...classNames }}
          titles={[
            locale.ui.groupSelector.unselected,
            locale.ui.groupSelector.selected,
          ]}
          itemComponent={itemComponent}
        />
      </InputWrapper>
    </div>
  );
};

export default memo(GroupSelector);
