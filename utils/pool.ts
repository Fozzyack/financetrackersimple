import { Pool } from 'pg'
const connectionString = process.env.CONNECTION_URI;

const pool = new Pool({
    connectionString,
})


export default pool
