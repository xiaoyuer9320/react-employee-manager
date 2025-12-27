import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { message } from 'antd';

export interface Employee {
  id: string;
  name: string;
  age: number;
  department: string;
  role: 'admin' | 'user';
  status: 'active' | 'disabled';
}

export const useEmployees = () => {
  // 1. 状态：存员工列表
  const [employees, setEmployees] = useState<Employee[]>([]);
  // 2. 状态：存加载状态 (true表示正在转圈)
  const [loading, setLoading] = useState(false);

  // 3. 查：获取列表
  // useCallback 作用：缓存这个函数，避免组件每次渲染都重新创建它，导致死循环
  const fetchEmployees = useCallback(async () => {
    setLoading(true); // 开始加载，开启转圈
    try {
      const res = await axios.get('http://localhost:3000/employees');
      setEmployees(res.data); // 拿到数据，存入 State
    } catch (error) {
      message.error('数据加载失败');
    } finally {
      setLoading(false); // 无论成功失败，都要停止转圈
    }
  }, []);

  // 4. 自动运行：组件一加载，就执行 fetchEmployees
  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  // 5. 删：删除员工
  const removeEmployee = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3000/employees/${id}`);
      message.success('删除成功');
      fetchEmployees(); // 删完后，重新拉取一次最新列表
    } catch (error) {
      message.error('删除失败');
    }
  };

  // 6. 增：新增员工
  // Partial<Employee> 意思是可以只传 Employee 的一部分属性（因为 id 是自动生成的）
  const addEmployee = async (values: Partial<Employee>) => {
    try {
      const newEmployee = { ...values, status: 'active' };
      await axios.post('http://localhost:3000/employees', newEmployee);
      message.success('添加成功');
      fetchEmployees(); // 刷新列表
      return true; // 告诉组件：操作成功了
    } catch (error) {
      message.error('添加失败');
      return false; // 告诉组件：操作失败了
    }
  };

  // 7. 改：修改员工
  const updateEmployee = async (id: string, values: Partial<Employee>) => {
    try {
      // put 请求用于更新数据
      await axios.put(`http://localhost:3000/employees/${id}`, {
        ...values,
      });
      message.success('修改成功');
      fetchEmployees(); // 刷新列表
      return true;
    } catch (error) {
      message.error('修改失败');
      return false;
    }
  };

  // 8. 导出：把数据和方法打包送出去
  return {
    employees,
    loading,
    removeEmployee,
    addEmployee,
    updateEmployee
  };
};