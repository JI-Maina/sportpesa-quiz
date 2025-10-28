import "server-only";

import { cache } from "react";
import { redirect } from "next/navigation";
import { getToken } from "@/actions/session";

export const requireUser = cache(async () => {
  const userToken = await getToken();

  if (!userToken) {
    redirect("/");
  }

  return userToken;
});
