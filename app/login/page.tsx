"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      username,
      password,
      callbackUrl: "/",
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit} className="p-8 border rounded-lg shadow-md space-y-4">
        <h2 className="text-2xl font-bold text-center">系统登录</h2>
        <input type="text" placeholder="账号" className="w-full p-2 border rounded" 
          onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="密码" className="w-full p-2 border rounded" 
          onChange={(e) => setPassword(e.target.value)} />
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          进入异世界
        </button>
      </form>
    </div>
  );
}
