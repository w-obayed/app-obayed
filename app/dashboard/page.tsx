import { notFound } from "next/navigation";
import prisma from "../lib/db";
import { requiredUser } from "../lib/hooks";
import { EmptyState } from "../components/emptyState";

async function getData(userId: string) {
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      userName: true,
      eventType: {
        select: {
          id: true,
          active: true,
          title: true,
          url: true,
          duration: true,
        },
      },
    },
  });

  if (!data) {
    return notFound();
  }
  return data;
}

const DashboardPage = async () => {
  const session = await requiredUser();

  const data = await getData(session.user?.id as string);

  return (
    <>
      {data.eventType.length === 0 ? (
        <EmptyState
          title="You have no Event Types"
          description="You can create your first event type by clicking the button below"
          buttonText="Add event type"
          href="/dashboard/new"
        />
      ) : (
        <p>hey we have event type</p>
      )}
    </>
  );
};

export default DashboardPage;
