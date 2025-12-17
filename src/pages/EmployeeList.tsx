import React, { useState } from 'react';
import { Table, Tag, Space, Button, Card, Modal, Form, Input, Select, message } from 'antd'; // 👈 别忘了引入新组件
import type { ColumnsType } from 'antd/es/table';

interface DataType {
  id: string;
  name: string;
  age: number;
  department: string;
  role: 'admin' | 'user';
  status: 'active' | 'disabled';
}

const initialData: DataType[] = [
  { id: '1', name: '张三', age: 32, department: '技术部', role: 'admin', status: 'active' },
  { id: '2', name: '李四', age: 24, department: '市场部', role: 'user', status: 'active' },
  { id: '3', name: '王五', age: 28, department: '人事部', role: 'user', status: 'disabled' },
];

const EmployeeList: React.FC = () => {
  const [data, setData] = useState<DataType[]>(initialData);
  
  // 【新增】控制弹窗是否显示的开关
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // 【新增】获取表单实例，用来重置表单
  const [form] = Form.useForm();

  const columns: ColumnsType<DataType> = [
    { title: '姓名', dataIndex: 'name', key: 'name' },
    { title: '年龄', dataIndex: 'age', key: 'age' }, // 加了个年龄列
    { title: '部门', dataIndex: 'department', key: 'department' },
    {
      title: '角色',
      dataIndex: 'role',
      key: 'role',
      render: (text) => (
        <Tag color={text === 'admin' ? 'gold' : 'blue'}>
          {text === 'admin' ? '管理员' : '普通员工'}
        </Tag>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (_, record) => (
        <Tag color={record.status === 'active' ? 'green' : 'red'}>
          {record.status === 'active' ? '在职' : '离职'}
        </Tag>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" danger onClick={() => handleDelete(record.id)}>删除</Button>
        </Space>
      ),
    },
  ];

  const handleDelete = (id: string) => {
    setData(data.filter(item => item.id !== id));
    message.success('删除成功'); // 【新增】给个提示反馈
  };

  // 【新增】点击“确定”按钮时触发
  const handleOk = () => {
    // 1. 触发表单验证
    form.validateFields().then((values) => {
      // values 就是你在表单里填的所有数据
      console.log('表单数据:', values);

      // 2. 构造新员工对象
      const newEmployee: DataType = {
        id: Date.now().toString(), // 简单的 ID 生成
        status: 'active', // 默认状态
        ...values, // 把表单里的 name, age, department... 展开进去
      };

      // 3. 更新表格数据
      setData([...data, newEmployee]);

      // 4. 关闭弹窗 & 重置表单
      setIsModalOpen(false);
      form.resetFields();
      message.success('添加成功');
      
    }).catch((info) => {
      console.log('验证失败:', info);
    });
  };

  return (
    <Card 
      title="员工列表" 
      extra={
        <Button type="primary" onClick={() => setIsModalOpen(true)}>
          新增员工
        </Button>
      }
    >
      <Table columns={columns} dataSource={data} rowKey="id" />

      {/* 👇 这里是重点：新增的弹窗 */}
      <Modal 
        title="添加新员工" 
        open={isModalOpen} 
        onOk={handleOk} 
        onCancel={() => setIsModalOpen(false)}
      >
        <Form
          form={form} // 绑定表单实例
          layout="vertical"
          name="form_in_modal"
          initialValues={{ role: 'user' }} // 默认选中普通员工
        >
          {/* 姓名输入框 */}
          <Form.Item
            name="name"
            label="姓名"
            rules={[{ required: true, message: '请输入姓名！' }]} // 必填校验
          >
            <Input />
          </Form.Item>

          {/* 年龄输入框 */}
          <Form.Item
            name="age"
            label="年龄"
            rules={[{ required: true, message: '请输入年龄！' }]}
          >
            <Input type="number" />
          </Form.Item>
          
          {/* 部门输入框 */}
          <Form.Item
            name="department"
            label="部门"
            rules={[{ required: true, message: '请输入部门！' }]}
          >
            <Select>
              <Select.Option value="技术部">技术部</Select.Option>
              <Select.Option value="市场部">市场部</Select.Option>
              <Select.Option value="人事部">人事部</Select.Option>
            </Select>
          </Form.Item>

          {/* 角色选择框 */}
          <Form.Item name="role" label="角色">
            <Select>
               <Select.Option value="admin">管理员</Select.Option>
               <Select.Option value="user">普通员工</Select.Option>
            </Select>
          </Form.Item>

        </Form>
      </Modal>
    </Card>
  );
};

export default EmployeeList;