import type { TComment } from "./comment.service";
import supabase from "./supabase";

export type TPost = {
  id: number;
  title: string | null;
  content: string | null;
  created_at: string;
  writer: {
    name: string;
    user_id: string;
  };
  board: {
    name: string;
    path: string;
  };
  view: number;
  comment: TComment | TComment[] | null | { count: number }[];
};

export async function getPosts() {
  return await supabase
    .from("post")
    .select(
      `id, title, content, writer(name), view, created_at, board(name, path)`
    )
    .order("created_at", { ascending: false });
}

export async function getPostByBoardId(board_id: number) {
  return await supabase
    .from("post")
    .select(`*, writer(name)`)
    .eq("board_id", board_id)
    .order("created_at", { ascending: false });
}

export async function getPostById(id: number) {
  return await supabase
    .from("post")
    .select(`*, writer(name, user_id), comment(*, writer(name, user_id))`)
    .order("created_at", { foreignTable: "comment", ascending: true })
    .eq("id", id)
    .single();
}

export async function updateViewById(id: number) {
  return await supabase.rpc("increment", { x: 1, row_id: id });
}

export async function createPost(
  title: string,
  content: string,
  board_id: number,
  writer: string
) {
  return await supabase
    .from("post")
    .insert({ title, content, board_id, writer });
}

export async function updatePost(id: number, title: string, content: string) {
  return await supabase.from("post").update({ title, content }).eq("id", id);
}

export async function deletePost(id: number) {
  return await supabase.from("post").delete().eq("id", id);
}
