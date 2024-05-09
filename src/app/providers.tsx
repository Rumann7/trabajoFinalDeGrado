"use client";

import Header from "@/components/header";
import { SessionProvider } from "next-auth/react";

interface Props {
  children: React.ReactNode;
}

function Providers({ children }: Props) {
  return (
    <SessionProvider>
      <Header />
      {children}
    </SessionProvider>
  );
}

export default Providers;
