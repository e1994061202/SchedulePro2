import React from 'react';
import { Draggable, DraggableProps } from 'react-beautiful-dnd';

interface DraggableWrapperProps extends Omit<DraggableProps, 'children'> {
  children: (provided: any) => React.ReactNode;
  className?: string;
}

export const DraggableWrapper: React.FC<DraggableWrapperProps> = ({
  children,
  className = "border rounded p-3 bg-white shadow-sm hover:shadow-md transition-shadow",
  ...props
}) => {
  return (
    <Draggable {...props}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={className}
        >
          {children(provided)}
        </div>
      )}
    </Draggable>
  );
}