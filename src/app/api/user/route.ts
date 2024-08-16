import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const articles = await db.article.findMany();

    return NextResponse.json({
      message: "Articles retrieved successfully!",
      data: articles,
    });
  } catch (e) {
    return NextResponse.json({ error: e, msg: "error bro" });
  }
}

export async function POST(req: Request) {
  try {
    const jsonContent = await req.json();
    const { content, title } = jsonContent;
    const strContent = JSON.stringify(content);

    let slug = title
      .toLowerCase() // Convert to lowercase
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
      data: { title, content: strContent, slug },
    });

    return NextResponse.json({
      message: "Content saved successfully!",
      data: article,
    });
  } catch (error) {
    console.error("Error saving article:", error); // Log the error for debugging

    // Return error response with appropriate status code and message
    return NextResponse.json(
      { error: error, message: "Error saving content. Please try again." },
      { status: 500 }, // Internal Server Error
    );
  }
}
