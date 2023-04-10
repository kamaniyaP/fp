import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../prisma/client";
import { parseBody } from "../../lib/parseBody";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { value = "" } = parseBody(req.body);
  try {
    const data = await prisma.questions.findMany({
      select: {
        user_id: true,
        submission_time: true,
        question: true,
      },
      where: {
        question: {
          contains: value,
        },
      },
    });
    return res.send({ status: "success", data: data });
  } catch (error) {
    return res.status(500).json(error);
  }
}
