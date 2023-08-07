import express from "express";
import cors from "cors";

import {
  addBooking,
  getBookings,
  getLatestBooking,
  getBookingWithId,
} from "../../../server/api/bookingfunctions";
import { Booking } from "@prisma/client";

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000", // restrict calls to those this address
  })
);

app.use(express.json()); // for parsing application/json

app.post(
  "/api/createbooking",
  async (req: express.Request, res: express.Response) => {
    try {
      const bookingData = req.body;
      const newBooking: Booking = await addBooking(bookingData);
      res.status(200).json(newBooking);
      console.log("create booking", 200);
    } catch (error) {
      const message = (error as Error).message;
      res.status(500).json({ error: message });
      console.log("create booking", 500);
      console.log(message);
    }
  }
);

app.get(
  "/api/getlatestbooking/:uid",
  async (req: express.Request, res: express.Response) => {
    const uid = req.params.uid;
    if (typeof uid === "undefined") {
      res.status(400).send("UID is required");
      console.log("getLatestBooking", 400);
      return;
    }

    try {
      const latestBooking = await getLatestBooking(uid);
      res.status(200).json(latestBooking);
      console.log("getLatestBooking", 200);
    } catch (error) {
      res.status(500).json({
        error: "An error occurred while fetching the latest booking.",
      });
      console.log("getLatestBooking", 500);
    }
  }
);

app.get(
  "/api/bookings/:uid",
  async (req: express.Request, res: express.Response) => {
    const uid = req.params.uid;
    if (typeof uid === "undefined") {
      res.status(400).send("UID is required");
      return;
    }

    try {
      const bookings = await getBookings(uid);
      res.status(200).json(bookings);
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while fetching the bookings." });
    }
  }
);

app.get(
  "/api/booking/:id",
  async (req: express.Request, res: express.Response) => {
    const id = req.params.id;
    if (typeof id === "undefined") {
      res.status(400).send("ID is required");
      console.log("booking/:id", 400);
      return;
    }

    try {
      const booking = await getBookingWithId(parseInt(id));
      res.status(200).json(booking);
      console.log("booking/:id", 200);
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while fetching the booking." });
      console.log("booking/:id", 500);
    }
  }
);

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
