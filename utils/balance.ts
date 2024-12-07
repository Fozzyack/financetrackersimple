import { formatMoney, getSession } from "./lib";
import pool from "./pool";

export async function getTransactions() {
	const session = await getSession();
	if (!session) return null;

	const transactions = await pool.query(
		"SELECT * FROM transactions WHERE user_id=$1",
		[session.userObj.id],
	);
	return transactions.rows;
}

export async function getBalance() {
	const transactions = await getTransactions();
	if (!transactions) return null;
	const balance = transactions?.reduce((total, transaction) => {
		return total + parseFloat(transaction.amount);
	}, 0);
	return formatMoney(balance);
}

export async function inOut() {
	const transactions = await getTransactions();
	if (!transactions) return null;
    console.log(transactions)
	const income = transactions?.reduce((total, transaction) => {
		if (parseFloat(transaction.amount) >= 0) {
			return total + parseFloat(transaction.amount);
		}
        return total
	}, 0);
	const expense = transactions?.reduce((total, transaction) => {
		if (parseFloat(transaction.amount) < 0) {
			return total + parseFloat(transaction.amount);
		}
        return total
	}, 0);
    return {
        income: formatMoney(income),
        expense: formatMoney(expense)
    }
}
