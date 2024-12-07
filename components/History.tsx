
import { getTransactions } from "@/utils/balance";
import HistoryTab from "./HistoryTab";
import { redirect } from "next/navigation";

const History = async () => {
    const transactions = await getTransactions();
    if (!transactions) redirect('/signin')
	return (
		<div id="history" className="flex flex-col divide-slate-400 gap-2 my-3">
			<h3 className="text-3xl"> History </h3>
            <HistoryTab transactions={transactions}/>
		</div>
	);
};

export default History;
