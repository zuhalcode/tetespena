import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET(
  _: Request,
  { params }: { params: { slug: string } },
) {
  const { slug } = params;

  try {
    const article = await db.article.findFirst({ where: { slug } });

    return NextResponse.json({
      message: "Articles retrieved successfully",
      article,
    });
  } catch (e) {
    console.error("Error reading file:", e);
    return NextResponse.json({ error: e }, { status: 500 });
  }
}
