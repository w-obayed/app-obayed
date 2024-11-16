"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/ButtonGroup";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { SubmitButton } from "@/app/components/SubmitButtions";

type videoCallProvider = "Zoom Meeting" | "Google Meet" | "Microsoft Teams";

export default function newEventRoute() {
  const [active, setActive] = useState<videoCallProvider>("Google Meet");

  return (
    <div className=" w-full h-full flex flex-1 items-center justify-center ">
      <Card>
        <CardHeader>
          <CardTitle>Add new appointment type</CardTitle>
          <CardDescription>
            Create new appointment type that allows people to book you!
          </CardDescription>
        </CardHeader>

        <form>
          <CardContent className="grid gap-y-5">
            <div className="flex flex-col gap-y-2">
              <Label>Title</Label>
              <Input placeholder="30-minute meeting" />
            </div>
            <div className="flex flex-col gap-y-2">
              <Label>URL Slug</Label>
              <div className=" flex rounded-md ">
                <span className="inline-flex items-center px-3 rounded-l-md border-r-0 border-muted bg-muted text-sm text-muted-foreground">
                  obayed.com/
                </span>
                <Input className="rounded-l-none" placeholder="Exaple-url-1" />
              </div>
            </div>
            <div className="flex flex-col gap-y-2">
              <Label>Description</Label>
              <Textarea placeholder="Meet me in this meeting to meet me" />
            </div>
            <div className="flex flex-col gap-y-2">
              <label>Duration</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Duration</SelectLabel>
                    <SelectItem value="15">15 Mins</SelectItem>
                    <SelectItem value="30">30 Mins</SelectItem>
                    <SelectItem value="45">45 Mins</SelectItem>
                    <SelectItem value="60">1 Hour</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-y-2">
              <Label>Video Call Provider</Label>
              <ButtonGroup>
                <Button
                  type="button"
                  onClick={() => setActive("Zoom Meeting")}
                  className="w-full"
                  variant={active === "Zoom Meeting" ? "secondary" : "outline"}
                >
                  Zoom
                </Button>
                <Button
                  type="button"
                  onClick={() => setActive("Google Meet")}
                  className="w-full"
                  variant={active === "Google Meet" ? "secondary" : "outline"}
                >
                  Google Meet
                </Button>
                <Button
                  type="button"
                  onClick={() => setActive("Microsoft Teams")}
                  className="w-full"
                  variant={
                    active === "Microsoft Teams" ? "secondary" : "outline"
                  }
                >
                  Microsoft Teams
                </Button>
              </ButtonGroup>
            </div>
          </CardContent>
          <CardFooter className="w-full flex justify-between">
            <Button variant="secondary">
              <Link href="/dashboard">Cancel</Link>
            </Button>
            <SubmitButton text="Create Event Type" />
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
