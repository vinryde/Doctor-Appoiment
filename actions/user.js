"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";

/**
 * Check if current user has Google connected (accessToken stored).
 */
export async function checkGoogleConnected() {
  const { userId } = await auth();

  if (!userId) {
    return { connected: false };
  }

  // Look up the user in your DB — adjust if you store Google tokens differently
  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
    select: {
      googleAccessToken: true,
      googleRefreshToken: true,
    },
  });

  if (!user) {
    return { connected: false };
  }

  const connected = !!user.googleAccessToken;
  return { connected };
}
