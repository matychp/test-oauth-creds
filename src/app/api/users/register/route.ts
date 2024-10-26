import { db } from "~/server/db";
import { users } from "~/server/db/schema";

export async function POST(req: Request) {
  const { email, password } = await req.json();
  console.log({ email, password });

  if (email === undefined || password === undefined) {
    return Response.json(
      { error: "Email and password are required" },
      { status: 400 },
    );
  }

  await db.insert(users).values({
    email,
    password,
  });

  return Response.json({ ok: true, error: null });
}
