import { AddMoneyCard } from "../../components/AddMoneyCard";
import { BalanceCard } from "../../components/BalanceCard";
import { OnRampTransactions } from "../../components/OnRampTransactions";
import { getServerSession } from "next-auth";
import db from "@repo/db/client";
import { authOptions } from "../../lib/authoptions";

const userbalance = async () => {
  const session = await getServerSession(authOptions);
  const balance = await db.balances.findFirst({
    where: {
      userId: Number(session?.user?.id),
    },
  });

  return {
    amount: balance?.amount || 0,
    locked: balance?.locked || 0,
  };
};

const userRecentTransactions = async () => {
  const session = await getServerSession(authOptions);
  const recentTransactions = await db.onRampTransactions.findMany({
    where: {
      userId: Number(session?.user?.id),
    },
  });
  return recentTransactions.map((t) => ({
    startTime: t.startTime,
    amount: t.amount,
    provider: t.provider,
    status: t.status,
  }));
};
export default async function () {
  const balances = await userbalance();
  const onRampTransactions = await userRecentTransactions();
  return (
    <div className=" px-3 lg:px-0 w-screen lg:pl-10 lg:pr-6">
      <div className="pt-12 pb-10 font-rubikone text-Myblue text-4xl">
      Topup Wallet 
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="">
          <AddMoneyCard />
        </div>
        <div className=" pb-10 lg:pb-0 ">
          <div>
            <BalanceCard amount={balances.amount} locked={balances.locked} />
          </div>
          <div className="pt-6">
            <OnRampTransactions transactions={onRampTransactions} />
          </div>
        </div>
      </div>
    </div>
  );
}

