import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../prisma/client";
import { parseBody } from "../../lib/parseBody";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { textarea, id } = parseBody(req.body);
  const time = Date.now().toString();
  try {
    const data = await prisma.questions.create({
      data: {
        submission_time: time,
        user_id: id,
        question: textarea,
      },
    });
    return res.send({ status: "success", data: data });
  } catch (error) {
    return res.status(500).json(error);
  }
}
