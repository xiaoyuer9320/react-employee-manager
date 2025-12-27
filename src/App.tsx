import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from './layout/MainLayout'
import Dashboard from './pages/Dashboard'
import EmployeeList from './pages/EmployeeList'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 外层路由：MainLayout */}
        <Route path="/" element={<MainLayout />}>
          
          {/* index 代表默认首页，显示 Dashboard */}
          <Route index element={<Dashboard />} />
          
          {/* 访问 /employees 时，在 Outlet 的位置显示 EmployeeList */}
          <Route path="employees" element={<EmployeeList />} />
          
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App