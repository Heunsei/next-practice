import { NextApiRequest, NextApiResponse } from "next";
import executeQuery from "@/public/utils/database";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  if (req.method === "DELETE") {
    const query = `DELETE FROM post WHERE id = ${id}`;
    try {
      executeQuery(query);
      return res.status(200).json('200 OK');
    } catch (err) {
      console.error(err);
    }
  }
  return res.status(200).end();
}
