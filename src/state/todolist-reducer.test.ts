import {v1} from "uuid";
import {FilterValuesType, TodoListType} from "../App";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodoListAC,
    todolistReducer
} from "./todolist-reducer";

test('correct todolist should be removed', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: 'JS', filter: 'active'},
        {id: todolistId2, title: 'TS', filter: 'completed'}
    ]

    const endState = todolistReducer(startState, removeTodoListAC(todolistId1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be added', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let newTodolistTitle = 'Hello World!'

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: 'JS', filter: 'active'},
        {id: todolistId2, title: 'TS', filter: 'completed'}
    ]

    const endState = todolistReducer(startState, addTodolistAC(newTodolistTitle))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(newTodolistTitle)
    expect(endState[2].filter).toBe('all')
})

test('correct todolist should change the name', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let newTodolistTitle = 'Hello World!'

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: 'Hello Siri', filter: 'active'},
        {id: todolistId2, title: 'TS', filter: 'completed'}
    ]

    const action = changeTodolistTitleAC(todolistId2, newTodolistTitle)

    const endState = todolistReducer(startState, action)

    expect(endState[0].title).toBe('Hello Siri')
    expect(endState[1].title).toBe(newTodolistTitle)
})

test('correct filter of todolist should be changed', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let newFilter: FilterValuesType = 'completed'

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: 'Hello Siri', filter: 'active'},
        {id: todolistId2, title: 'TS', filter: 'completed'}
    ]

    const action = changeTodolistFilterAC(todolistId2, newFilter)

    const endState = todolistReducer(startState, action)

    expect(endState[0].filter).toBe('active')
    expect(endState[1].filter).toBe(newFilter)
})

