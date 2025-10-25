"use server";

import { cookies } from "next/headers";

export async function handleSession(
  accessToken: string,
  nickname: string,
  phoneNo: string,
  isAdmin: boolean
) {
  const cookieStore = await cookies();

  const sessionData = {
    accessToken,
    nickname,
    phoneNo,
    isAdmin,
  };

  cookieStore.set("session", JSON.stringify(sessionData), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 12, // 12 hours
    path: "/",
    sameSite: "strict",
  });
}

export async function getSession() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session")?.value;

  if (!sessionCookie) {
    return null;
  }

  try {
    return JSON.parse(sessionCookie);
  } catch (error) {
    console.error("Failed to parse session cookie:", error);
    return null;
  }
}

export async function resetAuthCookies() {
  const cookieStore = await cookies();
  cookieStore.set("session", "", { path: "/", maxAge: -1 });
}

export async function getToken() {
  const session = await getSession();
  return session?.accessToken || null;
}

export async function getUserRole() {
  const session = await getSession();
  return session?.is_admin || null;
}
