import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

// 临时内存存储（后期换数据库）
const allRoles: any[] = [];

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "请先登录" }, { status: 401 });
  }

  const body = await req.json();

  const newRole = {
    id: Date.now().toString(),
    ...body,
    userId: session.user.id as string,
    createdAt: new Date().toISOString(),
  };

  allRoles.push(newRole);

  return NextResponse.json({ success: true, role: newRole });
}

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "请先登录" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");

  if (type === "public") {
    return NextResponse.json(allRoles.filter(r => r.isPublic));
  }

  return NextResponse.json(allRoles.filter(r => r.userId === session.user.id));
}
