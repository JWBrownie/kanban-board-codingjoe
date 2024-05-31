import React, { useEffect, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import Column from './kanban-column.component';
import { useMutation, useQuery } from '@apollo/client';
import { GET_TASKS, UPDATE_TASK_STATE } from '../../graphql/queries';

const initialData = {
    tasks: {},
    columns: {
        'column-1': { id: 'column-1', title: 'To do', taskIds: [] },
        'column-2': { id: 'column-2', title: 'In progress', taskIds: [] },
        'column-3': { id: 'column-3', title: 'Done', taskIds: [] }
    },
    columnOrder: ['column-1', 'column-2', 'column-3']
};

function KanbanBoard() {
    const [data, setData] = useState(initialData);
    const { loading, error, data: taskData} = useQuery(GET_TASKS);
    const [updateTaskState] = useMutation(UPDATE_TASK_STATE);

    useEffect(() => {
        if (!taskData || typeof(taskData) !== 'object') return;

        const tasks = taskData.tasks.reduce((acc, task) => {
            acc[task.id] = { id: task.id, content: task.content };
            return acc;
        }, {});

        const columns = {
            'column-1': {
                id: 'column-1',
                title: 'to do',
                taskIds: taskData.tasks.filter(task => task.state.toLowerCase() === 'to do').map(task => task.id)
            },
            'column-2': {
                id: 'column-2',
                title: 'In progress',
                taskIds: taskData.tasks.filter(task => task.state.toLowerCase() === 'in progress').map(task => task.id)
            },
            'column-3': {
                id: 'column-3',
                title: 'Done',
                taskIds: taskData.tasks.filter(task => task.state.toLowerCase() === 'done').map(task => task.id)
            }
        };

        const columnOrder = ['column-1', 'column-2', 'column-3']

        console.log('Tasks:', tasks);
        console.log('Columns:', columns);

        setData({ tasks, columns, columnOrder});

    }, [taskData]);

    const onDragEnd = (result) => {
        const { destination, source, draggableId } = result;

        if (!destination) {
            return;
        }

        if (destination.droppableId === source.droppableId && destination.index == source.index) {
            return;
        }

        const start = data.columns[source.droppableId];
        const finish = data.columns[destination.droppableId]

        if (start === finish) {
            const newTaskIds = Array.from(start.taskIds);
            newTaskIds.splice(source.index, 1);
            newTaskIds.splice(destination.index, 0, draggableId);

            const newColumn = {
                ...start,
                taskIds: newTaskIds
            };

            const newState = {
                ...data,
                columns: {
                    ...data.columns,
                    [newColumn.id]: newColumn
                }
            };

            setData(newState);
            return;
        }

        const startTaskIds = Array.from(start.taskIds);
        startTaskIds.splice(source.index, 1);
        const newStart = {
            ...start,
            taskIds: startTaskIds
        };

        const finishTaskIds = Array.from(finish.taskIds);
        finishTaskIds.splice(destination.index, 0, draggableId);

        const newFinish = {
            ...finish,
            taskIds: finishTaskIds
        };

        const newState = {
            ...data,
            columns: {
                ...data.columns,
                [newStart.id]: newStart,
                [newFinish.id]: newFinish
            }
        };

        const newTaskState = finish.title.toLowerCase();
        updateTaskState({ variables: { id: draggableId, state: newTaskState } });

        setData(newState);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className='flex justify-center p-8'>
            <DragDropContext onDragEnd={onDragEnd}>
                <div className='grid grid-cols-3 gap-4'>
                {data.columnOrder.map((columnId) => {
                    const column = data.columns[columnId];
                    const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);

                    return (
                        <Column key={column.id} column={column} tasks={tasks} />
                    );
                })}
                </div>
            </DragDropContext>
        </div>
    );
}

export default KanbanBoard;