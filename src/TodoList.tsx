import React, {ChangeEvent} from 'react';
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    task: Array<TaskType>
    removeTask: (id: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todoListId: string) => void
    addTask: (value: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    // changeTodoList: (id: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
}

export const TodoList = (props: PropsType) => {
    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }
    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }
    const changeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle)
    }
    const onAllClickHandler = () => props.changeFilter('all', props.id)
    const onActiveClickHandler = () => props.changeFilter('active', props.id)
    const onCompletedClickHandler = () => props.changeFilter('active', props.id)


    return (
        <div>
            <h3>
                <EditableSpan oldTitle={props.title} onChange={changeTodolistTitle}/>
                <IconButton size="large" onClick={removeTodolist}>
                    <DeleteIcon/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul>
                {
                    props.task.map((t) => {
                        const onRemoveHandler = () => props.removeTask(t.id, props.id)
                        const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            let newIsDoneValue = e.currentTarget.checked
                            props.changeTaskStatus(t.id, newIsDoneValue, props.id)
                        }
                        const onChangeTitleHandler = (newValue: string) => {
                            props.changeTaskTitle(t.id, newValue, props.id)
                        }

                        return <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                            <Checkbox checked={t.isDone}
                                      onChange={onChangeStatusHandler}
                            />
                            <EditableSpan oldTitle={t.title} onChange={onChangeTitleHandler}/>
                            <IconButton onClick={onRemoveHandler}>
                                <DeleteIcon/>
                            </IconButton>
                        </li>
                    })
                }
            </ul>
            <div>
                <Button variant={props.filter === 'all' ? 'contained' : 'text'}
                        onClick={onAllClickHandler}>All
                </Button>
                <Button variant={props.filter === 'all' ? 'contained' : 'text'}
                        color={'primary'} onClick={onActiveClickHandler}>Active
                </Button>
                <Button variant={props.filter === 'all' ? 'contained' : 'text'}
                        color={'secondary'} onClick={onCompletedClickHandler}>Completed
                </Button>
            </div>
        </div>
    );
};

