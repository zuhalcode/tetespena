import { NextResponse } from "next/server";
import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { generateSlug } from "@/lib/slug";

// Method for retrieve unique article by slug
// using for /{slug} in client
export async function GET(
  _: Request,
  { params }: { params: { slug: string } },
) {
  const { slug } = params;

  try {
    const article = await db.article.findFirst({
      where: { slug },
      include: { User: true },
    });

    return NextResponse.json({
      message: "Article retrieved successfully",
      data: article,
    });
  } catch (e) {
    console.error("Error reading file:", e);
    return NextResponse.json({ error: e }, { status: 500 });
  }
}

// Method for editing Article by user who has the article
// If user id is not same with the article.userId => Unauthorize
export async function PATCH(req: Request) {
  const { content, title, articleId } = await req.json();
  const { userId } = auth();

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
