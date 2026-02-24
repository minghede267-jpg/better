"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await signIn("credentials", {
        username,
        password,
        redirect: false, // 改为 false，由我们手动控制跳转，防止 404
      });

      if (res?.error) {
        alert("登录失败：账号或密码错误");
      } else {
        // 登录成功后，手动跳转到你确定存在的路径
        router.push("/create-role");
        router.refresh();
      }
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <form 
        onSubmit={handleSubmit} 
        className="p-8 bg-white border rounded-xl shadow-lg space-y-4 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">异世界通行证</h2>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">账号</label>
          <input 
            type="text" 
            placeholder="请输入账号" 
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none" 
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">密码</label>
          <input 
            type="password" 
            placeholder="请输入密码" 
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none" 
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className={`w-full p-2 rounded-md text-white transition-colors ${
            loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "正在开启传送门..." : "进入异世界"}
        </button>
        
        <p className="text-xs text-center text-gray-400 mt-4">
          提示：初次登录请使用测试账号 test / 123456
        </p>
      </form>
    </div>
  );
}
