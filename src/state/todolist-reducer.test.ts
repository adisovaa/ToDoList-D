import {v1} from "uuid";
import {FilterValuesType, TodoListType} from "../App";
import {todolistReducer} from "./todolist-reducer";

test('correct todolist should be removed', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: 'JS', filter: 'active'},
        {id: todolistId2, title: 'TS', filter: 'completed'}
    ]

    const endState = todolistReducer(startState, {
        type: 'REMOVE-TODOLIST',
        id: todolistId1
    })

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

    const endState = todolistReducer(startState, {
        type: 'ADD-TODOLIST',
        title: newTodolistTitle
    })

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

    const action = {
        type: 'CHANGE-TODOLIST-TITLE',
        id: todolistId2,
        title: newTodolistTitle
    }

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

    const action = {
        type: 'CHANGE-TODOLIST-FILTER',
        id: todolistId2,
        filter: newFilter
    }

    const endState = todolistReducer(startState, action)

    expect(endState[0].filter).toBe('active')
    expect(endState[1].filter).toBe(newFilter)
})



