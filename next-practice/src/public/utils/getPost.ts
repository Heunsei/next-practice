import { createPool } from "mysql2";

interface post {
  id: number;
  content: string;
  title: string;
}

const registerService = (name: string, initFn: () => void) => {
  if (process.env.NODE_ENV === "development") {
    if (!(name in global)) {
      global[name] = initFn();
    }
    return global[name];
  }
  return initFn();
};

const connection = createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  dateStrings: true,
  port: 3306,
});

let db;
try {
  db = registerService("db", () => {
    connection.getConnection((err, conn) => {
      if (err) console.log("Error");
      else console.log("Connected");
      conn.release();
    });
  });
} catch (err) {
  console.error(err);
}

const getPost = (query: string, arrParams?: any[]) => {
  return new Promise((resolve, reject) => {
    try {
      connection.query(query, arrParams, (err, data) => {
        if (err) {
          console.log("Error in executing the query");
          reject(err);
        }
        resolve(data);
      });
    } catch (err) {
      reject(err);
    }
  });
};

export default getPost;
