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
  const { id, emailAddresses, fullName, firstName, lastName } =
    await req.json();

  const email = emailAddresses[0].emailAddress;

  try {
    const userExist = await db.user.findFirst({ where: { id } });

    if (userExist)
      return NextResponse.json({
        message: "User already exist",
      });

    const user = await db.user.create({
      data: {
        id,
        email,
        name: fullName,
        firstName,
        lastName,
      },

      select: {
        name: true,
        firstName: true,
        lastName: true,
        email: false,
        created_at: true,
      },
    });

    return NextResponse.json({
      message: "User saved successfully!",
      user,
    });
  } catch (error) {
    console.error("error");

    return NextResponse.json(
      { error: error, message: "Error saving User. Please try again." },
      { status: 500 },
    );
  }
}
