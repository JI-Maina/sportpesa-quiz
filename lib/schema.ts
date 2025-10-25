import z from "zod";

export const loginSchema = z.object({
  phone_number: z
    .string()
    .min(10, { message: "Please enter a valid phone number" })
    .max(10, { message: "Please enter a valid phone number" })
    .regex(/^0[17]\d{8}$/, {
      message:
        "Please enter a valid Kenyan phone number starting with 07 or 01",
    }),
  password: z.string().min(6, { message: "Password is required" }),
});
