import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "./prisma";

export const checkUser = async () => {
  // Get the Clerk user ID
  const { userId } = await auth();
  if (!userId) return null;

  // Fetch current user details from Clerk
  const cu = await currentUser();
  if (!cu) return null;

  // Use primary email if available
  const email = cu?.primaryEmailAddress?.emailAddress ?? null;

  try {
    // Sync user to Prisma
    const user = await db.user.upsert({
      where: { clerkUserId: userId },
      update: {
        name: cu?.fullName ?? "",
        imageUrl: cu?.imageUrl ?? null,
        email,
      },
      create: {
        clerkUserId: userId,
        name: cu?.fullName ?? "",
        imageUrl: cu?.imageUrl ?? null,
        email,
        credits: 10, // Default welcome credits (scalar field, not relation)
        transactions: {
          create: {
            type: "CREDIT_PURCHASE",
            amount: 10,
          },
        },
      },
      include: {
        patientAppointments: true,
        doctorAppointments: true,
        availabilities: true,
        transactions: true,
        payouts: true,
      },
    });

    return user;
  } catch (error) {
    console.error("Error syncing user to Prisma:", error);
    return null;
  }
};
