import { Item } from '@ui/CustomTransferList/CustomTransferList';
import { reorderList } from '@utils/reorderList';
import { FC, useEffect, useState } from 'react';
import {
  DragDropContext,
  Droppable,
  Draggable,
} from 'react-beautiful-dnd';
import { GridDots } from 'tabler-icons-react';
import { callback } from '@custom-types/ui/atomic';

export const CustomDraggableList: FC<{
  values: Item[];
  setValues: callback<Item[], void>;
  classNames?: any;
}> = ({ values, setValues, classNames }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div className={classNames?.wrapper}>
      {loaded && (
        <DragDropContext
          onDragEnd={({ destination, source }) => {
            if (!destination) return;
            setValues(
              reorderList(values, source.index, destination.index)
            );
          }}
        >
          <Droppable droppableId="dnd-list" direction="vertical">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {values.map((task: Item, index: number) => (
                  <Draggable
                    key={index}
                    draggableId={index.toString()}
                    index={index}
                  >
                    {(provider, snapshot) => (
                      <div
                        ref={provider.innerRef}
                        className={classNames?.itemWrapper}
                        {...provider.draggableProps}
                        {...provider.dragHandleProps}
                      >
                        <div className={classNames?.dragButton}>
                          <GridDots width={20} height={20} />
                        </div>
                        <div className={classNames?.label}>
                          {task.label}
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </div>
  );
};
