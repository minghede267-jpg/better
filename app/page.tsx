import Link from 'next/link';

export default function HomePage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', gap: '20px' }}>
      <h1 className="text-4xl font-bold">二次元角色扮演站</h1>
      <p className="text-gray-600">欢迎来到你的幻想世界</p>
      <div className="flex gap-4">
        <Link href="/login" className="px-6 py-2 bg-blue-500 text-white rounded">我要登录</Link>
        <Link href="/create-role" className="px-6 py-2 bg-green-500 text-white rounded">创建角色</Link>
      </div>
    </div>
  );
}
