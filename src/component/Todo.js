import React,{ useState } from 'react'

const Todo = ({todo,index,completeTodo,removeTodo,identity,removeTodoSplice,editTodo,addTodo}) => {
    const testTombol = ()  =>{
        console.log('test tombol nyala')
    }
    const [valueInputEdit,setValueInputEdit] = useState("")

    const handleChangeEdit = (e,index) =>{
        // const newTodos = [...todos]
        // newTodos[index].text = e.target.value
        setValueInputEdit(e.target.value)
    }

    const handleSubmitEdit = (e) =>{
        e.preventDefault();        
        if(valueInputEdit!==""){
            addTodo(valueInputEdit,index,true,index)
        }
    }

    

    // another testTombol menggunakan cara lain
    return (
        <form 
            className="todo"
            style={{textDecoration:todo.isCompleted?"line-through":"none"}}
            onSubmit={handleSubmitEdit}
            
        >   {todo.isEdit?<input onChange={handleChangeEdit}></input>:<>
            <div className="stylingteks">
                {todo.text}            
            </div>
            <div>
                <button onClick={()=>completeTodo(index)}>completed</button>
                {/* jika butuh fungsi selain e gunakan arrow */}
                <button onClick={testTombol}>test tombol</button>
                {/* ini jalan */}
                <button onClick={()=>testTombol}>test tombol</button>
                {/* ini kaga jalan */}
                <button onClick={()=>removeTodo(identity)}>remove</button>
                <button onClick={()=>removeTodoSplice(index)}>remove pakek splice</button>
                <button onClick={()=>editTodo(index)}>edit kang</button>
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