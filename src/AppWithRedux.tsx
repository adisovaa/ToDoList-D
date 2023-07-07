import React, {useCallback} from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Box, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodoListAC,
} from "./state/todolist-reducer";
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

export const AppWithRedux = () => {

    const dispatch = useDispatch()
    const todolists = useSelector<AppRootState, Array<TodoListType>>(state => state.todolists)
    const tasks = useSelector<AppRootState, TasksStateType>(state => state.tasks)

    const changeTodolistTitle = useCallback((id: string, newTitle: string) => {
        dispatch(changeTodolistTitleAC(id, newTitle))
    }, [])

    const changeFilter = useCallback((value: FilterValuesType, todoListId: string) => {
        dispatch(changeTodolistFilterAC(todoListId, value))
    }, [])

    const removeTodolist = useCallback((todolistId: string) => {
        dispatch(removeTodoListAC(todolistId))
    },[])

    const addTodoList = useCallback((title: string) => {
        dispatch(addTodolistAC(title))
    }, [])

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
                                              removeTodolist={removeTodolist}
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