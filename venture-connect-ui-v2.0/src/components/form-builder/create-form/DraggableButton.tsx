import { useDraggable } from '@dnd-kit/core';
import type { LucideIcon } from 'lucide-react';
// import  {Button} from '../fields/Button';
import Button from "react-bootstrap/Button";
export interface FormElementButtonProps {
    text: string;
    Icon: LucideIcon;
  };

  export const DraggingButton = ({
    text,
    Icon,
    className = '',
  }: FormElementButtonProps & { className?: string }) => (
    <Button
      variant="secondary"
      className={`w-full gap-3 transition-all duration-200 hover:shadow ${className}`}
    >
      <Icon className="h-[18px] w-[18px]" />
      <span>{text}</span>
    </Button>
  );
  
  export default function DraggableButton(props: FormElementButtonProps) {
    const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
      id: props.text.toLowerCase().replace(' ', '-'),
      data: { element: props },
    });
  
    return (
      <Button
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        className="flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded cursor-grab"
      >
        {props.Icon && <props.Icon className="w-5 h-5 mr-2" />}
        {props.text}
      </Button>
    );
  }

