import { useLocale } from '@hooks/useLocale';
import { FC, memo, useCallback, useState, useEffect } from 'react';
import {
  CustomTransferList,
  Item,
} from '@ui/CustomTransferList/CustomTransferList';
import styles from './groupSelector.module.css';
import stepperStyles from '@styles/ui/stepper.module.css';
import { IGroup } from '@custom-types/data/IGroup';
import { InputWrapper } from '@ui/basics';

const GroupSelector: FC<{
  form: any;
  groups: IGroup[];
  initialGroups: string[];
  field: string;
}> = ({ form, groups, initialGroups, field }) => {
  const [availableGroups, setAvailableGroups] = useState<Item[]>([]);
  const [selectedGroups, setSelectedGroups] = useState<Item[]>([]);
  const { locale } = useLocale();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
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
    setAvailableGroups(newAvailableGroups);
    setSelectedGroups(newSelectedGroups);
    setLoading(false);
  }, [groups, initialGroups]);

  const itemComponent = useCallback(
    (group: IGroup, handleSelect: any) => {
      return (
        <div
          className={styles.itemWrapper}
          onClick={() => handleSelect(group)}
          style={{ cursor: 'pointer' }}
        >
          {group.name}
        </div>
      );
    },
    []
  );

  return (
    <div>
      {!loading && (
        <InputWrapper {...form.getInputProps(field)}>
          <CustomTransferList
            defaultOptions={availableGroups}
            defaultChosen={selectedGroups}
            setUsed={(groups: Item[]) =>
              form.setFieldValue(
                field,
                groups.map((group) => group.spec)
              )
            }
            classNames={{ label: stepperStyles.label }}
            titles={[
              locale.ui.groupSelector.unselected,
              locale.ui.groupSelector.selected,
            ]}
            itemComponent={itemComponent}
          />
        </InputWrapper>
      )}
    </div>
  );
};

export default memo(GroupSelector);
