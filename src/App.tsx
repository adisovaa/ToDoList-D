import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";
import {v1} from 'uuid'

export type FilterValuesType = 'all' | 'completed' | 'active'

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {
    const [filter, setFilter] = useState<FilterValuesType>('all')
    const removeTask = (id: string, todolistId: string) => {
        let tasks = tasksObj[todolistId]
        let filteredTasks = tasks.filter(t => t.id != id)
        tasksObj[todolistId] = filteredTasks
        setTasks({...tasksObj})
    }

    const addTask = (value: string, todolistId: string) => {
        let task = {id: v1(), title: value, isDone: false}
        let tasks = tasksObj[todolistId]
        let newTasks = [task, ...tasks]
        tasksObj[todolistId] = newTasks
        setTasks({...tasksObj})
    }

    const changeStatus = (taskId: string, isDone: boolean, todolistId: string) => {
        let tasks = tasksObj[todolistId]
        let task = tasks.find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone
            setTasks({...tasksObj})
        }
    }

    const changeFilter = (value: FilterValuesType, todoListId: string) => {
        let todolist = todolists.find(t => t.id === todoListId)
        if (todolist) {
            todolist.filter = value
            setTodoLists([...todolists])
        }
    }

    let todolistId1 = v1()
    let todolistId2 = v1()

    let [todolists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todolistId1, title: 'JS', filter: 'active'},
        {id: todolistId2, title: 'TS', filter: 'completed'}
    ])

    let removeTodolist = (todolistId: string) => {
        let filteredTodolist = todolists.filter(t => t.id !== todolistId)
        setTodoLists(filteredTodolist)

        delete tasksObj[todolistId]
        setTasks({...tasksObj})
    }

    let [tasksObj, setTasks] = useState({
        [todolistId1]: [
            {id: v1(), title: 'html&css', isDone: true},
            {id: v1(), title: 'JS', isDone: false},
            {id: v1(), title: 'ReactJS', isDone: true},
            {id: v1(), title: 'TypeScript', isDone: false}
        ],
        [todolistId2]: [
            {id: v1(), title: 'redux', isDone: true},
            {id: v1(), title: 'git', isDone: false},
            {id: v1(), title: 'node', isDone: true},
            {id: v1(), title: 'webpack', isDone: false}
        ],
    })

    return (
        <div className="App">
            {
                todolists.map(t => {

                    let tasksForTodoList = tasksObj[t.id]

                    if (t.filter === 'completed') {
                        tasksForTodoList = tasksForTodoList.filter(t => t.isDone)
                    }
                    if (t.filter === 'active') {
                        tasksForTodoList = tasksForTodoList.filter(t => !t.isDone)
                    }
                    return <TodoList key={t.id}
                                     id={t.id}
                                     title={t.title}
                                     task={tasksForTodoList}
                                     removeTask={removeTask}
                                     changeFilter={changeFilter}
                                     addTask={addTask}
                                     changeTaskStatus={changeStatus}
                                     filter={t.filter}
                                     removeTodolist={removeTodolist}
                    />
                })
            }
        </div>
    );
}

export default App;
