import React, { useState} from 'react'
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
        },
        {   
            identity:Math.floor(Math.random() * 100),
            text:"learn",
            isCompleted:false,
            isRemoved:false,
        },
        {   
            identity:Math.floor(Math.random() * 100),
            text:"learn",
            isCompleted:false,
            isRemoved:false,
        },                
        // experinment apakah masih jalan klo masih ada koma        
    ])

    const addTodo = (text) =>{
        const newTodos = [
            ...todos,  { 
                        identity:Math.floor(Math.random() * 100),
                        text :text,
                        isCompleted:false,
                        isRemoved:false
                        }
        ]
        setTodos(newTodos)
    }


    const completeTodo = (id) =>{
        const newTodos = [...todos]
        newTodos[id].isCompleted = !todos[id].isCompleted
        setTodos(newTodos)
    }

    const removeTodo = (identity) =>{
        const findIdentity = todos.find((todo)=>todo.identity==identity)
        findIdentity.isRemoved=true
        setTodos([
            ...todos,findIdentity
        ])                
        // akwakkwakwkawkakwakwkakwkakwkaw selalu pake set todo

    }

    const removeTodoSplice = (index) =>{
        const newTodos = [...todos];
        newTodos.splice(index,1)
        setTodos(newTodos)
    }
    return (
        <div className="App">
            <div className="todo-list">
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
