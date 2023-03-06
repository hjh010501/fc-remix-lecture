import supabase from "./supabase";

export async function createUser(user_id: string, name: string) {
  return await supabase.from("user").insert({ user_id, name });
}
