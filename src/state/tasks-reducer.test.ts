import {TasksStateType} from "../App";
import {removeTaskAC, tasksReducer} from "./tasks-reducer";

test('correct task should be deleted from correct array', () => {
    const startState: TasksStateType = {
        'todolistId1': [
            {id: '1', title: 'html&css', isDone: true},
            {id: '2', title: 'JS', isDone: false},
            {id: '3', title: 'ReactJS', isDone: true},
        ],
        'todolistId2': [
            {id: '1', title: 'redux', isDone: true},
            {id: '2', title: 'git', isDone: false},
            {id: '3', title: 'node', isDone: true},
        ]
    }

    const action = removeTaskAC('2', 'todolistId2')
    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(2)
    expect(endState['todolistId2'].every(t => t.id != '2')).toBeTruthy()
})

test('correct task should be deleted from correct array', () => {
    const startState: TasksStateType = {
        'todolistId1': [
            {id: '1', title: 'html&css', isDone: true},
            {id: '2', title: 'JS', isDone: false},
            {id: '3', title: 'ReactJS', isDone: true},
        ],
        'todolistId2': [
            {id: '1', title: 'redux', isDone: true},
            {id: '2', title: 'git', isDone: false},
            {id: '3', title: 'node', isDone: true},
        ]
    }

    const action = addTaskAC('2', 'todolistId2')
    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe()
    expect(endState['todolistId2'].length).toBe()
    expect(endState['todolistId2'].every(t => t.id != '2')).toBeTruthy()
})