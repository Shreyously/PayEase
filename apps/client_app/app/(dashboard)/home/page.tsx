import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/authoptions";
import db from "@repo/db/client";

async function getUserInfo() {
  const session = await getServerSession(authOptions);

  if (!session || !session?.user?.id) {
    throw new Error("User not found!");
  }

  const userBasicInfo = await db.user.findUnique({
    where: {
      id: Number(session?.user?.id),
    },
    include: {
      //isme tera user's ka data toh aaega + balances and onramp transactions 
      Balances: true,
      OnRampTransactions: true,
    },
  });

  return userBasicInfo;
}

async function p2pApiCall() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user.id) {
    throw new Error("Not Authorised!");
  }

  const userId = Number(session?.user?.id);
  //there can be multiple transactions from one user to another
  //so transactions will be an array of objects
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
    id: transaction.id,
    amount: transaction.amount,
    sender: transaction.sender.name,
    receiver: transaction.receiver.name,
    startTime: transaction.transferTime,
  }));
}

export default async function Home() {
  const session = await getServerSession(authOptions);
  const senderName = session?.user?.name;
  const userBasicInfo = await getUserInfo();
  const transactions = await p2pApiCall();
  

  return (
    <div className="max-full pb-20  mx-auto w-screen">
      <div className="bg-Myblue px-6 py-4">
        <div className="text-white font-montserrat font-bold text-3xl ">
          {userBasicInfo?.name}
        </div>
        <div className="text-blue-100 font-poppins text-sm">
          Email - {userBasicInfo?.email}
        </div>
        <div className="text-blue-100 font-poppins text-sm">
          Telephone - {userBasicInfo?.phoneNumber}
        </div>
      </div>

      <div className="p-6">
        <div className="text-xl font-montserrat font-semibold text-gray-700 mb-4">
          Account Balance
        </div>
        <div className="text-3xl font-bold text-Myblue mb-6">
          ₹{" "}
          {userBasicInfo?.Balances.map((x) => {
            return x.amount / 100;
          })}
        </div>

        <div className="text-xl font-semibold font-montserrat text-gray-700 mb-4">
          Recent Transactions
        </div>

        {userBasicInfo?.OnRampTransactions.map((x) => (
          <div
            key={x.id}
            className="mb-4 flex justify-between p-4 bg-gray-100 rounded-lg shadow-sm"
          >
            <div>
              <div className="text-gray-900 text-lg font-montserrat font-semibold">
                Top-Up
              </div>
              <div className="text-gray-500 font-lato text-sm">
                {x.startTime.toDateString()}
              </div>
            </div>
            <div className=" flex flex-col justify-center items-center">
              <div className="text-lg font-lato  h-max-full ">
                +{x.amount / 100} INR
              </div>
            </div>
          </div>
        ))}

        {transactions.map((x) => (
          <div
            key={x.id}
            className="mb-4 flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow-sm"
          >
            <div>
              <div className="text-gray-900 text-lg font-montserrat font-semibold">
                {x.sender == senderName ? "Send" : "Received"}
              </div>
              <div className="text-gray-500 font-lato text-sm">
                {x.startTime.toDateString()}
              </div>
            </div>
            <div className=" flex flex-col justify-center items-center">
              <div className="text-lg font-lato  h-max-full ">
                {x.sender == senderName ? "-" : "+"}
                {x.amount / 100} INR
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
