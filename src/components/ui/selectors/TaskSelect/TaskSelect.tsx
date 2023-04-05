import React, { FC, memo, useCallback, useMemo } from 'react';
import { Select } from '@ui/basics';
import { ITaskBaseInfo } from '@custom-types/data/ITask';

interface ItemProps extends React.ComponentPropsWithoutRef<'div'> {
  image: string;
  label: string;
  role: string;
  value: string;
}

const TaskSelect: FC<{
  label: string;
  placeholder: string;
  nothingFound: string;
  tasks: ITaskBaseInfo[];
  select: (_: ITaskBaseInfo | undefined) => void;
  additionalProps?: any;
}> = ({
  label,
  placeholder,
  tasks,
  nothingFound,
  select,
  additionalProps,
}) => {
  const data = useMemo(
    () =>
      tasks.map(
        (item) =>
          ({
            label: item.title,
            value: item.spec,
          } as ItemProps)
      ),
    [tasks]
  );

  const onSelect = useCallback(
    (spec: string | null) => {
      if (!spec) {
        select(undefined);
        return;
      }
      const taskIndex = tasks.findIndex((item) => item.spec === spec);
      if (taskIndex >= 0) {
        select(tasks[taskIndex]);
      }
    },
    [select, tasks]
  );

  return (
    <>
      <Select
        searchable
        data={data}
        label={label}
        placeholder={placeholder}
        clearable
        maxDropdownHeight={400}
        nothingFound={nothingFound}
        filter={(value, item) =>
          item.label
            ?.toLowerCase()
            .includes(value.toLowerCase().trim()) ||
          item.value
            .toLowerCase()
            .includes(value.toLowerCase().trim())
        }
        {...additionalProps}
        // onSelect={(event) => onSelect(event.currentTarget.value)}
        onChange={(spec) => {
          onSelect(spec);
          additionalProps?.onChange(spec);
        }}
      />
    </>
  );
};

export default memo(TaskSelect);
