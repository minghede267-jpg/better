"use client";

import { useState, useEffect } from "react";

export default function ChatInput({ onSubmit, disabled }) {
  const [prompt, setPrompt] = useState("");
  const [role, setRole] = useState("");
  const [customRoles, setCustomRoles] = useState([]);

  useEffect(() => {
    fetch("/api/roles")
      .then(res => res.json())
      .then(setCustomRoles)
      .catch(console.error);
  }, []);

  const handleSubmit = (e) => {
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
        className="border p-2 mb-2 w-full rounded"
      >
        <option value="">选择角色风格</option>
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
          className="flex-1 border p-3 rounded"
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
