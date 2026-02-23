import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../../lib/auth";
import { prisma } from "../../../lib/prisma";
export async function POST(req: NextRequest) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: "请先登录" }, { status: 401 });
  }

  try {
    const body = await req.json();

    const newRole = await prisma.role.create({
      data: {
        name: body.name,
        appearance: body.appearance,
        personality: body.personality,
        backgroundStory: body.backgroundStory,
        voiceHint: body.voiceHint,
        isPublic: body.isPublic || false,
        userId: (session.user as any).id,
      },
    });

    return NextResponse.json({ success: true, role: newRole });
  } catch (error) {
    console.error("创建角色失败:", error);
    return NextResponse.json({ error: "创建失败" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: "请先登录" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");

  try {
    const roles = await prisma.role.findMany({
      where: type === "public" 
        ? { isPublic: true } 
        : { userId: (session.user as any).id }
    });

    return NextResponse.json(roles);
  } catch (error) {
    return NextResponse.json({ error: "获取失败" }, { status: 500 });
  }
}
