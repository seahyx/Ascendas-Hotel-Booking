import { Booking } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import app from "next/app";
import { addBooking } from "~/server/api/bookingFunctions";

export default async function createBooking(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const bookingData = req.body;

  console.log("Booking request received.");
  const newBooking: Booking = await addBooking(bookingData);
  return res.send(newBooking);
}
