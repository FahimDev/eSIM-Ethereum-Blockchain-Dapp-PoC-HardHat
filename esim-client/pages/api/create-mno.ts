import type { NextApiRequest, NextApiResponse } from "next";
import {
  SignTypedDataVersion,
  recoverTypedSignature,
} from "@metamask/eth-sig-util";
import { ethers } from "ethers";
import fs from "fs"; // JSON FILE SAVING

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
 *        splitSignature:
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
  splitSignature: string;
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
    /***********************************|
   |        Sign Typed Data v4          |
   |__________________________________*/

    // Verify signature with recoverTypedSignature()
    let restored = recoverTypedSignature({
      signature,
      version: SignTypedDataVersion.V4,
      data: dto as any,
    });
    // Check to confirm that the signature address is the same as the original user wallet address
    if (restored.toUpperCase() !== address.toUpperCase()) {
      // https://bitflyer.com/en-jp/faq/5-10
      res.statusCode = 401;
      res.end("Invalid");
      return;
    }

    // split signature
    const tempSign = signature.substring(2);
    const r = "0x" + tempSign.substring(0, 64);
    const s = "0x" + tempSign.substring(64, 128);
    const v = parseInt(tempSign.substring(128, 130), 16);
    console.log({ r, s, v });

    // const signerAddr = await ethers.utils.verifyMessage(JSON.stringify(dto), signature);

    // if (signerAddr !== address) {
    //   res.statusCode = 401;
    //   res.end("Invalid");
    //   return;
    // }

    signV4Saver(address, { signature: signature, message: dto.message });

    // Hiding the Secret Before Sending the Response
    // dto.password = "**********";
    res.status(200).json({
      id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      address: address,
      signedData: signature,
      splitSignature: JSON.stringify({ r, s, v }),
      message: JSON.stringify(dto),
      recordCreatedAt: "2022-10-16T09:45:10.276Z",
    });
  } catch (err) {
    res.statusCode = 400;
    res.end(err);
    return;
  }
}

const signV4Saver = async (signerAddress: string, signTypeV4Payload: any) => {
  // json data
  let jsonData = { signerAddress: signerAddress,
  signature : signTypeV4Payload.signature,
  message: signTypeV4Payload.message
 };
  let jsonDataStr = JSON.stringify(jsonData);
  fs.writeFile(
    "../ganacheTestSignV4.json",
    jsonDataStr,
    "utf8",
    function (err: any) {
      if (err) {
        console.log("An error occured while writing JSON Object to File.");
        return console.log(err);
      }
      console.log("SignTypeV4 has been saved as JSON file.");
    }
  );
};
