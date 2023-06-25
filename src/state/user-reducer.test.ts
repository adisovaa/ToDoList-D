import {userReducer} from "./user-reducer";

test('user reducer should increment only age', () => {
    const startState = {age: 23, childrenCount: 2, name: 'Lorem'}

    const endState = userReducer(startState, {type: 'INCREMENT-AGE'})

    expect(endState.age).toBe(24)
})

test('user reducer should increment only children count', () => {
    const startState = {age: 23, childrenCount: 2, name: 'Lorem'}

    const endState = userReducer(startState, {type: 'INCREMENT-CHILDREN-COUNT'})

    expect(endState.childrenCount).toBe(3)
})

test('user reducer should change name', () => {
    const startState = {age: 23, childrenCount: 2, name: 'Lorem'}
    const newName = 'Siri'

    const endState = userReducer(startState, {type: 'CHANGE-NAME', newName: newName})

    expect(endState.name).toBe(newName)
})