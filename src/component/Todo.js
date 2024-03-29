import React,{ useState } from 'react'
import styles from './Todo.module.css'

const Todo = ({todo,index,completeTodo,removeTodo,identity,removeTodoSplice,editTodo,addTodo,isFavorite,changeFavorite}) => {
    const testTombol = ()  =>{
        console.log('test tombol nyala')
    }
    const [valueInputEdit,setValueInputEdit] = useState("")

    const handleChangeEdit = (e,index) =>{        
        console.log(e.target.value)
        setValueInputEdit(e.target.value)
    }

    const handleSubmitEdit = (e) =>{
        e.preventDefault();        
        if(valueInputEdit!==""){
            addTodo(valueInputEdit,true,index,identity)
        }
        setValueInputEdit("")
    }

    // using className
    const favoriteConditional = (
        isFavorite ? `${styles.circle} ${styles.active}` : `${styles.circle}`
    )

    // using styles
    const completeConditional = (
        {textDecoration:todo.isCompleted ? "line-through" : "none"}
    )

    

    // another testTombol menggunakan cara lain
    return (
        <form 
            className="todo"
            style={completeConditional}
            onSubmit={handleSubmitEdit}
            
        >   {todo.isEdit?
            <input onChange={handleChangeEdit}></input>:
            <>
                <div className="stylingteks">
                    {todo.text}            
                </div>
                <div>
                    <button onClick={()=>completeTodo(identity)}>completed</button>
                    {/* jika butuh fungsi selain e gunakan arrow */}
                    <button onClick={()=>changeFavorite(identity)}>toggle Fav</button>
                    {/* ini jalan */}
                    <button onClick={()=>testTombol}>test tombol</button>
                    {/* ini kaga jalan */}
                    <button onClick={()=>removeTodo(identity)}>remove</button>
                    <button onClick={()=>removeTodoSplice(index)}>remove pakek splice</button>
                    <button onClick={()=>editTodo(identity)}>edit kang</button>                
                    <div className={favoriteConditional}></div>
                </div>
            </>}
        
        </form>
    )
}

export default Todo


// kesimpulan, klo cuma jalanin fungsi semacam biar fungsi lain jalan atau setState bisa
// pake tulis langsung {testTombol}
// tapi klo kamu butuh value gunakan arrow {()=>getValue()}
// perhatikan lagi perbedaan make isComplete dan addTodo
// yang addTodo ada di dalem fungsi handleSubmit sedangkan yang 
// isComplete menggunakan arrow function
// keduanya sama2 menggunakan passing value

// bikin fungsi di apps,passing props, panggil passing props, 
// pilih mo pake arow ato tembak langsung
// ubah

// klo passing value di returnnya pake arrow
// klo cuma onChange ama onClick mah langsung gas aya wae awkakwkawka