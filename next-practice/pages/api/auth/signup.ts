import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import executeQuery from "@/public/utils/database";

interface auth {
  email: string;
  password: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    if (!req.body.id || !req.body.password) {
      return res.status(400).json("invalid value");
    }
    const pwd = req.body.password as string;
    const hash = await bcrypt.hash(pwd, 1);
    req.body.password = hash;
    const isDup: auth[] = (await executeQuery(
      `SELECT * FROM account where email='${req.body.email}'`
    )) as auth[];
    console.log(isDup);
    if (isDup.length === 0) {
      await executeQuery(
        `INSERT INTO account (email, password) VALUE ('${req.body.email}', '${req.body.password}')`
      );
    } else {
      return res.status(400).json("fail");
    }
    return res.status(200).json("pass");
  }
}
