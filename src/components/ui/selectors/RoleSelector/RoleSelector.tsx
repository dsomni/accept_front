import { useLocale } from '@hooks/useLocale';
import { FC, memo, useCallback, useMemo } from 'react';
import {
  CustomTransferList,
  Item,
} from '@ui/CustomTransferList/CustomTransferList';
import styles from './roleSelector.module.css';
import { InputWrapper } from '@ui/basics';
import { IRole } from '@custom-types/data/atomic';
import { capitalize } from '@utils/capitalize';
import inputStyles from '@styles/ui/input.module.css';

const RoleSelector: FC<{
  form: any;
  roles: IRole[];
  initialRoles: number[];
  classNames?: any;
  field: string;
  shrink?: boolean;
}> = ({ form, roles, initialRoles, classNames, field, shrink }) => {
  const { locale } = useLocale();

  const [availableRole, selectedRole] = useMemo(() => {
    let newAvailableRole = [];
    let newSelectedRole = [];

    for (let i = 0; i < roles.length; i++) {
      const role = { ...roles[i], label: roles[i].name };
      if (initialRoles.includes(role.spec)) {
        newSelectedRole.push(role);
      } else {
        newAvailableRole.push(role);
      }
    }

    return [newAvailableRole, newSelectedRole];
  }, [roles, initialRoles]);

  const itemComponent = useCallback(
    (role: IRole, handleSelect: any) => {
      return (
        <div
          className={`${styles.itemWrapper} ${
            shrink ? inputStyles.shrink : ''
          }`}
          onClick={() => handleSelect(role)}
          style={{ cursor: 'pointer' }}
        >
          {capitalize(role.name)}
        </div>
      );
    },
    [shrink]
  );

  const setUsed = useCallback(
    (roles: Item[]) =>
      form.setFieldValue(
        field,
        roles.map((role) => role.spec)
      ),
    [form.setFieldValue] // eslint-disable-line
  );

  return (
    <div>
      <InputWrapper shrink={shrink} {...form.getInputProps(field)}>
        <CustomTransferList
          defaultOptions={availableRole}
          defaultChosen={selectedRole}
          setUsed={setUsed}
          classNames={classNames || {}}
          titles={[
            locale.ui.roleSelector.unselected,
            locale.ui.roleSelector.selected,
          ]}
          itemComponent={itemComponent}
        />
      </InputWrapper>
    </div>
  );
};

export default memo(RoleSelector);
