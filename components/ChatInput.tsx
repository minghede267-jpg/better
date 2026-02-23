"use client";

import { useState, useEffect } from "react";

// 定义组件的接口
interface ChatInputProps {
  onSubmit: (data: { prompt: string; role: string }) => void;
  disabled?: boolean;
}

export default function ChatInput({ onSubmit, disabled }: ChatInputProps) {
  const [prompt, setPrompt] = useState("");
  const [role, setRole] = useState("");
  const [customRoles, setCustomRoles] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/roles")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setCustomRoles(data);
      })
      .catch(console.error);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    onSubmit({ prompt, role });
    setPrompt("");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white border-t fixed bottom-0 left-0 right-0">
      <select 
        value={role} 
        onChange={e => setRole(e.target.value)} 
        className="border p-2 mb-2 w-full rounded text-gray-800"
      >
        <option value="">选择角色风格</option>
        {customRoles.map((r: any) => (
          <option key={r.id} value={r.name}>{r.name}</option>
        ))}
        <option value="御姐">御姐</option>
        <option value="萝莉">萝莉</option>
        <option value="病娇">病娇</option>
      </select>

      <div className="flex gap-2">
        <input
          type="text"
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          placeholder="输入你的想法..."
          className="flex-1 border p-3 rounded text-gray-800"
          disabled={disabled}
        />
        <button 
          type="submit" 
          disabled={disabled || !prompt.trim()}
          className="bg-pink-500 text-white px-6 py-3 rounded disabled:opacity-50"
        >
          发送
        </button>
      </div>
    </form>
  );
}
