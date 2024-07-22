"use server";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function logout() {
  const supabase = createClient();
  const origin = headers().get("origin");
  console.log(supabase);
  // type-casting here for convenience
  // in practice, you should validate your inputs

  const { error } = await supabase.auth.signOut();
  console.log(error);
  if (error) {
    return redirect("/login?message=Error al intentar salir");
  }
  return redirect("/login");

  // revalidatePath("/", "layout");
}
