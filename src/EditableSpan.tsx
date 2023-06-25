import React, {ChangeEvent, useState} from "react";
import {TextField} from "@mui/material";

type EditableSpanPropsType = {
    oldTitle: string
    onChange: (newValue: string) => void
}

export function EditableSpan(props: EditableSpanPropsType) {
    let [editMode, setEditMode] = useState(false)
    let [newTitle, setNewTitle] = useState('')

    const activateEditMode = () => {
        setEditMode(true)
        setNewTitle(props.oldTitle)
    }
    const activateViewMode = () => {
        setEditMode(false)
        props.onChange(newTitle)
    }

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    return editMode
        ? <TextField value={newTitle} onChange={onChangeTitleHandler} onBlur={activateViewMode} autoFocus/>
        : <span onDoubleClick={activateEditMode}>{props.oldTitle}</span>
}