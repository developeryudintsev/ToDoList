import React, {useState} from 'react';
import {FilterValuesType} from './App';
import {v1} from "uuid";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    key:string
    id:string
    title: string,
    tasks: Array<TaskType>,
    removeTask: (taskId: string,todoListId: string) => void,
    changeFilter: (value: FilterValuesType,todolistId:string) => void,
    addTask: (title: string,todoListId: string) => void,
    changeStatus: (id: string, isDone: boolean,todoListId: string) => void
    filter:FilterValuesType,
    DeleteMenu:(menu:string)=>void;
}

export function Todolist(props: PropsType) {
    let [title, setTitle] = useState<string>('');
    let [error, setError] = useState<string | null>();

    function onAddTaskClick() {
        if (title !== ' ' && title !== '  ') {
            if (title.length > 2) {
                props.addTask(title,props.id);
                setTitle('')
                setError('')
            }
        }else{
            setError('Title is')
        }
    }
    function onChangeFoo(event: HTMLInputElement) {
        setTitle(event.value)
    }
    function OnCgangeFilterAll(){
        props.changeFilter("all",props.id);
    }
    function OnCgangeFilterActive() {
        props.changeFilter("active",props.id)
    }
    function OnCgangeFilterCompleted() {
        props.changeFilter("completed",props.id)
    }
    let menuDelteFoo=()=>props.DeleteMenu(props.id)


    return <div>
        <h3>{props.title}</h3><button onClick={menuDelteFoo}>X</button>
        <div>
            <input
                value={title} onChange={(event) => {
                onChangeFoo(event.currentTarget)
            }}
                onKeyPress={(event) => {
                    if (event.charCode === 13) {
                        onAddTaskClick();
                    }
                }}
                className={error?'error':''}
            />
            <button onClick={() => {onAddTaskClick()}}>add</button>
            {<div className='error-massage'>{error}</div>}
        </div>
        <ul>
            {
                props.tasks.map(t => <li key={t.id}>
                    <button onClick={() => {
                        props.removeTask(t.id,props.id)
                    }}>x
                    </button>
                    <input type="checkbox" checked={t.isDone} onClick={() => {
                        props.changeStatus(t.id, t.isDone,props.id)
                    }}/>
                    <span className={t.isDone ?'is-done':''}>{t.title}</span>
                </li>)
            }
        </ul>
        <div>
            <button className={props.filter==='all'?'active-filter':''} onClick={() => {OnCgangeFilterAll()}}>All</button>
            <button className={props.filter==='active'?'active-filter':''} onClick={() => {OnCgangeFilterActive()}}>Active</button>
            <button className={props.filter==='completed'?'active-filter':''} onClick={() => {OnCgangeFilterCompleted()}}>Completed</button>
        </div>
    </div>
}

