"use server";

import prisma from "./lib/db";
import { requiredUser } from "./lib/hooks";
import { parseWithZod } from "@conform-to/zod";
import {
  eventTypeSchema,
  onboardingSchemaValidation,
  settingsSchema,
} from "./lib/zodSchams";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function OnboardingAction(prevState: any, formData: FormData) {
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

  await prisma.user.update({
    where: {
      id: session.user?.id,
    },
    data: {
      userName: submission.value.userName,
      name: submission.value.fullName,
      availability: {
        create: [
          {
            day: "Monday",
            fromTime: "08:00",
            tillTime: "18:00",
          },
          {
            day: "Tuesday",
            fromTime: "08:00",
            tillTime: "18:00",
          },
          {
            day: "Wednesday",
            fromTime: "08:00",
            tillTime: "18:00",
          },
          {
            day: "Thursday",
            fromTime: "08:00",
            tillTime: "18:00",
          },
          {
            day: "Friday",
            fromTime: "08:00",
            tillTime: "18:00",
          },
          {
            day: "Saturday",
            fromTime: "08:00",
            tillTime: "18:00",
          },
          {
            day: "Sunday",
            fromTime: "08:00",
            tillTime: "18:00",
          },
        ],
      },
    },
  });

  return redirect("/onboarding/grant-id");
}

export async function SettingsAction(prevState: any, formData: FormData) {
  const session = await requiredUser();

  const submission = parseWithZod(formData, {
    schema: settingsSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  await prisma.user.update({
    where: {
      id: session.user?.id,
    },
    data: {
      name: submission.value.fullName,
      image: submission.value.profileImage,
    },
  });

  return redirect("/dashboard");
}

export async function updateAvailabilityAction(formData: FormData) {
  const session = await requiredUser();

  const rawData = Object.fromEntries(formData.entries());

  const availability = Object.keys(rawData)
    .filter((key) => key.startsWith("id-"))
    .map((key) => {
      const id = key.replace("id-", "");
      return {
        id,
        isActive: rawData[`isActive-${id}`] === "on",
        fromTime: rawData[`fromTime-${id}`] as string,
        tillTime: rawData[`tillTime-${id}`] as string,
      };
    });

  try {
    await prisma.$transaction(
      availability.map((item) =>
        prisma.availability.update({
          where: {
            id: item.id,
          },
          data: {
            isActive: item.isActive,
            fromTime: item.fromTime,
            tillTime: item.tillTime,
          },
        })
      )
    );

    revalidatePath("/dashboard/availablity");
  } catch (error) {
    console.log(error);
  }
}

export async function CreateEventTypeAction(
  prevState: any,
  formData: FormData
) {
  const session = await requiredUser();

  const submission = parseWithZod(formData, {
    schema: eventTypeSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  await prisma.eventType.create({
    data: {
      title: submission.value.title,
      duration: submission.value.duration,
      url: submission.value.url,
      description: submission.value.description,
      videoCallSoftware: submission.value.videoCallSoftware,
      userId: session.user?.id,
    },
  });

  return redirect("/dashboard");
}
