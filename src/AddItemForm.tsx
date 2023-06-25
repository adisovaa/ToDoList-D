import React, {ChangeEvent, useState} from "react";
import {Button, TextField} from "@mui/material";
import {ControlPoint} from "@mui/icons-material";

export type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {
    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.charCode === 13) {
            addTask()
        }
    }
    
    const addTask = () => {
        if (newTaskTitle.trim() !== '') {
            props.addItem(newTaskTitle.trim())
            setNewTaskTitle('')
        } else {
            setError('Title is required')
        }
    }

    return <div>
        <TextField id="outlined-basic"
                   variant="outlined"
                   label='type value'
                   value={newTaskTitle}
                   onChange={onNewTitleChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   error={!!error}
        />

        <Button onClick={addTask}>
            <ControlPoint/>
        </Button>

        {error && <div className='error-message'>{error}</div>}
    </div>
}