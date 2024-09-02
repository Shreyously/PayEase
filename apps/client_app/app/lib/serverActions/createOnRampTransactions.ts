"use server";
// "Server component needs to be marked as use-server at the top so next know it needs to be called at the server . otherwise next will try to run this funtion on client side where prisma  doesnt even exists!  "

import db from "@repo/db/client";
import { authOptions } from "../authoptions";
import { getServerSession } from "next-auth";

export async function createOnRampTransactions (provider: string , amount:number) {
  const session = await getServerSession(authOptions);
  // in reality token will be provided by banks
  if (!session?.user?.id) {
    return {
      message: "Unauthorised Request!",
    };
  }

  const token = (Math.random() * 1000).toString();
   await db.onRampTransactions.create({
    data: {
      provider: provider,
      status: "Processing",
      startTime: new Date(),
      token: token,
      amount: amount * 100,
      userId: Number(session?.user?.id),
    },
  });

  return { 
    message : "OnRampTransactions created!"
  }
}
