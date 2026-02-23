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
  const [backgroundStory, setBackgroundStory] = useState("");
  const [voiceHint, setVoiceHint] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [error, setError] = useState("");

  // 如果未登录，跳转登录页
  if (!session) {
    router.push("/login");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // 必填项校验
    if (!name || !appearance || !personality) {
      setError("姓名、外貌、性格为必填项");
      return;
    }

    try {
      const res = await fetch("/api/roles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          appearance,
          personality,
          backgroundStory,
          voiceHint,
          isPublic,
        }),
      });

      if (!res.ok) {
        throw new Error(await res.text());
      }

      alert("角色创建成功！");
      router.push("/");
    } catch (err: any) {
      setError(err.message || "创建失败，请稍后重试");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6">
      <form 
        onSubmit={handleSubmit} 
        className="bg-white p-8 md:p-10 rounded-3xl shadow-xl w-full max-w-lg border border-gray-100"
      >
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">创建你的专属角色</h1>

        {/* 姓名 */}
        <input
          type="text"
          placeholder="角色姓名（如：樱乃学姐）"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-gray-300 rounded-xl px-5 py-4 mb-4 focus:border-pink-400 focus:ring-2 focus:ring-pink-200 outline-none"
          required
        />

        {/* 外貌描述 */}
        <textarea
          placeholder="外貌描述（详细点更好，AI会参考）"
          value={appearance}
          onChange={(e) => setAppearance(e.target.value)}
          className="w-full border border-gray-300 rounded-xl px-5 py-4 mb-4 h-28 focus:border-pink-400 focus:ring-2 focus:ring-pink-200 outline-none resize-none"
          required
        />

        {/* 性格 */}
        <input
          type="text"
          placeholder="性格（如：温柔但有点病娇）"
          value={personality}
          onChange={(e) => setPersonality(e.target.value)}
          className="w-full border border-gray-300 rounded-xl px-5 py-4 mb-4 focus:border-pink-400 focus:ring-2 focus:ring-pink-200 outline-none"
          required
        />

        {/* 背景故事（可选） */}
        <textarea
          placeholder="背景故事（可选）"
          value={backgroundStory}
          onChange={(e) => setBackgroundStory(e.target.value)}
          className="w-full border border-gray-300 rounded-xl px-5 py-4 mb-4 h-32 focus:border-pink-400 focus:ring-2 focus:ring-pink-200 outline-none resize-none"
        />

        {/* 语音风格提示（可选） */}
        <input
          type="text"
          placeholder="语音风格提示（如：甜美软萌日式声）"
          value={voiceHint}
          onChange={(e) => setVoiceHint(e.target.value)}
          className="w-full border border-gray-300 rounded-xl px-5 py-4 mb-6 focus:border-pink-400 focus:ring-2 focus:ring-pink-200 outline-none"
        />

        {/* 公开选项 */}
        <label className="flex items-center mb-6 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={isPublic}
            onChange={(e) => setIsPublic(e.target.checked)}
            className="mr-3 w-5 h-5 accent-pink-500"
          />
          <span className="text-gray-700">公开这个角色（社区其他用户可见并可使用）</span>
        </label>

        {/* 错误提示 */}
        {error && (
          <p className="text-red-500 text-center mb-4 font-medium">{error}</p>
        )}

        {/* 提交按钮 */}
        <button
          type="submit"
          className="w-full bg-pink-500 hover:bg-pink-600 text-white py-4 rounded-xl font-bold transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          创建角色
        </button>
      </form>
    </div>
  );
}
