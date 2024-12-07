import pool from "@/utils/pool"


export async function POST(req: Request) {

    const body = await req.json();
    const dbRes = await pool.query('INSERT into transactions (label, amount, user_id) VALUES ($1, $2, $3) returning *', [body.name, body.price, body.user_id])
    console.log(dbRes)

    return Response.json({message: "Success", status: 200})
}

export async function DELETE(req: Request) {

    const body = await req.json();
    await pool.query("DELETE FROM transactions WHERE id=$1", [body.id])
    return Response.json({message: "Success", status: 200})
}


