import React, {useReducer} from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";
import {v1} from 'uuid'
import {AddItemForm} from "./AddItemForm";
import {AppBar, Box, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodoListAC,
    todolistReducer
} from "./state/todolist-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";


export type FilterValuesType = 'all' | 'completed' | 'active'

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {

    const dispatch = useDispatch()
    const todolists = useSelector<AppRootState, Array<TodoListType>>(state => state.todolists)
    const tasks = useSelector<AppRootState, TasksStateType>(state => state.tasks)

    // const removeTask = (id: string, todolistId: string) => {
    //     dispatch(removeTaskAC(id, todolistId))
    // }
    // const addTask = (value: string, todolistId: string) => {
    //     dispatch(addTaskAC(value, todolistId))
    // }
    // const changeStatus = (taskId: string, isDone: boolean, todolistId: string) => {
    //     dispatch(changeTaskStatusAC(taskId, isDone, todolistId))
    // }
    // const changeTaskTitle = (taskId: string, newTitle: string, todolistId: string) => {
    //     dispatch(changeTaskTitleAC(taskId, newTitle, todolistId))
    // }

    const changeTodolistTitle = (id: string, newTitle: string) => {
        dispatch(changeTodolistTitleAC(id, newTitle))
    }
    const changeFilter = (value: FilterValuesType, todoListId: string) => {
        dispatch(changeTodolistFilterAC(todoListId, value))
    }
    // let removeTodolist = (todolistId: string) => {
    //     dispatch(removeTodoListAC(todolistId))
    // }

    function addTodoList(title: string) {
        dispatch(addTodolistAC(title))
    }

    return (
        <>
            <Box sx={{flexGrow: 1}}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{mr: 2}}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            Main
                        </Typography>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
            </Box>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={10}>
                    {
                        todolists.map(t => {

                            let tasksForTodoList = tasks[t.id]

                            if (t.filter === 'completed') {
                                tasksForTodoList = tasksForTodoList.filter((t: { isDone: any; }) => t.isDone)
                            }
                            if (t.filter === 'active') {
                                tasksForTodoList = tasksForTodoList.filter((t: { isDone: any; }) => !t.isDone)
                            }
                            return <Grid item>
                                <Paper style={{padding: '10px'}}>
                                    <TodoList key={t.id}
                                              id={t.id}
                                              title={t.title}
                                              task={tasksForTodoList}
                                              changeFilter={changeFilter}
                                              filter={t.filter}
                                              changeTodolistTitle={changeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </>
    );
}

export default AppWithRedux;