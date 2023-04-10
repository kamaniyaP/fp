import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../prisma/client";
import { parseBody } from "../../lib/parseBody";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { textarea, q_id, q_time, a_id } = parseBody(req.body);
  const time = Date.now().toString();
  try {
    const data = await prisma.answers.create({
      data: {
        submission_time: time,
        user_id: a_id,
        answer: textarea,
        solutions: {
          create: {
            q_sub_time: q_time,
            q_user_id: q_id,
          },
        },
      },
    });
    return res.send({ status: "success", data: data });
  } catch (error) {
    return res.status(500).json(error);
  }
}
