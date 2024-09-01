import { NextResponse } from "next/server";
import db from "@/lib/db";
import { JsonValue } from "@prisma/client/runtime/library";
import { UpdateArticleDto } from "@/dto/article/update-article.dto";
import { generateSlug } from "@/lib/slug";

export async function PATCH(
  req: Request,
  params: { slug: string; userId: string },
) {
  const { content, title } = await req.json();
  const { slug, userId } = params;

  try {
    const existingArticle = await db.article.findFirst({
      where: { slug },
      include: { User: true },
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
        where: { slug },
        data: { title, slug: updatedSlug },
      });
    }

    return NextResponse.json({
      message: "Articles retrieved successfully",
      //   article,
    });
  } catch (e) {
    console.error("Error reading file:", e);
    return NextResponse.json({ error: e }, { status: 500 });
  }
}
