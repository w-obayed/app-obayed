import { DeleteEventTypeAction } from "@/app/actions";
import { SubmitButton } from "@/app/components/SubmitButtions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function DeleteEventType({
  params,
}: {
  params: { eventTypeId: string };
}) {
  return (
    <div className="flex flex-1  items-center justify-center ">
      <Card className="max-w-[450px] w-full">
        <CardHeader>
          <CardTitle>Delete Event Type</CardTitle>
          <CardDescription>
            Are you want to sure delete this event!
          </CardDescription>
        </CardHeader>
        <CardContent></CardContent>
        <CardFooter className="w-full flex justify-between">
          <Button variant="secondary" asChild>
            <Link href={"/dashboard"}>Cancel</Link>
          </Button>
          <form action={DeleteEventTypeAction}>
            <input type="hidden" name="id" value={params.eventTypeId} />
            <SubmitButton text="Delete Event" variant="destructive" />
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
