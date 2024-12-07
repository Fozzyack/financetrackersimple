

const Expenses = ({income, expense} : {income: string, expense: string}) => {
    return(
        <div>
            <h1 className="text-3xl my-4">
                Income Expense
            </h1>
            <div className="shadow-xl divide-slate-300 divide-x flex flex-row">
                <div className="flex flex-col items-center justify-center p-12">   
                    <h3 className="text-2xl text-green-500">
                        INCOME
                    </h3>
                    <span>
                        {income}
                    </span>
                </div>
                <div className="flex flex-col items-center justify-center p-12">   
                    <h3 className="text-2xl text-red-500">
                        EXPENSE 
                    </h3>
                    <span>
                        {expense}
                    </span>
                </div>
                
            </div>
        </div>
    )
}

export default Expenses
