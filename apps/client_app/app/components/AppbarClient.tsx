"use client";
import { Appbar } from "@repo/ui/appbar";
import { signIn, signOut, useSession } from "next-auth/react";
export function AppbarClient() {
  const session = useSession();
  return (
    <div>
      
      <Appbar 
       
        onSignin={signIn}
        onSignout={async () => {
          await signOut({callbackUrl:"/"});
          
        }}
        user={session.data?.user}
      />
    </div>
  );
}
