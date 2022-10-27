import type { NextApiRequest, NextApiResponse } from "next";
import { ethers } from "ethers";

/**
 * @swagger
 * /api/create-mno:
 *   post:
 *     tags: [Mobile Network Operator]
 *     description: Returns  Sign Data
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/MNOEnvelope'     # <----------
 *     responses:
 *       200:
 *         description: Sign Data Verification
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/RegisterMNO'
 *
 * definitions:
 *   MNOEnvelope:           # <----------
 *     type: object
 *     required:
 *       - address
 *     properties:
 *       dto:
 *         type: object
 *       signature:
 *         type: string
 *       address:
 *         type: string
 *
 * components:
 *  schemas:
 *    RegisterMNO:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *          format: uuid
 *        dto:
 *          type: string
 *        signature:
 *          type: string
 *        address:
 *          type: string
 *        recordCreatedAt:
 *          type: string
 *          format: date-time
 */

type Data = {
  id: string;
  address: string;
  signedData: string;
  message: string;
  recordCreatedAt: string;
};

export default async function createMNO(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log(req);
  if (!req.body) {
    res.statusCode = 404;
    res.end("Error");
    return;
  }
  const { dto, signature, address } = req.body;
  try {
    const signerAddr = await ethers.utils.verifyMessage(JSON.stringify(dto), signature);
    if (signerAddr !== address) {
      res.statusCode = 402;
      res.end("Invalid");
      return;
    }
    res.status(200).json({
      id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      address: address,
      signedData: signature,
      message: JSON.stringify(dto),
      recordCreatedAt: "2022-10-16T09:45:10.276Z",
    });
  } catch (err) {
    res.statusCode = 400;
    res.end(err);
    return;
  }
}
