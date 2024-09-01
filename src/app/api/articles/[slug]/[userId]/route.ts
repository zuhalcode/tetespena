import { NextResponse } from "next/server";
import db from "@/lib/db";
import { generateSlug } from "@/lib/slug";

export async function PATCH(
  req: Request,
  { params }: { params: { userId: string; slug: string } },
) {
  const { content, title, articleId } = await req.json();
  const { userId } = params;

  try {
    const existingArticle = await db.article.findUniqueOrThrow({
      where: { id: articleId },
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

    if (existingArticle.title !== title) {
      const updatedSlug = generateSlug(title);
      const updatedArticle = await db.article.update({
        where: { id: articleId },
        data: { title, slug: updatedSlug, content },
      });

      return NextResponse.json({
        message: "Articles retrieved successfully",
        data: updatedArticle,
      });
    }

    const updatedArticle = await db.article.update({
      where: { id: articleId },
      data: { title, content },
    });

    return NextResponse.json({
      message: "Articles retrieved successfully",
      data: updatedArticle,
    });
  } catch (e) {
    console.error("Error reading file:", e);
    return NextResponse.json({ error: e }, { status: 500 });
  }
}
