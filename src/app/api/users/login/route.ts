import { and, eq } from "drizzle-orm";

import { db } from "~/server/db";
import { users } from "~/server/db/schema";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const userFound = await db
    .select()
    .from(users)
    .where(and(eq(users.email, email), eq(users.password, password)))
    .limit(1);

  if (!userFound) {
    return Response.json({ error: "User not found" }, { status: 404 });
  }

  const user = userFound[0];

  return Response.json(user);
}
