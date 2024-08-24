import db from "@/lib/db";
import { generateNewSlug } from "@/lib/slug";
import { CreateArticle, UpdateDraftArticle } from "@/types/article";
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
      messageg: "Error Retrieving Articles",
    });
  }
}

export async function POST(req: Request) {
  try {
    const jsonReq = await req.json();
    const { content, title, userId, status }: CreateArticle = jsonReq;

    let slug = title
      ?.toLowerCase() // Convert to lowercase
      .trim() // Remove leading and trailing spaces
      .replace(/[^\w\s]/g, "") // Remove non-word characters (except spaces)
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .replace(/-+/g, "-"); // Replace multiple hyphens with a single hyphen

    // Check if the slug already exists in the database
    let existingSlug = await db.article.findUnique({
      where: { slug },
    });

    if (existingSlug) {
      const timestamp = Date.now();
      slug = `${slug}-${timestamp}`;
    }

    const article = await db.article.create({
      data: { title: title.toLowerCase(), content, slug, userId, status },
    });

    return NextResponse.json({
      message: "Content saved successfully!",
      data: article,
    });
  } catch (error) {
    console.error("Error saving article:", error);

    // Return error response with appropriate status code and message
    return NextResponse.json(
      { error: error, message: "Error saving content. Please try again." },
      { status: 500 }, // Internal Server Error
    );
  }
}

export async function PUT(req: Request) {
  try {
    const jsonReq = await req.json();
    const { content, title, id, userId }: UpdateDraftArticle = jsonReq;

    const currentArticle = await db.article.findFirst({
      where: { id },
    });

    if (currentArticle?.userId !== userId) {
      return NextResponse.json(
        {
          message: "You do not have permission to edit this article.",
        },
        { status: 403 },
      ); // HTTP status 403 Forbidden
    }

    // Cek jika title berubah, generate slug baru jika perlu
    const slug =
      currentArticle?.title !== title ? generateNewSlug(title) : undefined;

    const updatedArticle = await db.article.update({
      where: { id },
      data: {
        content,
        title: title.toLowerCase(),
        ...(slug && { slug }), // Update slug jika slug tidak falsy
      },
    });

    return NextResponse.json({
      message: "Content saved successfully!",
      data: updatedArticle,
    });
  } catch (error) {
    console.error("Error saving article:", error);

    // Return error response with appropriate status code and message
    return NextResponse.json(
      { error: error, message: "Error saving content. Please try again." },
      { status: 500 }, // Internal Server Error
    );
  }
}
