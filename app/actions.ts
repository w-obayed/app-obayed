"use server";

import prisma from "./lib/db";
import { requiredUser } from "./lib/hooks";
import { parseWithZod } from "@conform-to/zod";
import { onboardingSchemaValidation } from "./lib/zodSchams";
import { redirect } from "next/navigation";

export async function OnboardingAction(prevState: any, formData: formData) {
  const session = await requiredUser();

  const submission = await parseWithZod(formData, {
    schema: onboardingSchemaValidation({
      async isUsernameUnique() {
        const exisitingUsername = await prisma.user.findUnique({
          where: {
            userName: formData.get("userName") as string,
            id: session.user?.id,
          },
        });

        return !exisitingUsername;
      },
    }),
    async: true,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const data = await prisma.user.update({
    where: {
      id: session.user?.id,
    },
    data: {
      userName: submission.value.userName,
      name: submission.value.fullName,
    },
  });

  return redirect("/onboarding/grant-id");
}
