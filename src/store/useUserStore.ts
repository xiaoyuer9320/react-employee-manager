import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'; 

// 1. 定义数据类型
interface UserState {
  username: string;      // 存用户名
  role: 'admin' | 'guest'; // 存角色
  isLogin: boolean;      // 存是否登录
  
  // 定义动作 (Actions)
  login: (name: string) => void;  // 登录方法
  logout: () => void;             // 退出方法
}

// 2. 创建 Store
export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      username: '未登录',
      role: 'guest',
      isLogin: false,
      
      login: (name: string) => set({ username: name, isLogin: true }),
      logout: () => set({ username: '未登录', isLogin: false }),
    }),
    {
      name: 'user-storage', // 3. 必填：存在 localStorage 里的名字
      storage: createJSONStorage(() => localStorage), // 默认就是 localStorage
    }
  )
);