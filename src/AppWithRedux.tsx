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
    let todolistId1 = v1()
    let todolistId2 = v1()

    let [todolists, dispatchToTodoListsReducer] = useReducer(todolistReducer, [
        {id: todolistId1, title: 'JS', filter: 'active'},
        {id: todolistId2, title: 'TS', filter: 'completed'}
    ])

    // @ts-ignore
    let [tasksObj, dispatchToTasksReducer] = useReducer(tasksReducer, {
        [todolistId1]: [
            {id: v1(), title: 'html&css', isDone: true},
            {id: v1(), title: 'JS', isDone: false}
        ],
        [todolistId2]: [
            {id: v1(), title: 'redux', isDone: true},
            {id: v1(), title: 'git', isDone: false}
        ],
    })
    
    const removeTask = (id: string, todolistId: string) => {
        const action = removeTaskAC(id, todolistId)
        dispatchToTasksReducer(action)
    }
    const changeTodolistTitle = (id: string, newTitle: string) => {
        const action = changeTodolistTitleAC(id, newTitle)
        dispatchToTodoListsReducer(action)
    }
    const addTask = (value: string, todolistId: string) => {
        const action = addTaskAC(value, todolistId)
        dispatchToTasksReducer(action)
    }
    const changeStatus = (taskId: string, isDone: boolean, todolistId: string) => {
        const action = changeTaskStatusAC(taskId, isDone, todolistId)
        dispatchToTasksReducer(action)
    }
    const changeTaskTitle = (taskId: string, newTitle: string, todolistId: string) => {
        const action = changeTaskTitleAC(taskId, newTitle, todolistId)
        dispatchToTasksReducer(action)
    }
    const changeFilter = (value: FilterValuesType, todoListId: string) => {
        const action = changeTodolistFilterAC(todoListId, value)
        dispatchToTodoListsReducer(action)
    }
    let removeTodolist = (todolistId: string) => {
        const action = removeTodoListAC(todolistId)
        dispatchToTodoListsReducer(action)
        dispatchToTasksReducer(action)
    }

    function addTodoList(title: string) {
        const action = addTodolistAC(title)
        dispatchToTodoListsReducer(action)
        dispatchToTasksReducer(action)
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

                            let tasksForTodoList = tasksObj[t.id]

                            if (t.filter === 'completed') {
                                tasksForTodoList = tasksForTodoList.filter(t => t.isDone)
                            }
                            if (t.filter === 'active') {
                                tasksForTodoList = tasksForTodoList.filter(t => !t.isDone)
                            }
                            return <Grid item>
                                <Paper style={{padding: '10px'}}>
                                    <TodoList key={t.id}
                                              id={t.id}
                                              title={t.title}
                                              task={tasksForTodoList}
                                              removeTask={removeTask}
                                              changeFilter={changeFilter}
                                              addTask={addTask}
                                              changeTaskStatus={changeStatus}
                                              changeTaskTitle={changeTaskTitle}
                                              filter={t.filter}
                                              removeTodolist={removeTodolist}
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