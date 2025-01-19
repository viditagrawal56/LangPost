import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

/**
 * @description     Retrieve all tags with the count of associated posts
 * @route           GET /api/tags
 * @returns         Array of tags with post count
 * @throws          Error if failed to retrieve tags
 */

export async function GET(req: NextRequest) {
  try {
    const tags = await prisma.tag.findMany({
      include: { Post: { select: { _count: true } } },
    });

    return NextResponse.json(tags, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
