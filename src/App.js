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
        },
        {   
            identity:Math.floor(Math.random() * 100),
            text:"learn",
            isCompleted:false,
            isRemoved:false,
            isEdit:false,
        },
        {   
            identity:Math.floor(Math.random() * 100),
            text:"learn",
            isCompleted:false,
            isRemoved:false,
            isEdit:false,
        },                
        // experinment apakah masih jalan klo masih ada koma        
    ])
    useEffect(()=>{
        const getTodosFromLocal = JSON.parse(localStorage.getItem("todos"))
        if(getTodosFromLocal){
            setTodos(getTodosFromLocal)
        }
    },[])

    const [option,setOption]=useState('All')

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
                        }
                    ]

            setTodos(newTodos)
            localStorage.setItem("todos",JSON.stringify(newTodos))
            // return newTodos
        }else{
            const editedTodo = [...todos]
            // const removedIsEditFalse = todos.filter(todo=>todo.isEdit==false)
            // const newTodos = [
            //     ...removedIsEditFalse,  { 
            //                 identity:identity,
            //                 text :text,
            //                 isCompleted:false,
            //                 isRemoved:false,
            //                 isEdit:false,
            //                 }
            // ]
            editedTodo[index].text = text
            editedTodo[index].isEdit=false
            setTodos(editedTodo)
            localStorage.setItem(JSON.stringify('todos',editedTodo))
            // return newTodos
        }
    }


    const completeTodo = (id) =>{
        console.log(...todos)
        const newTodos = [...todos]
        newTodos[id].isCompleted = !todos[id].isCompleted
        setTodos(newTodos)
    }

    const editTodo = (id,newtext) => {
        const newTodos = [...todos]
        newTodos[id].isEdit = !todos[id].isEdit
        setTodos(newTodos)
    }

    const removeTodo = (identity) =>{
        const findIdentity = todos.find((todo)=>todo.identity==identity)
        findIdentity.isRemoved=true        
        setTodos([
            ...todos,findIdentity
        ])                
        // akwakkwakwkawkakwakwkakwkakwkaw selalu pake set todo
        // tapi tak direkomendasikan karena merusak workflow
    }
 

    const removeTodoSplice = (index) =>{
        const newTodos = [...todos];
        console.log(newTodos)
        newTodos.splice(index,1)
        console.log(newTodos)
        setTodos(newTodos)
    }

    const handleChangeOption = (e) =>{
        console.log(e.target.value)
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
                {todos
                .filter((todo)=>todo.isRemoved===false)
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
