import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../prisma/client";
import { parseBody } from "../../lib/parseBody";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id, sub_time } = parseBody(req.body);
  try {
    const data = await prisma.answers.findMany({
      select: {
        user_id: true,
        submission_time: true,
        answer: true,
      },
      where: {
        solutions: {
          every: {
            q_user_id: id,
            q_sub_time: sub_time,
          },
        },
      },
    });
    return res.send({ status: "success", data: data });
  } catch (error) {
    return res.status(500).json(error);
  }
}
