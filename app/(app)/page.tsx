import Balance from "@/components/Balance"
import Header from "@/components/Overview"
import History from '@/components/History'
import Expenses from "@/components/Expenses"
import AddEntry from "@/components/AddEntry"

import { redirect } from "next/navigation"
import { getSession } from "@/utils/lib"
import { getBalance, inOut } from "@/utils/balance"


const app = async () => {

    
    const session = await getSession();
    if(!session) redirect('/signin')
    const balance = await getBalance();
    if(!balance) redirect('/signin')
    const in_out = await inOut() 
    if(!in_out) redirect('/signin')
    return (
        <div className="flex flex-col items-center justify-center min-h-screen my-8">
            <div className="divide-y divide-slate-300">
            <div className="py-2">
                <Header sessionName={session.userObj.name} user_id={session.userObj.id}/>
                <Balance balance={balance}/>
            </div>
                <Expenses income={in_out.income} expense={in_out.expense}/>
                <History />
                <AddEntry session_user_id={session.userObj.id}/>
            </div>
        </div>
    )
} 

export default app
