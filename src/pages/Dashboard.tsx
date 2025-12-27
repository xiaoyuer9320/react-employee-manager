import React from 'react';
import { Card } from 'antd';

const Dashboard: React.FC = () => {
  return (
    <Card title="工作台">
      <h2>👋 欢迎回来，管理员！</h2>
      <p>这是员工管理系统的后台首页。</p>
      <p>请点击左侧菜单栏的“员工管理”开始操作。</p>
    </Card>
  );
};

export default Dashboard;