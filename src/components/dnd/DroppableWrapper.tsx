import React from 'react';
import { Droppable, DroppableProps } from 'react-beautiful-dnd';

interface DroppableWrapperProps extends Omit<DroppableProps, 'children'> {
  children: (provided: any) => React.ReactNode;
  className?: string;
}

export const DroppableWrapper: React.FC<DroppableWrapperProps> = ({ 
  children, 
  className = "space-y-3",
  ...props 
}) => {
  return (
    <Droppable {...props}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={className}
        >
          {children(provided)}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}