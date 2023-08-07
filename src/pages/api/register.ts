import { PrismaClient } from "@prisma/client";
import { type NextApiRequest, type NextApiResponse } from "next";
import { z } from "zod";
import bcrypt from "bcryptjs";

const registerUserSchema = z.object({
  name: z
    .string()
    .regex(
      /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g,
      "Please enter alphabets only!"
    ),

  email: z
    .string()
    .regex(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/g,
      "Invalid email"
    ),

  password: z
    .string()
    .min(4, "Password should have at least a minimum of 4 character"),
});

const prisma = new PrismaClient();

export default async function registerUser(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name, email, password } = registerUserSchema.parse(req.body);

  console.log("Registration request received.");

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (user !== null) {
    console.log("User already exists.");
    return res.send({ user: null, message: "User already exists" });
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  const hashedPass = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      password: hashedPass,
    },
  });

  console.log("User created successfully.");
  return res.send({ user: newUser, message: "User created succesfully" });
}
