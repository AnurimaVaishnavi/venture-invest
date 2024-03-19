import React from 'react';
import {
  DndContext,
  type DragEndEvent,
  useDroppable,
  useSensor,
  useSensors,
  MeasuringStrategy,
  closestCenter,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useFormPlaygroundStore } from '../store/formPlaygroundStore';
import { useRef } from 'react';
import { KeyboardSensor, PointerSensor } from '@dnd-kit/core';
import FormElementCard from './FormElementCard';
import { restrictToParentElement } from '@dnd-kit/modifiers';

export default function FormPlayground() {
  const { setNodeRef,isOver } = useDroppable({
    id: 'droppable',
  });
  const formElements = useFormPlaygroundStore(state => state.formElements);
  const moveFormElement = useFormPlaygroundStore(
    state => state.moveFormElement,
  );
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  return (
    <DndContext
      sensors={sensors}
      modifiers={[restrictToParentElement]}
      onDragEnd={handleDragEnd}
      measuring={{ droppable: { strategy: MeasuringStrategy.Always } }}
      collisionDetection={closestCenter}>
      <SortableContext items={formElements}
      strategy={verticalListSortingStrategy}>
        <section ref={setNodeRef}
        className={`flex-grow rounded-lg border-2 border-dashed bg-muted/25 ${
            isOver ? 'border-muted-foreground' : 'border-slate-300'
          }`}>
          {formElements.length === 0 ? (
            <p
            className={`h-[calc(100vh-120px)] flex h-full items-center justify-center font-medium ${
              isOver ? 'text-slate-700' : 'text-muted-foreground'
            }`}
          >
            {isOver
              ? 'Drop the element here ...'
              : 'Drag a element from the right to this area'}
          </p>
          ) : (
            <div className="overflow-auto h-[calc(100vh-120px)] space-y-5 py-5 pl-5 pr-5">
            {formElements.map(element => (
              <FormElementCard {...element} />
            ))}
          </div>
          )}
        </section>
      </SortableContext>
    </DndContext>
  );

  function handleDragEnd({ active, over }: DragEndEvent) {
    if (!over) return;
    if (active.id !== over.id) {
      const oldIndex = active.data.current?.sortable.index as number;
      const newIndex = over.data.current?.sortable.index as number;
      moveFormElement(oldIndex, newIndex);
    }
  }
 
}

