import React from 'react';
import { Card, Button, Input, Space } from 'antd';
import { useUserStore } from '../store/useUserStore'; // 1. 引入 Store
import { useState } from 'react';

const Dashboard: React.FC = () => {
  // 2. 拿到 login 方法
  const { login, isLogin, username } = useUserStore();
  const [name, setName] = useState('');

  return (
    <div style={{ padding: 20 }}>
      <h1>仪表盘</h1>
      
      <Card title="用户状态管理" style={{ width: 400, marginTop: 20 }}>
        {isLogin ? (
          <div>
            <h3 style={{ color: 'green' }}>当前状态：已登录</h3>
            <p>用户名：{username}</p>
            <p>你现在可以去“员工管理”页面操作了。</p>
          </div>
        ) : (
          <Space direction="vertical"  style={{ width: '100%' }}>
            <p>当前未登录，请输入名字模拟登录：</p>
            <Input 
              placeholder="请输入你的名字" 
              value={name} 
              onChange={e => setName(e.target.value)} 
            />
            <Button type="primary" block onClick={() => login(name || '管理员')}>
              一键登录
            </Button>
          </Space>
        )}
      </Card>
    </div>
  );
};

export default Dashboard;