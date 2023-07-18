"use client";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";
import { Icons } from "./icons";
import React from "react";

import { SettingsContext } from "~/context/settings";
import { Switch } from "./ui/switch";

export function SiteSettings() {
  const {
    focusTimer,
    handleFocusTimer,
    breakTimer,
    handleBreakTimer,
    isAudioEnabled,
    toggleAudio,
  } = React.useContext(SettingsContext);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          <Icons.settings className="w-4 h-4" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Settings</SheetTitle>
          <SheetDescription>
            You need to be logged in to save your settings.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="focus-time" className="text-right">
              Focus Time
            </Label>
            <Input
              className="col-span-3"
              type="number"
              value={focusTimer}
              onChange={handleFocusTimer}
              placeholder="min"
              min={0}
              max={60}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="break-time" className="text-right">
              Break Time
            </Label>
            <Input
              className="col-span-3"
              type="number"
              value={breakTimer}
              onChange={handleBreakTimer}
              placeholder="min"
              min={0}
              max={60}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <div className="flex items-center space-x-2">
              <Label htmlFor="settings-audio">Audio</Label>

              <Switch
                className="col-span-3"
                id="settings-audio"
                checked={isAudioEnabled}
                onClick={toggleAudio}
              />
            </div>
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
