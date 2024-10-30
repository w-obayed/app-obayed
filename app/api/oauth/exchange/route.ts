import prisma from "@/app/lib/db";
import { requiredUser } from "@/app/lib/hooks";
import { nylas, nylasConfig } from "@/app/lib/nylas";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const section = await requiredUser();

  const url = new URL(req.url);

  const code = url.searchParams.get("code");

  if (!code) {
    return Response.json("Hey we did not get a code", {
      status: 400,
    });
  }

  try {
    const response = await nylas.auth.exchangeCodeForToken({
      clientSecret: nylasConfig.apiKey,
      clientId: nylasConfig.clientId,
      redirectUri: nylasConfig.redirectUri,
      code: code,
    });

    const { grantId, email } = response;

    await prisma.user.update({
      where: {
        id: section.user?.id,
      },
      data: {
        grantId: grantId,
        grantEmail: email,
      },
    });
  } catch (error) {
    console.log("Error somthing went wrong", error);
  }

  redirect("/dashboard");
}
