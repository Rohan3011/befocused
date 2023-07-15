"use client";

import React from "react";
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

export default function Pomodoro() {
  const [progress, setProgress] = React.useState(13);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);
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
              <Icons.focus className="w-4 h-4 mr-2" />
              Focus
            </CardTitle>
            <CardDescription>
              Focus timer, description for focus pomodoro
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Timer />
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
              break timer, description for break pomodoro
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Timer />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
