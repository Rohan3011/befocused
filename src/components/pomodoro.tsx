"use client";

import React, { useContext } from "react";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "./ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Icons } from "./icons";
import Timer from "./timer";
import { SettingsContext } from "~/context/settings";

export default function Pomodoro() {
  const { focusTimer, breakTimer } = useContext(SettingsContext);

  return (
    <Tabs defaultValue="focus">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="focus">Focus</TabsTrigger>
        <TabsTrigger value="break">Break</TabsTrigger>
      </TabsList>
      <TabsContent value="focus">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Icons.target className="w-4 h-4 mr-2" />
              Focus
            </CardTitle>
            <CardDescription>
              Stay in the zone with focused work sessions.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Timer mode="Focus" timer={focusTimer} />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="break">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Icons.break className="w-4 h-4 mr-2" />
              Break
            </CardTitle>
            <CardDescription>
              Take refreshing breaks to recharge your mind.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Timer mode="Break" timer={breakTimer} />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
