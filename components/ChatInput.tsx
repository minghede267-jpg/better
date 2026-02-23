<select 
  value={role} 
  onChange={e => setRole(e.target.value)} 
  className="border p-2 mb-2 w-full rounded"
>
  <option value="">选择角色风格</option>
  [span_13](start_span){/* 动态渲染从数据库获取的角色[span_13](end_span) */}
  {customRoles.map((r: any) => (
    <option key={r.id} value={r.name}>{r.name}</option>
  ))}
  <option value="御姐">御姐</option>
  <option value="萝莉">萝莉</option>
</select>
