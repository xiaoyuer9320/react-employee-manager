import { useState } from 'react';

//1.定义数据结构：每一个任务长什么样？
interface Todo{
    id:number;
    text:string;
    isDone:boolean;
}

const TodoList = () =>{
    //2.核心难点：泛型State
    //错误：如果写useState([])，TS会以为这是个“永远为空“的数组，不让你往里面加东西
    //正确：写useState<Todo[]>([])，意思是：”这是一个数组，里面装的必须是Todo类型的数据“
    const[todos,setTodos] = useState<Todo[]>([{id:1,text:'学习TypeScript',isDone:false},
        {id:2,text:"复习React",isDone:true},])

    //这个是用来控制输入框的
    const [inputValue,setInputValue] = useState('')
    
    //添加任务
    const handleAdd = () =>{    
        if(!inputValue) return;//如果是空的不处理

        //创建一个新任务，类型必须符合Todo
        const newTodo:Todo = {
            id:Date.now(),//用时间戳做ID
            text:inputValue,
            isDone:false
        }

        //更新数组：把旧的和新的拼出来
        setTodos([...todos,newTodo])
        setInputValue('')//清空输入框
    }

    //切换完成状态（难点：数组更新）
    const toggleTodo = (id:number) =>{
        const newTodos = todos.map(todo =>{
            if(todo.id === id){
                //如果找到这个任务，就把idDone取反
                return{...todo,isDone:!todo.isDone}
            }
            return todo
        })
        setTodos(newTodos)
    }

    return(
        <div style={{padding:'20px',borderTop:'2px solid #333'}}>
            <h3>最终关:TodoList</h3>

            {/* 输入区域 */}
            <div style={{marginRight:'10px'}}>
                <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)}placeholder="今天要做点什么"/>
                <button onClick={handleAdd} style={{marginLeft:'10px'}}>添加</button>
            </div>
            {/* 列表区域 */}
            <ul>
                {todos.map(todo =>(
                    <li
                        key = {todo.id}
                        onClick={() => toggleTodo(todo.id)}
                        style={{
                            
                        }}
                    >
                    {todo.isDone ? '✅' : '⬜'}{todo.text}
                    </li>
                ))}
            </ul>
        </div>
    )
}
export default TodoList