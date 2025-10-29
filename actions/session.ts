"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function handleSession(accessToken: string) {
  const cookieStore = await cookies();

  cookieStore.set("token", accessToken, {
    // httpOnly: true,
    // secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 12, // 12 hours
    path: "/",
    sameSite: "strict",
  });

  revalidatePath("/quiz");
}

export async function resetAuthCookies() {
  const cookieStore = await cookies();
  cookieStore.set("token", "", { path: "/", maxAge: -1 });
}

export async function getToken() {
  const cookieStore = await cookies();
  return cookieStore.get("token")?.value || null;
}
