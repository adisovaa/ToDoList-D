import {TasksStateType} from "../App";
import {v1} from "uuid";
import {
    AddTodolistActionType,
    RemoveTodolistActionType,
    todolistId1,
    todolistId2
} from "./todolist-reducer";


type ActionsTypes = RemoveTasksActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType


export type RemoveTasksActionType = {
    type: 'REMOVE-TASK'
    taskId: string
    todolistId: string
}
export type AddTaskActionType = {
    type: 'ADD-TASK'
    value: string
    todolistId: string
}
export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    taskId: string
    isDone: boolean
    todolistId: string
}
export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    taskId: string
    title: string
    todolistId: string
}


const initialState = [{
    [todolistId1]: [
        {id: v1(), title: 'html&css', isDone: true},
        {id: v1(), title: 'JS', isDone: false}
    ],
    [todolistId2]: [
        {id: v1(), title: 'redux', isDone: true},
        {id: v1(), title: 'git', isDone: false}
    ],
}]

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsTypes): Array<TasksStateType> => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            const tasks = state[action.todolistId]
            const filteredTasks = tasks.filter(t => t.id !== action.taskId)
            stateCopy[action.todolistId] = filteredTasks
            return stateCopy;
        }
        case 'ADD-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId]
            const newTask = {id: v1(), title: action.value, isDone: false}
            const newTasks = [newTask, ...tasks]
            stateCopy[action.todolistId] = newTasks
            return stateCopy
        }
        case 'CHANGE-TASK-STATUS': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId]
            stateCopy[action.todolistId] = tasks.map(t => t.id === action.taskId ? {...t, isDone: action.isDone} : t)
            return stateCopy
        }
        case 'CHANGE-TASK-TITLE': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId]
            const taskTitle = tasks.find(t => t.id === action.taskId)
            if (taskTitle) {
                taskTitle.title = action.title
            }
            return stateCopy
        }
        case 'ADD-TODOLIST': {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = []
            return stateCopy
        }
        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }
        default:
            throw new Error('Error type')
    }
}


export const removeTaskAC = (taskId: string, todolistId: string): RemoveTasksActionType => {
    return {type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId}
}
export const addTaskAC = (value: string, todolistId: string): AddTaskActionType => {
    return {type: 'ADD-TASK', value: value, todolistId: todolistId}
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string) => {
    return {type: 'CHANGE-TASK-STATUS' as const, taskId: taskId, isDone: isDone, todolistId: todolistId}
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) => {
    return {type: 'CHANGE-TASK-TITLE' as const, taskId: taskId, title: title, todolistId: todolistId}
}





