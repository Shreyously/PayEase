import { SendCard } from "../../components/transferMoney";
import { TransferDetails } from "../../components/TransferDetails";

export default async function TransactionsPage() {
  

  return (
    <div className="w-screen px-3 lg:px-0 lg:pl-10 lg:pr-6 ">
      <div className="pt-12  font-rubikone text-Myblue text-4xl">
        Transaction Dashboard
      </div>
      <div className="grid  grid-cols-1 pt-8 lg:grid-cols-2 gap-8 ">
        <div>
          <SendCard />
        </div>
        <div className=" pb-10 lg:pb-0 ">
          <TransferDetails/>
        </div>
      </div>
    </div>
  );
}
