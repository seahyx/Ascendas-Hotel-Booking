import { PrismaClient, Booking } from '@prisma/client';

const prisma = new PrismaClient();

// Function to add a new booking
async function addBooking(
  destinationId: number,
  hotelId: number,
  uid: number,
  firstName: string,
  lastName: string,
  phoneNumber: string,
  email: string,
  numberOfNights: number,
  numberOfRooms: number,
  startDate: Date,
  endDate: Date,
  adults: number,
  children: number,
  messageToHotel: string,
  roomTypes: string,
  avgRoomCost: number,
  roomRate: number,
  tax: number,
  additionalInfo: string
): Promise<Booking> {
  const newBooking = await prisma.booking.create({
    data: {
      destinationId,
      hotelId,
      uid,
      firstName,
      lastName,
      phoneNumber,
      email,
      numberOfNights,
      numberOfRooms,
      startDate,
      endDate,
      adults,
      children,
      messageToHotel,
      roomTypes,
      avgRoomCost,
      roomRate,
      tax,
      additionalInfo,
    },
  });

  return newBooking;
}

async function getBookings(uidn: number) {
  try {
    const res = await prisma.booking.findMany({
      where: {
        uid: {
          equals: uidn, // 
        },
      },
    });

    return (res);
  } catch (err) {
    console.log(err);
  } finally {
    await prisma.$disconnect(); // Don't use an async function in the finally block, directly await the $disconnect()
  }
}

async function run() {
  try {
    const newBooking = await addBooking(
      1, // destinationId
      2, // hotelId
      3, // uid
      'John', // firstName
      'Doe', // lastName
      '123456789', // phoneNumber
      'john.doe@example.com', // email
      3, // numberOfNights
      2, // numberOfRooms
      new Date(), // startDate
      new Date(), // endDate
      2, // adults
      1, // children
      'Some message', // messageToHotel
      'Double, Single', // roomTypes
      120.0, // avgRoomCost
      50.0, // roomRate
      10.0, // tax
      'Additional info' // additionalInfo
    );

    console.log('New booking:', newBooking);

    const bookings = await getBookings(3);

    console.log("This code is ran from bookingfunctions.ts async function run ()")

    console.log('Read Booking', bookings)
  } catch (error) {
    console.error('Error creating booking:', error);
  }
}


export { addBooking, getBookings };