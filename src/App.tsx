import { BrowserRouter,Routes,Route } from "react-router-dom"
import MainLayout from "./layout/MainLayout"
import Dashborad from "./pages/Dashboard"
import EmployeeList from "./pages/EmployeeList"
function App(){
  return(
    //1.BrowserRouter：路由的总管家
    <BrowserRouter>
    {/* 2.Routes:定义路径规则 */}
      <Routes>
        {/* 第一层规则：所有页面都套在MainLayout里面 */}
        <Route path="/" element={<MainLayout/>}>
          {/* 第二层规则（嵌套路由） */}
          {/* 如果路径是/，显示Dashboard */}
          <Route index element={<Dashborad/>}/>
          {/* 如果路径是/employee，显示EmployeeList */}
          <Route path="employees" element={<EmployeeList/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
   
  )
}

export default App