import React from "react";
import {Layout,Menu,theme} from 'antd';
import { DashboardOutlined,UserOutlined } from "@ant-design/icons";
import { useNavigate,Outlet,useLocation } from "react-router-dom";

const {Header,Content,Sider} =Layout;
const MainLayout:React.FC = () =>{
    const navigate = useNavigate();//钩子：用来跳转页面
    const location = useLocation();//钩子：获取当前路径

    //Ant Design的主题配置
    const{
        token:{colorBgContainer,borderRadiusLG},
    }=theme.useToken();

    //菜单配置
    const menuItems = [
        {
            key:'/',
            icon:<DashboardOutlined/>,
            label:'仪表盘',
            onClick:()=>navigate('/')//点击跳转到页面
        },
        {
            key:'/employees',
            icon:<UserOutlined/>,
            label:'员工管理',
            onClick:()=>navigate('/employees')//点击跳转到列表
        },
    ];
    return(
        <Layout style={{minHeight:'100vh'}}>
            {/* 左侧侧边栏 */}
            <Sider collapsible>
                <div style={{height:32,margin:16,background:'rgba(255,255,255,0.2'}}/>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['/']}
                    selectedKeys={[location.pathname]}//让菜单高亮和当前网址同步
                    items={menuItems}
                />
            </Sider>

            {/* 右侧主体 */}
            <Layout>
                <Header style={{padding:0,background:colorBgContainer}}/>
                <Content style={{margin:'16px'}}>
                    <div style={{
                        padding:30, 
                        minHeight:360,
                        background:colorBgContainer,
                        borderRadius:borderRadiusLG,
                    }}
                    >
                        {/* 核心重点：Outlet */}
                        {/* 这里是一个“坑位”，路由匹配到什么页面，就把那个页面赛道这里显示*/}
                        <Outlet/>   
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};
export default MainLayout;