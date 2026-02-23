import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma"; [span_3](start_span)//[span_3](end_span)

export async function POST(req: NextRequest) {
  const session = await auth(); [span_4](start_span)//[span_4](end_span)
  if (!session?.user) {
    return NextResponse.json({ error: "请先登录" }, { status: 401 }); [span_5](start_span)//[span_5](end_span)
  }

  try {
    const body = await req.json();
    [span_6](start_span)// 使用 Prisma 将数据存入 MongoDB[span_6](end_span)
    const newRole = await prisma.role.create({
      data: {
        name: body.name,
        appearance: body.appearance,
        personality: body.personality,
        backgroundStory: body.backgroundStory,
        [span_7](start_span)voiceHint: body.voiceHint, //[span_7](end_span)
        isPublic: body.isPublic || false,
        [span_8](start_span)userId: (session.user as any).id, //[span_8](end_span)
      },
    });

    return NextResponse.json({ success: true, role: newRole });
  } catch (error) {
    return NextResponse.json({ error: "创建失败" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const session = await auth(); [span_9](start_span)//[span_9](end_span)
  if (!session?.user) {
    return NextResponse.json({ error: "请先登录" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");

  [span_10](start_span)// 从数据库查询[span_10](end_span)
  const roles = await prisma.role.findMany({
    where: type === "public" 
      ? { isPublic: true } 
      : { userId: (session.user as any).id }
  });

  return NextResponse.json(roles);
}
