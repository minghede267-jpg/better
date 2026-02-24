import Link from 'next/link';

export default function HomePage() {
  return (
    <div style={{ padding: '50px', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h1 style={{ color: '#333' }}>✨ 二次元角色扮演站 ✨</h1>
      <p style={{ margin: '20px 0', color: '#666' }}>恭喜！你已成功进入系统。</p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
        <Link href="/create-role" style={{ padding: '10px 20px', background: '#0070f3', color: '#fff', borderRadius: '5px', textDecoration: 'none' }}>
          去创建角色
        </Link>
        <Link href="/login" style={{ padding: '10px 20px', border: '1px solid #ccc', borderRadius: '5px', textDecoration: 'none', color: '#333' }}>
          返回登录
        </Link>
      </div>
    </div>
  );
}
