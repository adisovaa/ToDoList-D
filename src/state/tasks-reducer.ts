import {FilterValuesType, TasksStateType, TodoListType} from "../App";
import {v1} from "uuid";


type ActionsTypes = RemoveTasksActionType | addTaskActionType

export type RemoveTasksActionType = {
    type: 'REMOVE-TASK'
    taskId: string
    todolistId: string
}
export type addTaskActionType = {
    type: 'ADD-TASK'
    value: string
    todolistId: string
}

export const tasksReducer = (state: TasksStateType, action: ActionsTypes): Array<TasksStateType> => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            const tasks = state[action.todolistId]
            const filteredTasks = tasks.filter(t => t.id !== action.taskId)
            stateCopy[action.todolistId] = filteredTasks
            return stateCopy;
        }
        case 'ADD-TASK': {

        }
        default:
            throw new Error('Error type')
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTasksActionType => {
    return {type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId}
}

export const addTaskAC = (value: string, todolistId: string): addTaskActionType => {
    return {type: 'ADD-TASK', value: value, todolistId: todolistId}
}