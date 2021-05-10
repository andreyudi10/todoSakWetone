import React,{ useState } from 'react'

const TodoForm = ({addTodo}) => {
    const [valueInput, setValueInput] = useState("")
    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log(valueInput)
        if(valueInput!==""){
            addTodo(valueInput,false)
        }
        //only do add function if value is not null string
        setValueInput("")
    }

    const handleChange = (e) => {
        setValueInput(e.target.value)
        console.log('change',valueInput)
    }
    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text"                        
                className="input"
                value={valueInput}        
                onChange={handleChange}    
            />
        </form>
    )
}

export default TodoForm

// arsitektur
// value yang disimpan di hook adalah, todo berisi data2
// fungsi passing value yakni addTodo dan isComplete
// fungsi passing e.target.value yakni handleSubmit dan handleChange
