import supabase from "./supabase";

export async function createUser(user_id: string, name: string) {
  return await supabase.from("user").insert({ user_id, name });
}

export async function getUserByUserId(user_id: string) {
  return await supabase
    .from("user")
    .select("*")
    .eq("user_id", user_id)
    .single();
}

export async function updatePointByUserId(user_id: string, point: number) {
  return await supabase.rpc("user_point_increment", {
    x: point,
    row_id: user_id,
  });
}
