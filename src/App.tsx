import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";
import {v1} from 'uuid'

export type FilterValuesType = 'all' | 'completed' | 'active'

function App() {

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: 'html&css', isDone: true},
        {id: v1(), title: 'JS', isDone: false},
        {id: v1(), title: 'ReactJS', isDone: true},
        {id: v1(), title: 'TypeScript', isDone: false}
    ])

    const removeTask = (id: string) => {
        let filteredTasks = tasks.filter((t) => t.id !== id)
        setTasks(filteredTasks)
    }

    const addTask = (value: string) => {
        let newTask = {id: v1(), title: value, isDone: false}
        setTasks([newTask, ...tasks])
    }

    const [filter, setFilter] = useState<FilterValuesType>('all')

    const changeStatus = (taskId: string, isDone: boolean) => {
        let task = tasks.find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone
        }
        let copy = [...tasks]
        setTasks(copy)
    }

    const changeFilter = (value: FilterValuesType) => {
        setFilter(value)
    }

    let tasksForDoToList = tasks
    if (filter === 'completed') {
        tasksForDoToList = tasks.filter(t => t.isDone)
    }
    if (filter === 'active') {
        tasksForDoToList = tasks.filter(t => !t.isDone)
    }

    return (
        <div className="App">
            <TodoList title={'Hello'}
                      task={tasksForDoToList}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      changeTaskStatus={changeStatus}
                      filter={filter}
            />
        </div>
    );
}

export default App;
