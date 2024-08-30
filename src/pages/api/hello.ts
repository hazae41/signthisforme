import { NextApiRequest, NextApiResponse } from "next";

export default function handle(req: NextApiRequest, res: NextApiResponse) {
  console.log(req)

  res.status(400).send("Geoblocked")
}