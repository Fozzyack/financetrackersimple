'use client'


const HistoryTab = ({ transactions } : { transactions : any[] }) => {
    const aud = Intl.NumberFormat('en-AU', {
        currency: 'AUD',
        style: 'currency'
    })

    const removeEntry = (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
        e.preventDefault();
        fetch('/api/transaction', {
            method: "DELETE",
            body: JSON.stringify({id: id}),
            headers: {"Content-Type": "application/json"}
    }).then(() =>
        window.location.reload()
    )
    }


    return (
        <div className="flex flex-col gap-2">
            {
                transactions.map((transaction, index) => (
                    <div key={index} className="relative group">
                        <div className="w-full flex justify-between items-center relative px-2 py-4 border-black border shadow-lg z-10 bg-white">
                            <span> {transaction.label} </span>
                            <span> {aud.format(transaction.amount)} </span>

                        </div>
                            {
                                transaction.amount < 0 ? (
                            <button onClick={(e) => {removeEntry(e, transaction.id)}} className="flex items-center justify-center absolute bg-red-500 text-white h-full top-0 w-[25px] left-full -translate-x-5 group-hover:-translate-x-0 transition ease-in-out duraton-150">
                            x
                            </button> ) :
                                (
                            <button onClick={(e) => {removeEntry(e, transaction.id)}} className="flex items-center justify-center absolute bg-green-500 text-white h-full top-0 w-[25px] left-full -translate-x-5 group-hover:-translate-x-0 transition ease-in-out duraton-150">
                            x
                            </button> 
                            )}
                    </div>

                ))
            }
        </div>
    )
}

export default HistoryTab
