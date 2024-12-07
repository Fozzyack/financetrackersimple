import { removeSession } from "@/utils/lib";
import pool from "@/utils/pool";

export async function PUT(req: Request) {
    const body = await req.json();
    console.log(body)
    const user = await pool.query("UPDATE users SET name=$1 WHERE id=$2 returning *", [body.name, body.id])
    console.log(`User: ${user.rows[0]} has changed their name`)
    await removeSession();
    return Response.json({message: "Success", status: 200})
}

