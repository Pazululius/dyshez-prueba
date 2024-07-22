"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

interface loginTypes {
  email: string;
  password: string;
}
export interface registerTypes {
  email: string;
  password: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  secundary_phone?: string;
  web_site?: string;
}

export async function login(data: loginTypes) {
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect("/login?message=Usuario no autenticado");
  }

  revalidatePath("/", "layout");
  redirect("/orders");
}

export async function signup(data: registerTypes) {
  const supabase = createClient();
  const origin = headers().get("origin");

  // type-casting here for convenience
  // in practice, you should validate your inputs

  const { error } = await supabase.auth.signUp({
    password: data.password,
    email: data.email,
    options: {
      emailRedirectTo: `${origin}/orders`,
      data: {
        first_name: data.first_name,
        last_name: data.last_name,
        phone: data.phone,
        phone_aux: data.secundary_phone,
        web_site: data.web_site,
      },
    },
  });
  if (error) {
    return redirect("/login?message=Error al intentar crear una cuenta");
  }
  return redirect("/login?message=Verifica tu email para autenticarte");

  // revalidatePath("/", "layout");
}

export async function loginGoogleAuth() {
  const supabase = createClient();
  const response = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: "http://localhost:3000/login",
    },
  });
  if (response.error) {
    redirect("/login?message=Usuario no autenticado");
  }
  if (response.data) {
    redirect(response.data.url); // use the redirect API for your server framework
  }
}
export async function loginFacebookAuth() {
  const supabase = createClient();
  const response = await supabase.auth.signInWithOAuth({
    provider: "facebook",
    options: {
      redirectTo: "http://localhost:3000/login",
    },
  });
  if (response.error) {
    redirect("/login?message=Usuario no autenticado");
  }
  if (response.data) {
    redirect(response.data.url); // use the redirect API for your server framework
  }
}

export async function redirectOauth(code: string) {
  const supabase = createClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (!error) {
    return redirect(`/orders`);
  }
}
