"use client";

import {
  GoogleAuthProvider,
  browserPopupRedirectResolver,
  browserSessionPersistence,
  setPersistence,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import { auth } from "~/firebase/client";
import { User } from "firebase/auth";
import { Icons } from "./icons";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { DropdownMenuContent } from "./ui/dropdown-menu";

export default function SignIn() {
  const [user, setUser] = useState<User>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleSignInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      setIsLoading(true);
      await setPersistence(auth, browserSessionPersistence);
      const result = await signInWithPopup(
        auth,
        provider,
        browserPopupRedirectResolver
      );
      setUser(result.user);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      const result = await signOut(auth);
      console.log("logged out");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((_user) => {
      if (_user) {
        setUser(_user);
      } else {
        setUser(undefined);
      }
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <>
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 px-0">
              <Avatar>
                <AvatarImage src={user.photoURL!} />
                <AvatarFallback>{user.displayName}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleLogout}>
              <Icons.logout className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button disabled={isLoading} onClick={handleSignInWithGoogle}>
          Sign with Google
          {isLoading && <Icons.spinner className="ml-2 w-4 h-4 animate-spin" />}
        </Button>
      )}
    </>
  );
}
