import db from "@/lib/db";
import { ArticleStatus } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { userId: string } },
) {
  const { userId } = params;

  const url = new URL(req.url);
  const queryStatus = url.searchParams.get("status") as ArticleStatus;

  try {
    const articles = await db.article.findMany({
      where: { userId, status: queryStatus },
    });

    return NextResponse.json({
      message: "Articles retrieved successfully!",
      data: articles,
    });
  } catch (e) {
    return NextResponse.json({
      error: e,
      message: "Error Retrieving Articles",
    });
  }
}
