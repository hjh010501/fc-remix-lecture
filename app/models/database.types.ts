export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      comment: {
        Row: {
          content: string | null
          created_at: string | null
          id: number
          password: string | null
          post_id: number | null
          writer: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          id?: number
          password?: string | null
          post_id?: number | null
          writer?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string | null
          id?: number
          password?: string | null
          post_id?: number | null
          writer?: string | null
        }
      }
      post: {
        Row: {
          content: string | null
          created_at: string | null
          id: number
          title: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          id?: number
          title?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string | null
          id?: number
          title?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
