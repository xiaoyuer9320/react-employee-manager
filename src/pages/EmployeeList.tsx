import React, { useState } from 'react';
import { Table, Tag, Space, Button, Card, Modal, Form, Input,InputNumber, Select,Popconfirm } from 'antd';
import type { ColumnsType } from 'antd/es/table';
// 引入写的 Hook
import { useEmployees, type Employee } from '../hooks/useEmployees';

const EmployeeList: React.FC = () => {
  // 1. 调用 Hook：拿到数据和操作方法
  const { employees, loading, removeEmployee, addEmployee, updateEmployee } = useEmployees();

  // 2. UI 状态管理
  const [isModalOpen, setIsModalOpen] = useState(false); // 弹窗开关
  const [editingId, setEditingId] = useState<string | null>(null); // 当前正在编辑谁？(null表示新增)
  const [searchText, setSearchText] = useState(''); // 搜索框里的字
  
  // 3. Ant Design 的表单实例（用于重置表单、回填数据）
  const [form] = Form.useForm();

  // 4. 搜索过滤逻辑
  // 不改数据库，直接在前端过滤显示的数据
  const filteredData = employees.filter(item => 
    item.name.includes(searchText) || item.department.includes(searchText)
  );

  // 5. 点击“新增”按钮时触发
  const openAddModal = () => {
    setEditingId(null); // 设置为新增模式
    form.resetFields(); // 把表单清空（防止残留上一次的数据）
    setIsModalOpen(true); // 打开弹窗
  };

  // 6. 点击“编辑”按钮时触发
  const openEditModal = (record: Employee) => {
    setEditingId(record.id); // 记录当前编辑的 ID
    form.setFieldsValue(record); // 🔥 关键：把这一行的数据填进表单里
    setIsModalOpen(true); // 打开弹窗
  };

  // 7. 点击弹窗“确定”时触发
  const handleOk = () => {
    // validateFields 会触发表单校验（必填项检查）
    form.validateFields().then(async (values) => {
      let success = false;

      // 判断是新增还是修改
      if (editingId) {
        success = await updateEmployee(editingId, values);
      } else {
        success = await addEmployee(values);
      }

      // 如果后端操作成功，关闭弹窗并清理
      if (success) {
        setIsModalOpen(false);
        form.resetFields();
        setEditingId(null);
      }
    });
  };

  // 8. 表格列定义 (配置表头)
  const columns: ColumnsType<Employee> = [
    { title: '姓名', dataIndex: 'name', key: 'name' },
    { title: '年龄', dataIndex: 'age', key: 'age' },
    { title: '部门', dataIndex: 'department', key: 'department' },
    {
      title: '角色',
      dataIndex: 'role',
      render: (text) => <Tag color={text === '管理员' ? 'gold' : 'blue'}>{text}</Tag>
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (text) => <Tag color={text === '在职' ? 'green' : 'red'}>{text}</Tag>
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button type="link" onClick={() => openEditModal(record)}>编辑</Button>
          <Popconfirm
            title="危险操作"
            description="确定要删除这个员工吗？此操作不可恢复！"
            onConfirm={() => removeEmployee(record.id)} // 点击“是”才执行删除
            okText="确定"
            cancelText="取消"
            okButtonProps={{ danger: true }} // 确认按钮变红，起警示作用
          >
            <Button type="link" danger>删除</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Card 
      title="员工列表" 
      extra={
        <Space>
          {/* 搜索框 */}
          <Input.Search 
            placeholder="请输入姓名或部门" 
            onSearch={val => setSearchText(val)}
            onChange={e => setSearchText(e.target.value)}
            style={{ width: 250 }}
            allowClear // 允许点击小叉号清空
          />
          <Button type="primary" onClick={openAddModal}>新增员工</Button>
        </Space>
      }
      
    >
      {/* 表格组件 */}
      <Table 
        columns={columns} 
        dataSource={filteredData} // 这里的源数据是过滤后的
        rowKey="id" // 告诉 React 哪一个是唯一 ID
        loading={loading} 
        scroll={{ 
          y: 400, // 高度超过 400px 时，出现垂直滚动条（表头固定，内容滚动）
          x: 1000 // (可选) 宽度超过 1000px 时，出现水平滚动条
        }}//控制表格内部滚动
  
        pagination={{ 
          pageSizeOptions: ['5', '10', '20'], // 下拉框选项
          showSizeChanger: true, // 显示“每页条数”下拉框
          defaultPageSize: 10 // 默认显示10条
        }} 
      />

      {/* 弹窗组件 */}
      <Modal  
        title={editingId ? "编辑员工信息" : "添加新员工"} 
        open={isModalOpen} 
        onOk={handleOk} 
        onCancel={() => setIsModalOpen(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="姓名" rules={[{ required: true }]}><Input /></Form.Item>
          <Form.Item name="age" label="年龄" rules={[{ required: true }]}><InputNumber min={0} max={120} style={{ width: '100%' }} /></Form.Item>
          <Form.Item name="department" label="部门" rules={[{ required: true }]}>
            <Select>
              <Select.Option value="技术部">技术部</Select.Option>
              <Select.Option value="市场部">市场部</Select.Option>
              <Select.Option value="人事部">人事部</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="role" label="角色" initialValue="普通员工">
            <Select>
               <Select.Option value="管理员">管理员</Select.Option>
               <Select.Option value="普通员工">普通员工</Select.Option>
            </Select>
          </Form.Item>
           <Form.Item name="status" label="状态" initialValue="在职">
            <Select>
               <Select.Option value="在职">🟢 在职 (Active)</Select.Option>
               <Select.Option value="离职">🔴 离职 (Disabled)</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default EmployeeList;