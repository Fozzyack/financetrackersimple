"use client"
import React from 'react'
const AddEntry = ({session_user_id} : { session_user_id : number }) => {
    const [name, setName] = React.useState<string>("")
    const [price, setPrice] = React.useState<string>("")

    const changeLabel = (e : React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }
    const changePrice= (e : React.ChangeEvent<HTMLInputElement>) => {
        setPrice(e.target.value)
    }

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(name)
        console.log(price)
        fetch("/api/transaction", {
            method: "POST",
            body: JSON.stringify({
                name: name,
                price: price,
                user_id: session_user_id
            }),
            headers: { "Content-Type": "application/json" }
        })
        .then(() =>
            window.location.reload()
        )
    }


    return (
        <div className="flex flex-col">
            <h1 className='text-3xl'>
                Add Transaction
            </h1>
            <form onSubmit={submit} className="flex flex-col gap-3">
                <label className="flex flex-col">
                    Transaction Label
                    <input placeholder="label..." value={name} onChange={changeLabel} className="p-2 rounded-xl border-slate-300 border-2" />
                </label>
                <label className="flex flex-col">
                    Amount
                    <input  value={price} onChange={changePrice} type="number" placeholder={"0"} step={0.01} className="p-2 rounded-xl border-slate-300 border-2" />
                </label>
                <button type="submit" className="p-3 bg-blue-500 rounded-xl text-white hover:-translate-y-2 hover:bg-blue-600 transition-all ease-in-out duration-150">
                    Submit
                </button>
            </form>
        </div>
    )
}
export default AddEntry

