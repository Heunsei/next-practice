import { NextApiRequest, NextApiResponse } from "next";
import executeQuery from "@/public/utils/database";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.body.title == "" || req.body.content == "") {
    return res.status(500).json("모든 칸을 채워주세요");
  }
  if (req.method === "POST") {
    const query = `INSERT INTO post (title, content) values ("${req.body.title}", "${req.body.content}")`;
    try {
      executeQuery(query);
      return res.status(200).redirect("/list");
    } catch (err) {
      console.error(err);
    }
  }
}
