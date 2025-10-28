"use server";

import { loginSchema } from "@/lib/schema";
import { handleSession } from "./session";
import { cookies } from "next/headers";

export async function loginUser(prevState: any, formData: FormData) {
  const validatedFields = loginSchema.safeParse({
    phone_number: formData.get("phone_number"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Login.",
    };
  }

  const url = process.env.NEXT_PUBLIC_DJANGO_BASE_URL || "";
  const { phone_number, password } = validatedFields.data;

  try {
    const res = await fetch(`${url}/auth/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phone_number, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      const errorData = data;
      return {
        success: false,
        message: errorData.message || "Login failed",
      };
    } else {
      await handleSession(data.accessToken);

      // FIX: Look for "token" instead of "session"
      const cookieStore = await cookies();
      const tokenCookie = cookieStore.get("token"); // ← Changed to "token"
      console.log("Token cookie set:", !!tokenCookie);
      console.log("Token cookie value:", tokenCookie?.value);

      return { success: true, message: "Login Successful", data: data };
    }
  } catch (error) {
    console.error("Login error:", error);
    return {
      success: false,
      message: "An error occurred during login. Please try again.",
    };
  }
}
