import { headers as NextHeader } from "next/headers";

import { auth } from "@/lib/auth/auth-server";
import db from "@/lib/db/client";

export const GET = async () => {
  const requestHeaders = new Headers(await NextHeader());

  const session = await auth.api.getSession({ headers: requestHeaders });
  if (!session) return new Response("Unauthorized", { status: 401 });

  try {
    const row = await db.query.account.findFirst({
      columns: {
        accessToken: true,
      },
      where: {
        userId: session.user.id,
        providerId: "microsoft",
      },
    });

    if (!row?.accessToken)
      return new Response("Microsoft token is not found in the profile.", {
        status: 400,
      });

    const endpoints = [
      "https://graph.microsoft.com/v1.0/me/photos/64x64/$value",
      "https://graph.microsoft.com/v1.0/me",
      "https://graph.microsoft.com/v1.0/me/photo/$value",
    ];

    for (const url of endpoints) {
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${row?.accessToken}` },
      });

      if (res.status === 404) continue;
      if (!res.ok)
        return new Response(await res.text(), { status: res.status });

      const buf = Buffer.from(await res.arrayBuffer());
      const dataUrl = `data:image/jpeg;base64,${buf.toString("base64")}`;
      return new Response(JSON.stringify({ dataUrl }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "private, max-age=3600",
          Vary: "Authorization",
        },
      });
    }

    return new Response(JSON.stringify({ dataUrl: null }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch {
    return new Response(JSON.stringify({ dataUrl: null }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }
};
