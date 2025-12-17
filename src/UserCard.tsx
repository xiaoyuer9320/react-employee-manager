//1.定义“合同”(Interface)
//只有符合这个形状的数据，才能传进这个组件
interface UserCardProps {
    name:string;//必须是字符串
    age:number;//必须是数字
    isStudent:boolean;//必须是布尔值
    avatar?:string;//问好代表“可选”。这个属性不传也不报错
}

//2.组件接收参数，并告诉 TS：“我遵守UserCardProps的约定”
const UserCard = ({name,age,isStudent,avatar}:UserCardProps)=>{
    return(
    <div style={{
        border:'1px solid #ccc',
        padding:'20px',
        margin:'20px',
        borderRadius:'8px',
        maxWidth:'300px'
    }}>
    {/* {3.如果avatar存在，才渲染图片} */}
        {
            avatar && <img src={avatar} alt = "头像" width="50" style={{borderRadius:'50%'}}/>
        }
        <h3></h3>
        <h2>{name}</h2>
        <p>年龄：{age}岁</p>
        <p>身份：{isStudent ?'在校学生' : '打工人'}</p>
    </div>

    )
}
export default UserCard