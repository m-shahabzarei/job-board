/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";


import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

export default function Provider({ children }: { children: any }) {

return(
  <SessionProvider>
    {children}
  </SessionProvider>
)

}
