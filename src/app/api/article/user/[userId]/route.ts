import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  _: Request,
  { params }: { params: { userId: string } },
) {
  const { userId } = params;

  try {
    const articles = await db.article.findMany({ where: { userId } });

    return NextResponse.json({
      message: "Articles retrieved successfully!",
      data: articles,
    });
  } catch (e) {
    return NextResponse.json({
      error: e,
      messageg: "Error Retrieving Articles",
    });
  }
}
