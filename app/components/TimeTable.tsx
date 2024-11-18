import { format } from "date-fns";
import prisma from "../lib/db";
import { Prisma } from "@prisma/client";

async function getData(userName: string, selectedDate: Date) {
  const currentDate = format(selectedDate, "EEE");
  const data = await prisma.availability.findFirst({
    where: {
      day: currentDate as Prisma.EnumDayFilter,
      user: {
        userName: userName,
      },
    },
    select: {
      fromTime: true,
      tillTime: true,
      id: true,
      user: {
        select: {
          grantEmail: true,
          grantId: true,
        },
      },
    },
  });
  return data;
}

interface iAppProps {
  selectedDate: Date;
  userName: string;
}

export async function TimeTable({ selectedDate, userName }: iAppProps) {
  const data = await getData(userName, selectedDate);

  return (
    <div>
      <p className="text-base font-semibold">
        {format(selectedDate, "EEE")}{" "}
        <span className="text-sm text-muted-foreground">
          {format(selectedDate, "MMM. d")}
        </span>
      </p>
    </div>
  );
}
