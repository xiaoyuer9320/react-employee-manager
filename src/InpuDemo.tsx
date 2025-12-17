import { useState } from 'react'

const InputDemo = () =>{
    //1.状态管理：TS会自动推断 text是string类型，不需要我们多嘴
    const [text,setText] = useState('')

    //2.处理输入事件
    //!难点：e的类型是什么？
    //记住React.ChangeEvent是“改变事件”，<HTMLInputElement>是“在这个元素上发生的”
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        console.log('整个包裹(e)：',e);
        console.log('发件人（e.target):',e.target);
        
        setText(e.target.value)
    }
    //3.处理点击事件
    //记住：React.MouseEvent是“鼠标事件”，<HTMLButtonElement>是“按钮”
    const handleClick = () =>{
        alert('你刚刚输入了：' + text)
        setText('')//清空输入框
    }

    return(
        <div style ={{
            padding:'20px',borderTop:'2px dashed #ccc'
        }}>
        <h3>第二课：事件处理</h3>
        <input type="text" value={text} onChange={handleChange} placeholder='随便输入'
        style={{padding:'8px',marginRight:'10px'}}
        />
        <button onClick={handleClick} style={{padding:'8px 16px'}}>
            提交
        </button>
        <p>实时预览：{text}</p>
        </div>
    )
}

export default InputDemo