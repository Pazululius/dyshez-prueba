import { createClient } from "@/utils/supabase/server";

import { UserProvider } from "@/providers/userProvider";
import type { Metadata } from "next";
import { cookies, headers } from "next/headers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dyshez",
  description: "Prueba tecnica",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const origin = headers().get("origin");
  return (
    <html lang="es">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, user-scalable=no"
        />
      </head>
      <body id="root">
        <UserProvider user={user}>{children}</UserProvider>
      </body>
    </html>
  );
}
