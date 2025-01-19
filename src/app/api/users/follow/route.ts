import prisma from "@/lib/db";
import { getDataFromToken } from "@/utils/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";

/**
 * Handles follow/unfollow of a user by the current user.
 *
 * If the current user is already following the given user, it will
 * unfollow the given user. Otherwise it will follow the given user.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @returns The response object with a success message and a status of 200.
 *          If the current user is not found, it will return a response object
 *          with an error message and a status of 404. If there is an error
 *          during the process, it will return a response object with an error
 *          message and a status of 500.
 */
export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { userId } = await req.json();
    const currentUserId = await getDataFromToken(req);

    const currentUser = await prisma.user.findUnique({
      where: { id: currentUserId },
    });

    if (!currentUser) {
      return NextResponse.json(
        { message: "Current user not found" },
        { status: 404 }
      );
    }

    if (currentUser.followingIDs.includes(userId)) {
      // UnFollow
      await prisma.user.update({
        where: { id: currentUserId },
        data: { following: { disconnect: { id: userId } } },
      });

      await prisma.user.update({
        where: { id: userId },
        data: { follower: { disconnect: { id: currentUserId } } },
      });

      return NextResponse.json(
        { success: true, message: "User unFollowed successfully" },
        { status: 200 }
      );
    } else {
      // Follow
      await prisma.user.update({
        where: { id: currentUserId },
        data: { following: { connect: { id: userId } } },
      });

      await prisma.user.update({
        where: { id: userId },
        data: { follower: { connect: { id: currentUserId } } },
      });
    }

    return NextResponse.json(
      { success: true, message: "User followed successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
