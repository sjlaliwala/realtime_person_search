const pg = require("pg");

const pool = new pg.Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});

async function get(query: string, values=[]): Promise<any>  {
  const res = await pool.query(query, values);
  return res.rows && res.rows.length > 0 ? res.rows : []
}

module.exports = {
  get
};
