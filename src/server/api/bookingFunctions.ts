import { PrismaClient, Booking } from "@prisma/client";

const prisma = new PrismaClient();

// Function to add a new booking
async function addBooking(bookingData: Booking): Promise<Booking> {
  const newBooking = await prisma.booking.create({
    data: bookingData,
  });

  return newBooking;
}

async function getBookings(uidn: string) {
  try {
    const res = await prisma.booking.findMany({
      where: {
        uid: {
          equals: uidn, //
        },
      },
    });
    console.log(res);
    return res;
  } catch (err) {
    console.log(err);
  } finally {
    await prisma.$disconnect(); // Don't use an async function in the finally block, directly await the $disconnect()
  }
}

async function getLatestBooking(uidn: string) {
  try {
    const res = await prisma.booking.findMany({
      where: {
        uid: {
          equals: uidn,
        },
      },
      orderBy: {
        id: "desc", // Assuming id is the auto-incrementing primary key or timestamp field
      },
    });

    console.log(res);
    return res.length > 0 ? res[0] : null; // Return the first item (latest booking) if available, otherwise return null
  } catch (err) {
    console.log(err);
    return null;
  } finally {
    await prisma.$disconnect();
  }
}

async function getBookingWithId(idn: number) {
  try {
    const res = await prisma.booking.findMany({
      where: {
        id: {
          equals: idn,
        },
      },
      orderBy: {
        id: "desc", // Assuming id is the auto-incrementing primary key or timestamp field
      },
    });

    console.log(res);
    return res.length > 0 ? res[0] : null; // Return the first item (latest booking) if available, otherwise return null
  } catch (err) {
    console.log(err);
    return null;
  } finally {
    await prisma.$disconnect();
  }
}

async function fetchLatestBooking(uid: string) {
  try {
    const response = await fetch(
      `http://localhost:3001/api/getlatestbooking/${uid}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

async function fetchBookingWithId(id: string) {
  try {
    const response = await fetch(`http://localhost:3001/api/booking/${id}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

// async function run() {
//   try {
//     const newBooking = await addBooking(
//       1, // destinationId
//       2, // hotelId
//       3, // uid
//       "John", // firstName
//       "Doe", // lastName
//       "123456789", // phoneNumber
//       "john.doe@example.com", // email
//       3, // numberOfNights
//       2, // numberOfRooms
//       new Date(), // startDate
//       new Date(), // endDate
//       2, // adults
//       1, // children
//       "Some message", // messageToHotel
//       "Double, Single", // roomTypes
//       120.0, // avgRoomCost
//       50.0, // roomRate
//       10.0, // tax
//       "Additional info" // additionalInfo
//     );

//     console.log("New booking:", newBooking);

//     const bookings = await getBookings(3);

//     console.log(
//       "This code is ran from bookingfunctions.ts async function run ()"
//     );

//     console.log("Read Booking", bookings);
//   } catch (error) {
//     console.error("Error creating booking:", error);
//   }
// }

export { addBooking, getBookings, getLatestBooking, getBookingWithId };
