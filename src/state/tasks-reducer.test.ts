import {TasksStateType} from "../App";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./tasks-reducer";

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

    const action = addTaskAC('juice', 'todolistId2')
    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(4)
    expect(endState['todolistId2'][0].id).toBeDefined()
    expect(endState['todolistId2'][0].title).toBe('juice')
    expect(endState['todolistId2'][0].isDone).toBe(false)
})

test('correct task should be deleted from correct array', () => {
    const startState: TasksStateType = {
        'todolistId1': [
            {id: '1', title: 'html&css', isDone: false},
            {id: '2', title: 'JS', isDone: false},
            {id: '3', title: 'ReactJS', isDone: true},
        ],
        'todolistId2': [
            {id: '1', title: 'redux', isDone: true},
            {id: '2', title: 'git', isDone: false},
            {id: '3', title: 'node', isDone: true},
        ]
    }

    const action = changeTaskStatusAC('2', false, 'todolistId2')
    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'][1].isDone).toBeFalsy()
    expect(endState['todolistId2'][1].isDone).toBeTruthy()
})

test('title of specified task should be changed', () => {
    const startState: TasksStateType = {
        'todolistId1': [
            {id: '1', title: 'html&css', isDone: false},
            {id: '2', title: 'JS', isDone: false},
            {id: '3', title: 'ReactJS', isDone: true},
        ],
        'todolistId2': [
            {id: '1', title: 'redux', isDone: true},
            {id: '2', title: 'git', isDone: false},
            {id: '3', title: 'node', isDone: true},
        ]
    }

    const action = changeTaskTitleAC('2', 'Milky way', 'todolistId2')
    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'][1].title).toBe('Milky way');
    expect(endState['todolistId1'][0].title).toBe('html&css')
})


