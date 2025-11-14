"use client";

import Link from "next/link";
import { useSession, signIn, signOut,register } from "next-auth/react";

export default function Nav() {
  const { data: session } = useSession();
  return (
    <nav className="bg-white shadow p-4">
      <div className="container mx-auto flex justify-between">
        <Link href="/">JobBoard</Link>
        <div className="space-x-4">
          <Link href="/jobs">Jobs</Link>
          {session?.user ? (
            <>
              <Link href="/dashboard">Dashboard</Link>
              <button onClick={() => signOut()}>Sign out</button>
            </>
          ) : (
            <>
            <button onClick={() => signIn()}>Sign in</button>
            <button onClick={() => register()}>register</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
