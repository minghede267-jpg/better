"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function CreateRolePage() {
  const { data: session } = useSession();
  const router = useRouter();

  const [name, setName] = useState("");
  const [appearance, setAppearance] = useState("");
  const [personality, setPersonality] = useState("");
  const [isPublic, setIsPublic] = useState(false);

  if (!session) {
    router.push("/login");
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("/api/roles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, appearance, personality, isPublic }),
    });
    alert("创建成功！");
    router.push("/");
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-6">创建角色</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="姓名" value={name} onChange={e=>setName(e.target.value)} className="border p-3 mb-3 w-full rounded" required />
        <textarea placeholder="外貌描述" value={appearance} onChange={e=>setAppearance(e.target.value)} className="border p-3 mb-3 w-full rounded h-24" required />
        <input type="text" placeholder="性格" value={personality} onChange={e=>setPersonality(e.target.value)} className="border p-3 mb-3 w-full rounded" required />
        <label className="flex items-center mb-4">
          <input type="checkbox" checked={isPublic} onChange={e=>setIsPublic(e.target.checked)} className="mr-2" />
          公开角色
        </label>
        <button type="submit" className="bg-pink-500 text-white p-3 rounded w-full">创建</button>
      </form>
    </div>
  );
}
