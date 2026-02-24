import Link from 'next/link';

// 关键点：必须使用 export default 导出函数
export default function HomePage() {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '100vh', 
      fontFamily: 'sans-serif' 
    }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>
        二次元角色扮演站已上线
      </h1>
      <p style={{ color: '#666', marginBottom: '30px' }}>
        数据库连接状态：✅ 已就绪
      </p>
      
      <div style={{ display: 'flex', gap: '15px' }}>
        <Link href="/login" style={{
          padding: '10px 25px',
          backgroundColor: '#0070f3',
          color: 'white',
          borderRadius: '5px',
          textDecoration: 'none'
        }}>
          进入登录页
        </Link>
        
        <Link href="/create-role" style={{
          padding: '10px 25px',
          backgroundColor: '#10b981',
          color: 'white',
          borderRadius: '5px',
          textDecoration: 'none'
        }}>
          创建新角色
        </Link>
      </div>
    </div>
  );
}
