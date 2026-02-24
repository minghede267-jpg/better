"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateRole() {
  const [formData, setFormData] = useState({ name: "", description: "", gender: "未知" });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/roles", {
      method: "POST",
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      alert("角色创建成功！正在前往聊天室...");
      router.push("/chat"); // 接下来我们要开发的聊天页面
    } else {
      alert("创建失败，请检查网络");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-pink-50 flex items-center justify-center p-4">
      <form onSubmit={handleCreate} className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md space-y-6">
        <h1 className="text-2xl font-bold text-center text-pink-600">✨ 创造你的二次元同伴 ✨</h1>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">角色名字</label>
          <input 
            type="text" 
            required
            className="mt-1 w-full border-2 border-pink-100 p-2 rounded-lg focus:border-pink-400 outline-none"
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">性格/描述</label>
          <textarea 
            required
            placeholder="例如：傲娇、温柔的青梅竹马..."
            className="mt-1 w-full border-2 border-pink-100 p-2 rounded-lg focus:border-pink-400 outline-none h-24"
            onChange={(e) => setFormData({...formData, description: e.target.value})}
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-pink-500 text-white py-3 rounded-xl font-bold hover:bg-pink-600 transition-colors"
        >
          {loading ? "正在召唤..." : "确认诞生"}
        </button>
      </form>
    </div>
  );
}
