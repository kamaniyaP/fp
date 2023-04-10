// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../prisma/client";
import { parseBody } from "../../lib/parseBody";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, password } = parseBody(req.body);
  try {
    const data = await prisma.users.findUnique({
      where: {
        user_mail: email,
      },
    });
    if (!data) {
      return res.send({ status: "user not found" });
    }
    if (data.user_password === password) {
      // get user from database then:
      data.user_password = undefined;
      //localStorage.setItem("user_data", JSON.stringify(data));
      //req.session.user = data;
      //await req.session.save();

      return res.send({ status: "success", data: data });
    }
    res.send({ status: "error" });
  } catch (error) {
    return res.status(500).json(error);
  }
}
