import { useLocale } from '@hooks/useLocale';
import { FC, memo, useCallback, useState, useEffect } from 'react';
import {
  CustomTransferList,
  Item,
} from '@ui/CustomTransferList/CustomTransferList';
import styles from './roleSelector.module.css';
import stepperStyles from '@styles/ui/stepper.module.css';
import { InputWrapper } from '@ui/basics';
import { IRole } from '@custom-types/data/atomic';

const RoleSelector: FC<{
  form: any;
  roles: IRole[];
  initialRoles: IRole[];
  field: string;
}> = ({ form, roles, initialRoles, field }) => {
  const [availableRole, setAvailableRole] = useState<Item[]>([]);
  const [selectedRole, setSelectedRole] = useState<Item[]>([]);
  const { locale } = useLocale();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    let newAvailableRole = [];
    let newSelectedRole = [];

    const initial = initialRoles.map((role) => role.spec);

    for (let i = 0; i < roles.length; i++) {
      const role = { ...roles[i], label: roles[i].name };
      if (initial.includes(role.spec)) {
        newSelectedRole.push(role);
      } else {
        newAvailableRole.push(role);
      }
    }
    setAvailableRole(newAvailableRole);
    setSelectedRole(newSelectedRole);
    setLoading(false);
  }, [roles, initialRoles]);

  const itemComponent = useCallback(
    (role: IRole, handleSelect: any) => {
      return (
        <div
          className={styles.itemWrapper}
          onClick={() => handleSelect(role)}
          style={{ cursor: 'pointer' }}
        >
          {role.name}
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
            defaultOptions={availableRole}
            defaultChosen={selectedRole}
            setUsed={(roles: Item[]) =>
              form.setFieldValue(
                field,
                roles.map((role) => role.spec)
              )
            }
            classNames={{ label: stepperStyles.label }}
            titles={[
              locale.ui.roleSelector.unselected,
              locale.ui.roleSelector.selected,
            ]}
            itemComponent={itemComponent}
          />
        </InputWrapper>
      )}
    </div>
  );
};

export default memo(RoleSelector);
