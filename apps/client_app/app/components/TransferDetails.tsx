import { Card } from "@repo/ui/card";
import { authOptions } from "../lib/authoptions";
import { getServerSession } from "next-auth";
import db from "@repo/db/client";
async function p2pApiCall() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user.id) {
    throw new Error("Not Authorised!");
  }

  const userId = Number(session?.user?.id);
  const transactions = await db.p2pTransferRecord.findMany({
    where: {
      OR: [{ senderUserId: userId }, { receiverUserId: userId }],
    },
    include: {
      sender: true,
      receiver: true,
    },
  });

  return transactions.map((transaction) => ({
    amount: transaction.amount,
    sender: transaction.sender.name,
    receiver: transaction.receiver.name,
    startTime: transaction.transferTime,
  }));
}

export async function TransferDetails() {
  const session = await getServerSession(authOptions);
  const senderName = session?.user?.name;
  const allTransactions = await p2pApiCall();

  return (
    <div>
      <div>
        <Card title="All Transactions">
          <div className="flex font-montserrat text-lg font-bold justify-between border-b border-slate-300 py-3 ">
            <div className=" flex w-2/3 ">
              <div className=" w-full max-w-md  text-center  ">
                <div>From</div>
              </div>
              <div className="text-center    w-full max-w-md  ">
                <div>To</div>
              </div>
              <div className="text-center     w-full max-w-md">
                <div>Day</div>
              </div>
            </div>
            <div className="text-center">Amount</div>
          </div>
          {allTransactions.map((transaction) => (
            <div className="flex justify-between  py-2 border-b border-slate-300 ">
              <div className="flex  w-2/3">
                <div className="text-center  w-full w-max-md   ">
                  <div className="font-afacad text-lg">
                    {transaction.sender}
                  </div>
                </div>
                <div className="  w-full w-max-md text-center ">
                  <div className="font-afacad text-lg">
                    {transaction.receiver}
                  </div>
                </div>
                <div className=" w-full flex flex-col justify-center items-center w-max-xl">
                  <div className="font-poppins text-sm text-slate-400 ">
                    {transaction.startTime.toDateString()}
                  </div>
                </div>
              </div>
              <div>
                <div className="flex flex-col justify-center font-lato text-lg">
                  {transaction.sender == senderName ? "-" : "+"}
                  {transaction.amount / 100} INR
                </div>
              </div>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}
