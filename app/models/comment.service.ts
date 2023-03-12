import supabase from "./supabase";

export type TComment = {
  id: number;
  writer: {
    name: string;
    user_id: string;
  };
  content: string | null;
  created_at: string | null;
  post_id: number | null;
};

export async function getCommentById(id: number) {
  return await supabase.from("comment").select(`*`).eq("id", id).single();
}

export async function createComment(
  post_id: number,
  writer: string,
  content: string
) {
  return await supabase.from("comment").insert({ post_id, writer, content });
}

export async function updateComment(id: number, content: string) {
  return await supabase.from("comment").update({ content }).eq("id", id);
}

export async function deleteComment(id: number) {
  return await supabase.from("comment").delete().eq("id", id);
}
