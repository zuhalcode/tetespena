import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  _: Request,
  { params }: { params: { articleId: string } },
) {
  const { articleId } = params;

  try {
    const article = await db.article.findFirst({
      where: { id: articleId },
      include: { User: true },
    });

    return NextResponse.json({
      message: "Articles retrieved successfully",
      data: article,
    });
  } catch (e) {
    console.error("Error reading file:", e);
    return NextResponse.json({ error: e }, { status: 500 });
  }
}
