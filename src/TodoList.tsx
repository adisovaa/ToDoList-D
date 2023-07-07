import React, {ChangeEvent} from 'react';
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {addTaskAC, changeTaskStatusAC, removeTaskAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    task: Array<TaskType>
    changeFilter: (value: FilterValuesType, todoListId: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
}

export const TodoList = React.memo((props: PropsType) => {
    const tasks = useSelector<AppRootState, Array<TaskType>>(state => state.tasks[props.id])
    const dispatch = useDispatch()

    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }
    const changeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(newTitle, props.id)
    }
    const onAllClickHandler = () => props.changeFilter('all', props.id)
    const onActiveClickHandler = () => props.changeFilter('active', props.id)
    const onCompletedClickHandler = () => props.changeFilter('active', props.id)

    const tasksForTodoList = props.task

    if (props.filter === 'completed') {
        tasksForTodoList = props.task.filter(t => !t.isDone)
    }
    if (props.filter === 'active') {
        tasksForTodoList = props.task.filter(t => t.isDone)
    }

    return (
        <div>
            <h3>
                <EditableSpan oldTitle={props.title} onChange={changeTodolistTitle}/>
                <IconButton onClick={removeTodolist}>
                    <DeleteIcon/>
                </IconButton>
            </h3>
            <AddItemForm addItem={(title) => {
                dispatch(addTaskAC(title, props.id))
            }}/>
            <ul>
                {
                    props.task.map((t) => {
                        const onRemoveHandler = () => dispatch(removeTaskAC(t.id, props.id))
                        const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            let newIsDoneValue = e.currentTarget.checked
                            dispatch(changeTaskStatusAC(t.id, newIsDoneValue, props.id))
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
})
