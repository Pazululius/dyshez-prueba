"use client";
import { createClient } from "@/utils/supabase/client";

export const uploadImg = async (img: any) => {
  const supabase = createClient();

  const { data, error } = await supabase.storage
    .from("pictures")
    .upload(`img-${Date.now()}.png`, img);
  if (error) {
    return;
  }
  return img;
};
