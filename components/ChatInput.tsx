"use client";

import { useState, useEffect } from "react";

export default function ChatInput({ onSubmit, disabled }) {
  const [prompt, setPrompt] = useState("");
  const [role, setRole] = useState("");
  const [customRoles, setCustomRoles] = useState([]);

  useEffect(() => {
    fetch("/api/roles")
      .then(res => res.json())
      .then(setCustomRoles);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ prompt, role });
    setPrompt("");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white border-t">
      <select value={role} onChange={e => setRole(e.target.value)} className="border p-2 mb-2 w-full">
        <option value="">选择角色</option>
        <option value="御姐">御姐</option>
        <option value="萝莉">萝莉</option>
      </select>
      <input
        type="text"
        value={prompt}
        onChange={e => setPrompt(e.target.value)}
        placeholder="输入你的想法..."
        className="border p-2 w-full mb-2"
        disabled={disabled}
      />
      <button type="submit" disabled={disabled} className="bg-pink-500 text-white p-2 rounded w-full">
        发送
      </button>
    </form>
  );
}
