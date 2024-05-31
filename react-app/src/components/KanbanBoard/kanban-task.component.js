import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { getItemStyle } from '../../helpers/styling';

function Task({ task, index }) {
    return (
        <Draggable key={task.id} draggableId={task.id} index={index}>
            {(provided, snapshot) => (
                <div>
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="bg-blue-500 text-white p-2 rounded-lg mb-2 shadow-md"
                        style={getItemStyle(
                            provided.draggableProps.style,
                            snapshot.isDragging
                        )}
                    >
                        {task.content}
                    </div>
                    {provided.placeholder}
                </div>
            )}
        </Draggable>
    );
}

export default Task;