import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

const PicturesPage = async () => {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }
  return <div>pictures</div>;
};
export default PicturesPage;
