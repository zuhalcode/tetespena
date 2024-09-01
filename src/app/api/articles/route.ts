import db from "@/lib/db";
import { generateSlug } from "@/lib/slug";

import { NextResponse } from "next/server";

export async function GET() {
  try {
    const articles = await db.article.findMany({ include: { User: true } });

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

export async function POST(req: Request) {
  const { content, title, userId, status } = await req.json();
  let slug: string = generateSlug(title);

  try {
    // Check if the slug already exists in the database
    let existingArticle = await db.article.findUnique({
      where: { title },
    });

    if (existingArticle)
      return {
        message: "Article with same title is existing",
      };

    const article = await db.article.create({
      data: { title: title.toLowerCase(), content, slug, userId, status },
      select: {
        id: true,
        title: true,
        slug: true,
        content: true,
      },
    });

    return { message: "Article created successfully", data: article };
  } catch (error) {
    console.error("Error saving article:", error);

    return {
      message: "Article with same title is existing",
      errors: error,
    };
  }
}
