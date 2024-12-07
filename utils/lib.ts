import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import pool from './pool'

const secretKey = process.env.SESSION_SECRET;
const key = new TextEncoder().encode(secretKey)

export async function login(formData: FormData) {
    const data = { code: formData.get("code") }
     
    let user = await pool.query('SELECT * FROM users WHERE code=$1', [data.code])
    if( user.rows.length === 0) {
       user = await pool.query( 'INSERT INTO users (code, name) VALUES ($1, $2) returning *' , [data.code, 'Set Name'])
    }
    const userObj = user.rows[0]

    const expires = new Date(Date.now() + 100 * 1000);
    const session = await encrypt({ userObj, expires })
    const cookieStore = await cookies()
    cookieStore.set('session', session, {expires, httpOnly: true})
}


export async function decrypt(input : string): Promise<any> {
    const {payload} = await jwtVerify(input, key, {
        algorithms: ["HS256"]
    })
    return payload
}

export async function encrypt(payload: any) {
    return await new SignJWT(payload)
    .setProtectedHeader({alg: 'HS256'})
    .setIssuedAt()
    .setExpirationTime('100 sec from now')
    .sign(key);
}



export async function getSession() {
    const cookieStore = await cookies()
    const session = cookieStore.get('session')?.value;
    if (!session) return null;
    return await decrypt(session);
}

export async function removeSession() {
    const cookieStore = await cookies()
    cookieStore.delete('session')
}


export function formatMoney(number: number) {
    const aud = new Intl.NumberFormat('en-AU', {
        style: 'currency',
        currency: 'AUD'
    });

    return aud.format(number)
}

