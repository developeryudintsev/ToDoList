import React, {useState} from 'react';
import './App.css';
import {Todolist,TaskType} from './Todolist';
import {v1} from "uuid";

export type FilterValuesType = "all" | "active" | "completed";

type TaskStateType={
    [key:string]:Array<TaskType>
}

function App() {

    type TodoListType = {
        id: string;
        title: string;
        filter: FilterValuesType;
    }
    // let [tasks, setTasks] = useState([
    //     {id: v1(), title: "HTML&CSS", isDone: true},
    //     {id: v1(), title: "JS", isDone: true},
    //     {id: v1(), title: "ReactJS", isDone: false},
    //     {id: v1(), title: "Rest API", isDone: false},
    //     {id: v1(), title: "GraphQL", isDone: false},
    // ]);
    let todolistID1=v1()
    let todolistID2=v1()
    let [todolists, setTodolists] = useState<Array<TodoListType>>([
        {id: todolistID1, title: 'What to Learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'active'}
    ])
let[tasks,setTasks]=useState<TaskStateType>({
    [todolistID1]:[
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
    ],
    [todolistID2]:[
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
    ]
})

    function DeleteMenu(menu:string) {
        setTodolists(todolists.filter(t=>t.id!==menu));
    }

    function removeTask(id: string,todolistID:string) {
        let todolistTasks=tasks[todolistID];
        tasks[todolistID]=todolistTasks.filter(t=>t.id!==id);
        setTasks({...tasks});
    }
    const addTask = (title: string,todolistid:string) => {
        let newTask = {id: v1(), title: title, isDone: false};
        let todolist=tasks[todolistid]
        tasks[todolistid]=[newTask,...todolist]
        setTasks({todolist,...tasks});
    }
    // let [filter, setFilter] = useState<FilterValuesType>("all");
    function changeFilter(value: FilterValuesType, todoListId: string) {

        let todoList = todolists.find(f => f.id === todoListId);
        if (todoList) {
            todoList.filter = value;
            setTodolists([...todolists ])
        }
    }
    function changeStatus(id: string, isDone: boolean,todolistID:string) {
        let todolistTask=tasks[todolistID];
        let task= todolistTask.find(f => f.id === id);
        if (task) {
            task.isDone = !isDone;
            setTasks({...tasks})
        }
    }

    return (
        <div className="App">
            {
                todolists.map(m => {
                    let tasksForTodolist = tasks[m.id];
                    if (m.filter === "active") {
                        tasksForTodolist = tasks[m.id].filter(t => t.isDone === false);
                    }
                    if (m.filter === "completed") {
                        tasksForTodolist = tasks[m.id].filter(t => t.isDone === true);
                    }
                    return (
                        <Todolist
                            key={m.id}
                            id={m.id}
                            title={m.title}
                            tasks={tasksForTodolist}
                            removeTask={removeTask}
                            changeFilter={changeFilter}
                            addTask={addTask}
                            changeStatus={changeStatus}
                            filter={m.filter}
                            DeleteMenu={DeleteMenu}
                        />
                    )
                })
            }
        </div>
    );
}

export default App;
// ===========================================
// import React, {useState} from 'react';
// import './App.css';
// import {Todolist} from './Todolist';
// import {v1} from "uuid";
// import {stringify} from "querystring";
//
// export type FilterValuesType = "all" | "active" | "completed";
//
//
// function App() {
//     type TodoListType={
//         id:string,
//         title:string,
//         filter:FilterValuesType
//     }
//     let [tasks, setTasks] = useState([
//         { id: v1(), title: "HTML&CSS", isDone: true },
//         { id: v1(), title: "JS", isDone: true },
//         { id: v1(), title: "ReactJS", isDone: false },
//         { id: v1(), title: "Rest API", isDone: false },
//         { id: v1(), title: "GraphQL", isDone: false },
//     ]);
//     let [todoList,settodoList]=useState<Array<TodoListType>>([
//         {id:v1(),title:'whotToLearn',filter:'all'},
//         {id:v1(),title:'whotToBuy',filter:'all'}
//     ])
//     function removeTask(id: string) {
//         let filteredTasks = tasks.filter(t => t.id != id);
//         setTasks(filteredTasks);
//     }
//     let [filter, setFilter] = useState<FilterValuesType>("all");
//     const addTask=(title:string)=>{
//         let newTask = {id: v1(), title: title, isDone: false};
//         setTasks([newTask, ...tasks]);
//     }
//     function changeStatus(id:string,isDone:boolean){
//         let task=tasks.find(task=>task.id===id);
//         if(task){
//             task.isDone=!isDone;
//             setTasks([...tasks])
//         }
//     }
//     let tasksForTodolist = tasks;
//     if (filter === "active") {
//         tasksForTodolist = tasks.filter(t => t.isDone === false);
//     }
//     if (filter === "completed") {
//         tasksForTodolist = tasks.filter(t => t.isDone === true);
//     }
//     function changeFilter(value: FilterValuesType) {
//         setFilter(value);
//     }
//
//     return (
//         <div className="App">
//             {
//                 todoList.map(m=>{
//                     return(
//                         <Todolist
//                             key={m.id}
//                             id={m.id}
//                             title={m.title}
//                             tasks={tasksForTodolist}
//                             removeTask={removeTask}
//                             changeFilter={changeFilter}
//                             addTask={addTask}
//                             changeStatus={changeStatus}
//                             filter={m.filter}
//                         />
//                     )
//                 })
//             }
//             {/*<Todolist*/}
//             {/*    title="What to learn"*/}
//             {/*          tasks={tasksForTodolist}*/}
//             {/*          removeTask={removeTask}*/}
//             {/*          changeFilter={changeFilter}*/}
//             {/*          addTask={addTask}*/}
//             {/*          changeStatus={changeStatus}*/}
//             {/*          filter={filter}*/}
//             {/*/>*/}
//         </div>
//     );
// }
//
// export default App;