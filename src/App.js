import React, { useState,useEffect} from 'react'
import Todo from './component/Todo'
import TodoForm from './component/TodoForm'
import './App.css'

const App = () => {
    const [ todos, setTodos] = useState([
        {   
            identity:Math.floor(Math.random() * 100),
            text:"learn",
            isCompleted:false,
            isRemoved:false,
            isEdit:false,
            isFavorite:false,
        },
        {   
            identity:Math.floor(Math.random() * 100),
            text:"learn",
            isCompleted:false,
            isRemoved:false,
            isEdit:false,
            isFavorite:false,
        },
        {   
            identity:Math.floor(Math.random() * 100),
            text:"learn",
            isCompleted:false,
            isRemoved:false,
            isEdit:false,
            isFavorite:false,
        },                
        // experinment apakah masih jalan klo masih ada koma        
    ])
    const [ mappedTodos, setMappedTodos] = useState(todos)
    const [ option, setOption ] = useState("All")
    useEffect(()=>{
        const getTodosFromLocal = JSON.parse(localStorage.getItem("todos"))
        if(getTodosFromLocal){
            setTodos(getTodosFromLocal)
        }
    },[])

    useEffect(() => {                
        if(option=="isNotComplete"){
            const filteredTodos = todos.filter((val)=> val.isCompleted == false)
            setMappedTodos(filteredTodos)
        }else if(option=="isComplete"){
            const filteredTodos = todos.filter((val)=> val.isCompleted == true)            
            setMappedTodos(filteredTodos)
        }else(
            setMappedTodos(todos)
        )        
    }, [todos,option])


    const addTodo = (text,isEdit,index,fakin) =>{
        // const newTodos = []
        if(isEdit==false){
            const newTodos = [
                ...todos,  { 
                            identity:Math.floor(Math.random() * 100),
                            text :text,
                            isCompleted:false,
                            isRemoved:false,
                            isEdit:false,
                            isFavorite:false,
                        }
                    ]

            setTodos(newTodos)
            localStorage.setItem("todos",JSON.stringify(newTodos))            
        }else{
            const editedTodo = [...todos]            
            editedTodo[index].text = text
            editedTodo[index].isEdit = false
            setTodos(editedTodo)
            localStorage.setItem("todos",JSON.stringify(editedTodo))            
        }
    }

    const completeTodo = (id) =>{        
        // ada 3 cara, next time klo mo pake identity pakenya yang map (cara 2 dan 3)
        // tapi klo udah ada index bisa pake cara langsung cara 1

        // cara 1
        // const newTodos = [...todos]
        // newTodos[id].isCompleted = !todos[id].isCompleted
        // setTodos(newTodos)        
        // ampe sini terus tulis setnya

        // cara 2
        // const changeUsingMapTodos = todos
        //                             .map((todo,idx)=>idx==id?
        //                             {
        //                                 identity:todo.identity,
        //                                 text :todo.text,
        //                                 isCompleted:!todo.isCompleted,
        //                                 isRemoved:todo.isRemoved,
        //                                 isEdit:todo.isEdit,
        //                                 isFavorite:todo.isFavorite,            
        //                             }:
        //                             {
        //                                 identity:todo.identity,
        //                                 text :todo.text,
        //                                 isCompleted:todo.isCompleted,
        //                                 isRemoved:todo.isRemoved,
        //                                 isEdit:todo.isEdit, 
        //                                 isFavorite:todo.isFavorite,            
        //                             })
        // ampe sini terus tulis setnya
        
        // cara ke 3
        const changedTodos = (todo) =>({
            identity:todo.identity,
            text :todo.text,
            isCompleted:!todo.isCompleted,
            isRemoved:todo.isRemoved,
            isEdit:todo.isEdit,
            isFavorite:todo.isFavorite,
        })

        const sameTodos = (todo) =>({
            identity:todo.identity,
            text :todo.text,
            isCompleted:todo.isCompleted,
            isRemoved:todo.isRemoved,
            isEdit:todo.isEdit,
            isFavorite:todo.isFavorite,
        })
        const changeUsingMapTodos = todos.map((todo,idx)=>idx==id ? changedTodos(todo) : sameTodos(todo))
        // ampe sini
            
            
        setTodos(changeUsingMapTodos)
    }

    const editTodo = (id) => {
        const newTodos = [...todos]
        newTodos[id].isEdit = !todos[id].isEdit
        setTodos(newTodos)
    }

    const removeTodo = (identity) =>{
        const newTodos = [...todos]
        const filterBasedIdentity = newTodos.filter((todo)=>todo.identity!==identity)        

        // const newThing = newTodos.map((todo)=> todo.identity===identity ? todo : todo )
        setTodos(filterBasedIdentity)                
        // udah bisa sekarang
        localStorage.setItem("todos",JSON.stringify(filterBasedIdentity))
    }
 

    const removeTodoSplice = (index) =>{
        const newTodos = [...todos];        
        newTodos.splice(index,1)        
        setTodos(newTodos)                
        localStorage.setItem("todos",JSON.stringify(newTodos))
    }

    const handleChangeOption = (e) =>{        
        setOption(e.target.value)
    }

    const changeFavorite = (id) =>{
        const newTodos = [...todos]        
        newTodos[id].isFavorite = !todos[id].isFavorite        
        setTodos(newTodos)
    }
    

    const optionBody = (
        <select onChange={handleChangeOption}>
            <option>All</option>
            <option>isComplete</option>
            <option>isNotComplete</option>
        </select>
    )
    return (
        <div className="App">
            <div className="todo-list">
                {optionBody}
                {mappedTodos                
                .map((todo, index)=>(
                    <Todo 
                        key={index}
                        index={index}
                        todo={todo}
                        completeTodo={completeTodo}
                        removeTodo={removeTodo}
                        identity={todo.identity}
                        removeTodoSplice={removeTodoSplice}
                        editTodo={editTodo}                
                        addTodo={addTodo}        
                        isFavorite={todo.isFavorite}
                        changeFavorite={changeFavorite}
                        // yang di passing ambil todo pake spread array
                    />
                ))}
                <TodoForm 
                    addTodo={addTodo} 
                />
            </div>            
        </div>
    )
}

export default App
