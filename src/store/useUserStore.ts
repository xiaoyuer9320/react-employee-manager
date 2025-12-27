import { create } from "zustand";
interface UserState{
    username:string;
    isLogin:boolean;
    login:(name:string)=>void;
    logout:()=>void;
}
export const useUserStore = create<UserState>((set) => ({
    username:'游客',
    isLogin:false,
    login:(name) =>set({
        username:name,isLogin:true
    }),
    logout:() => set({username:'游客',isLogin:false}),
}))