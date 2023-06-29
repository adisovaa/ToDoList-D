import {combineReducers, createStore} from "redux";
import {tasksReducer} from "./tasks-reducer";
import {todolistReducer} from "./todolist-reducer";
import {TasksStateType, TodoListType} from "../App";

const rootReducer = combineReducers({
    todolists: todolistReducer,
    tasks: tasksReducer
})

// type AppRootState = {
//     todolists: Array<TodoListType>
//     tasks: TasksStateType
// }

type AppRootState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer)


// @ts-ignore
window.store = store
