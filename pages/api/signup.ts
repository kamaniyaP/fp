// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../prisma/client";
import { parseBody } from "../../lib/parseBody";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userid, username, email, password } = parseBody(req.body);
  console.log(userid);
  try {
    const id_data = await prisma.users.findMany({
      where: {
        user_id: userid,
      },
    });
    //console.log(id_data);
    if (id_data.length === 0) {
      // get user from database then:
      // data.user_password = undefined
      // req.session.user = data
      // await req.session.save();
      const mail_data = await prisma.users.findMany({
        where: {
          user_mail: email,
        },
      });
      if (mail_data.length === 0) {
        const user_ = await prisma.users.create({
          data: {
            user_id: userid,
            user_name: username,
            user_password: password,
            user_mail: email,
          },
        });
        user_.user_password = undefined;
        return res.send({ status: "success", data: user_ });
      }
      res.send({ status: "error", message: "Email already exists" });
    }
    res.send({ status: "error", message: "User Id already exists" });
  } catch (error) {
    return res.status(500).json(error);
  }
}
