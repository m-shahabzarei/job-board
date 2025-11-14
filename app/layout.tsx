/* eslint-disable @typescript-eslint/no-unused-vars */
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";
import Provider from "@/lib/providers/Provider";


export default function RootLayout({ children }: { children: React.ReactNode }){
  return (
    <html lang="fa">
      <body>
        <Provider>
          <Navbar/>
        <main className="container mx-auto py-8">{children}</main>
        <Toaster />
        </Provider>
      </body>
    </html>
  );
}
