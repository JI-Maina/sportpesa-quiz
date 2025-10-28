import "server-only";

// import { requireUser } from "../user/require-user";
import { getToken } from "@/actions/session";
import { QuizSet } from "@/types/quiz-types";

export async function getQuizSets(): Promise<QuizSet[] | null> {
  //   const token = await requireUser();
  const token =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzYxNDcyNzgzLCJpYXQiOjE3NjEzODYzODMsImp0aSI6IjdiYjc3Y2JhYWZhMjQ2ZjliNWI4ZDc0ZTdlOWFhOWRlIiwidXNlcl9pZCI6IjI1NzhkMGNiLWNiZCJ9.DalRppeUoQPCT_DQtNvJF9TWL1tmTICUzj2yYHrVjw6VQTP7Jp5NrPhzmdl8B_PI2_8mqWe9E6PKxqDx4gr4Ig";
  const url = process.env.NEXT_PUBLIC_DJANGO_BASE_URL;

  if (!url) {
    console.error("API URL not defined in environment variables.");
    return null;
  }

  try {
    const res = await fetch(
      `${url}/quiz/organizations/wsCtCaY4EFFC/questionsets/`,
      {
        method: "GET",
        cache: "no-store",
        headers: { Authorization: `JWT ${token}` },
      }
    );

    if (!res.ok) {
      console.error("Failed to fetch quiz sets:", res.status);
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching quiz sets:", error);
    return null;
  }
}
