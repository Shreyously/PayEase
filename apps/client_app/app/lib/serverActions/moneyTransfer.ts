"use server";
import db from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../authoptions";

export async function transferMoney(phoneNumber: string, amount: number) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return {
      message: "Error while money tranfer",
    };
  }

  const receiver = await db.user.findUnique({
    where: {
      phoneNumber: phoneNumber,
    },
  });

  if (!receiver) {
    return {
      message: "No such receiver with that phone number!",
    };
  }

  await db.$transaction(async (transaction) => {
    // Here we ara locking row so no matter how many request came particular row wont get affected util the transaction completed
    // We are doing it in raw sql queries as prisma doesnt support locking for now

    // await transaction.$queryRaw`SELECT * FROM "Balances" WHERE "userId"= ${Number(session?.user?.id)} FOR UPDATE`;

    const userBalance = await transaction.balances.findUnique({
      where: {
        // Mistake i was doing: Not converting it to Number
        userId: Number(session?.user?.id),
      },
    });

    // console.log("Before sleep");

    // ++++++++++++++++++++++++

    // we are creating fake delay to expose one big problem in our code that is if multiple request come from same userId parallely . That may somehow send more money than use have make user balance to negative.

    // await new Promise((response) => {
    //   setTimeout(response, 4000);
    // });

    // ++++++++++++++++++++++++

    // console.log("after sleep");

    if (!userBalance || userBalance.amount < amount) {
      throw new Error("Not enough money ");
    }

    //Sender
    await transaction.balances.update({
      where: {
        userId: Number(session?.user?.id),
      },
      data: {
        amount: {
          decrement: amount,
        },
      },
    });

    // Receiver
    await transaction.balances.update({
      where: {
        userId: receiver.id,
      },
      data: {
        amount: {
          increment: amount,
        },
      },
    });

    // Entry to p2p table in db
    // console.log("before p2p");
    
    await transaction.p2pTransferRecord.create({
      data: {
        senderUserId: Number(session?.user?.id),
        receiverUserId: receiver.id,
        amount: amount,
        transferTime: new Date(),
      },
    });
    // console.log("after p2p");
    
  });
  return {
    message: "Transfer succeed",
  };
}
