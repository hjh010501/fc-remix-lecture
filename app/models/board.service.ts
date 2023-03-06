import supabase from "./supabase";

export async function getBoards() {
  return await supabase.from("board").select(`id, name, path, created_at`);
}

export async function getBoardByPath(path: string) {
  return await supabase
    .from("board")
    .select(`id, name, path, created_at`)
    .eq("path", path)
    .single();
}
