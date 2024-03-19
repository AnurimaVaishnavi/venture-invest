import React, { useState } from 'react';
import { GripVerticalIcon, Trash2Icon } from 'lucide-react';
import { Button } from '../fields/Button';
import { Switch } from '../fields/Switch';
import { useFormPlaygroundStore } from '../store/formPlaygroundStore';
import {
    type AnimateLayoutChanges,
    useSortable,
    defaultAnimateLayoutChanges,
  } from '@dnd-kit/sortable';

export default function FormElementCard(props) {
  const [value, setValue] = useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const { id, label, type, required, options } = props;
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: id });

  const removeFormElement = useFormPlaygroundStore(state => state.removeFormElement);

  return (
    <article className="" ref={setNodeRef}>
      <div   className="flex cursor-move items-center rounded px-2" {...listeners}
          {...attributes}> 
        {/* Use GripVerticalIcon and Trash2Icon if needed */}
        <GripVerticalIcon  className="h-7 w-7 text-muted-foreground transition-colors duration-200" />
      </div>
      <div>
        <Trash2Icon onClick={() => removeFormElement(props.id)} />
      </div>
      <div>
        {/* Use textarea if type is "multi-line" */}
        {props.type === "multi-line" && (
          <textarea
            placeholder="Multi line text..."
            value={value}
            onChange={handleChange}
            className="border rounded p-2"
          />
        )}
        {/* Use other components (Button, Switch) if needed */}
        {/* {props.type === "button" && <Button />} */}
        {/* {props.type === "switch" && <Switch />} */}
      </div>
    </article>
  );
}
