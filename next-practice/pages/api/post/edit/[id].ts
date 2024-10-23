import { NextApiRequest, NextApiResponse } from "next";
import executeQuery from "@/public/utils/database";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log('edit btn')
    const {id} = req.query;
    if (req.method === "POST") {
        const query = `UPDATE post SET title = "${req.body.title}", content = "${req.body.content}" WHERE id = ${id}`;
        try {
          executeQuery(query);
          return res.status(200).redirect("/list");
        } catch (err) {
          console.error(err);
        }
      }
    return res.status(200).redirect('/list');
}
