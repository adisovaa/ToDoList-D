type StateType = {
    age: number
    childrenCount: number
    name: string
}


export const userReducer = (state: StateType, action: any): StateType => {
    switch (action.type) {
        case 'INCREMENT-AGE':
            return {
                ...state,
                age: state.age + 1
            }
        case 'INCREMENT-CHILDREN-COUNT':
            return {
                ...state,
                childrenCount: state.childrenCount + 1
            }
        case 'CHANGE-NAME':
            return {
                ...state,
                name: action.newName
            }
        default:
            throw new Error('Error type')
    }
}