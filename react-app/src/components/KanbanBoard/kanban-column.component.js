import React from 'react';
import Task from "./kanban-task.component";
import { Droppable } from 'react-beautiful-dnd';
import { getListStyle } from '../../helpers/styling';

function Column({ column, tasks }) {

    return (
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <h3 className='font-bold text-lg mb-2'>{column.title}</h3>
            <Droppable droppableId={column.id}>
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        className="bg-white p-2 rounded-lg min-h-[200px]"
                        style={getListStyle(snapshot.isDraggingOver)}
                        {...provided.droppableProps}
                    >
                        {tasks.map((task, index) => (
                            <Task key={task.id} task={task} index={index} />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
}

export default Column;