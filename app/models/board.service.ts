import supabase from "./supabase";

export type TBoard = {
  id: number;
  name: string;
  path: string;
  created_at: string | null;
};

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
