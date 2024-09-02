import { Card } from "@repo/ui/card";

// Here is a thing to learn we have define a interface for single transaction . but transactions is an array so futher we have to give that type also
interface TransactionType {
  amount: number;
  status: string;
  provider: string;
  startTime: Date;
}

export function OnRampTransactions({
  transactions,
}: {
  transactions: TransactionType[];
}) {
  if (!transactions.length) {
    return (
      <div>
        <Card title="Recent Transactions">
          <div className="pt-4"> No recent transactions</div>
        </Card>
      </div>
    );
  }
  return (
    <div>
      <Card title=" Topup Transactions">
        {transactions.map((transaction) => (
          <div className="flex justify-between pt-1 border-b border-slate-200">
            <div>
              <div className="  font-montserrat text-lg font-semibold">Received INR</div>
              <div className="font-poppins text-sm text-slate-400 ">{transaction.startTime.toDateString()}</div>
            </div>
            <div className="flex flex-col justify-center font-lato text-lg">+ Rs {transaction.amount / 100}</div>
          </div>
        ))}
      </Card>
    </div>
  );
}
