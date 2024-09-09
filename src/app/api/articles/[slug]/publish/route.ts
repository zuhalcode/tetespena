// Method for soft delete article

import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// update unique article by slug and change the status to TRASHED
export async function PATCH(
  _: Request,
  { params }: { params: { slug: string } },
) {
  const { slug } = params;

  const { userId } = auth();

  try {
    const existingArticle = await db.article.findUniqueOrThrow({
      where: { slug },
    });

    if (!existingArticle) {
      return NextResponse.json(
        { message: "Article not found" },
        { status: 404 },
      );
    }

    // Check if the userId matches the article's userId
    if (existingArticle.userId !== userId) {
      return NextResponse.json(
        { message: "You do not have permission to edit this article" },
        { status: 403 }, // Forbidden
      );
    }

    const publishedArticle = await db.article.update({
      where: { slug },
      data: { status: "PUBLISHED" },
      select: { title: true },
    });

    return NextResponse.json({
      message: "Article published successfully",
      data: publishedArticle,
    });
  } catch (e) {
    console.error("Error reading file:", e);
    return NextResponse.json({ error: e }, { status: 500 });
  }
}
