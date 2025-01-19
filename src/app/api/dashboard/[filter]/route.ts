import prisma from "@/lib/db";
import { getDataFromToken } from "@/utils/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";

/**
 * @description     Get the dashboard for login user
 * @route           GET /api/dashboard/:filter
 * @access          protected
 * @param {string}  filter - followers, following_users, following_tags
 * @returns         {object} - the dashboard data
 */
export async function GET(
  req: NextRequest,
  { params }: { params: { filter: string } }
) {
  try {
    const filter = params.filter;

    const userID = await getDataFromToken(req);
    if (!userID) {
      return NextResponse.json(
        { success: false, message: "You are not authorize" },
        { status: 401 }
      );
    }

    let results;

    if (filter === "followers") {
      results = await prisma.user.findUnique({
        where: { id: userID },
        select: {
          id: true,
          username: true,
          name: true,
          follower: {
            select: {
              id: true,
              username: true,
              name: true,
              bio: true,
            },
          },
        },
      });
    } else if (filter === "following_users") {
      results = await prisma.user.findUnique({
        where: { id: userID },
        select: {
          id: true,
          username: true,
          name: true,
          following: {
            select: {
              id: true,
              username: true,
              name: true,
              bio: true,
            },
          },
        },
      });
    } else if (filter === "following_tags") {
      results = await prisma.user.findUnique({
        where: { id: userID },
        select: {
          id: true,
          username: true,
          name: true,
          followingTags: true,
        },
      });
    }

    return NextResponse.json(results, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
