import { createPool } from "mysql2";

const connection = createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  dateStrings: true,
  port: 3306,
});

connection.getConnection((err, conn) => {
  if (err) console.log("Error");
  else console.log("Connected");
  conn.release();
});

const executeQuery = (query: string, arrParams?: any[]) => {
  return new Promise((resolve, reject) => {
    try {
      connection.query(query, arrParams, (err, data) => {
        if (err) {
          console.log("Error in executing the query");
          reject(err);
        }
        console.log("------db.jsx------");
        console.log(data)
        resolve(data);
      });
    } catch (err) {
      reject(err);
    }
  });
};

export default executeQuery;
