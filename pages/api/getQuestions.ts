import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../prisma/client";
import { parseBody } from "../../lib/parseBody";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id = "" } = parseBody(req.body);
  try {
    let data;
    if (id === "") {
      data = await prisma.questions.findMany({
        select: {
          user_id: true,
          submission_time: true,
          question: true,
        },
      });
    } else {
      data = await prisma.questions.findMany({
        select: {
          user_id: true,
          submission_time: true,
          question: true,
        },
        where: {
          user_id: id,
        },
      });
    }
    return res.send({ status: "success", data: data });
  } catch (error) {
    return res.status(500).json(error);
  }
}
