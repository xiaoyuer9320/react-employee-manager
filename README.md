# 🏢 企业级员工管理后台 (Employee Management System)

基于 **React 18 + TypeScript + Ant Design** 构建的现代化 B 端管理系统。
实现了完整的 CRUD 流程、全局状态管理以及模拟后端交互。

## ✨ 核心功能

- **👥 员工管理**：完整的增删改查 (CRUD) 流程，支持数据回显与二次确认。
- **🔍 高级检索**：支持按姓名/部门进行实时前端搜索过滤。
- **🔐 状态管理**：使用 **Zustand** 实现全局用户登录状态管理与持久化。
- **📡 数据交互**：封装 Axios 拦截器与 Custom Hooks 实现业务逻辑解耦。
- **🧩 交互设计**：使用 Modal 弹窗表单、Popconfirm 气泡确认等 AntD 高级组件。

## 🛠️ 技术栈

- **核心框架**: React 18, TypeScript, Vite
- **UI 组件库**: Ant Design 5.x
- **状态管理**: Zustand + Persist Middleware
- **路由管理**: React Router v6 (Nested Routes)
- **数据请求**: Axios
- **模拟后端**: JSON Server

## 🚀 如何运行 (快速开始)

> 注意：本项目使用 `json-server` 模拟后端数据，因此需要启动两个服务。

### 1. 克隆项目并安装依赖
```bash
git clone https://github.com/xiaoyuer9320/react-employee-manager.git
cd react-employee-manager
npm install
```

### 2. 启动模拟后端 (Terminal 1)
打开第一个终端窗口，运行以下命令启动数据库服务（端口 3000）：
```bash
npm run server
```

### 3. 启动前端项目 (Terminal 2)
打开第二个终端窗口，运行以下命令启动页面（端口 5173）：
```bash
npm run dev
```
访问浏览器：http://localhost:5173


## 📸 项目截图
### 1. 仪表盘与登录状态
<img width="2559" height="1439" alt="image" src="https://github.com/user-attachments/assets/b970305a-da8c-4c3e-82a0-2c529dae3a69" />

### 2. 员工列表与搜索
<img width="2559" height="1439" alt="image" src="https://github.com/user-attachments/assets/f1a09d98-91a9-4951-96da-1b805464c2a9" />

### 3. 编辑与新增弹窗
<img width="2559" height="1439" alt="image" src="https://github.com/user-attachments/assets/2dfc4037-9bae-4271-b454-504e5d77c8a1" />
<img width="2559" height="1439" alt="image" src="https://github.com/user-attachments/assets/8147896b-8a0a-438c-bc8e-7e49ff070c56" />

## 📂 目录结构
```code
src/
├── hooks/          # 自定义 Hooks (业务逻辑封装)
├── layout/         # 全局布局 (侧边栏/顶栏)
├── pages/          # 页面组件
├── store/          # Zustand 全局状态
├── App.tsx         # 路由配置
└── main.tsx        # 入口文件
```
