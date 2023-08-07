import express from 'express';
import cors from 'cors';

import { addBooking,getBookings } from '../../../server/api/bookingfunctions';
import { Booking } from '@prisma/client';

const app = express();
app.use(cors({
  origin: 'http://localhost:3000' // restrict calls to those this address
}));

app.use(express.json()); // for parsing application/json

app.post('/api/createbooking', async (req: express.Request, res: express.Response) => {
  try {
    const bookingData = req.body;
    const newBooking: Booking = await addBooking(
      bookingData.destinationID,
      bookingData.hotelID,
      bookingData.uid,
      bookingData.firstName,
      bookingData.lastName,
      bookingData.phoneNumber,
      bookingData.email,
      bookingData.numberOfNights,
      bookingData.numberOfRooms,
      new Date(bookingData.startDate),
      new Date(bookingData.endDate),
      bookingData.adults,
      bookingData.children,
      bookingData.messageToHotel,
      bookingData.roomTypes,
      bookingData.avgRoomCost,
      bookingData.roomRate,
      bookingData.tax,
      bookingData.additionalInfo
    );
    res.status(200).json(newBooking);
    console.log("create booking",200)
  } 
    catch (error) {
      const message = (error as Error).message;
      res.status(500).json({ error: message });
      console.log("create booking",500);
      console.log(message);
  }
});

app.get('/api/bookings/:uid', async (req: express.Request, res: express.Response) => {
  const uid = req.params.uid;
  if (typeof uid === 'undefined') {
    res.status(400).send('UID is required');
    return;
  }
  
  try {
    const bookings = await getBookings(parseInt(uid));
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the bookings.' });
  }
});
app.listen(3001, () => {
  console.log('Server is running on port 3001');
});