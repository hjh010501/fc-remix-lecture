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
      board: {
        Row: {
          created_at: string | null
          id: number
          name: string
          path: string
        }
        Insert: {
          created_at?: string | null
          id?: number
          name: string
          path: string
        }
        Update: {
          created_at?: string | null
          id?: number
          name?: string
          path?: string
        }
      }
      comment: {
        Row: {
          content: string | null
          created_at: string | null
          id: number
          post_id: number
          writer: string
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          id?: number
          post_id: number
          writer: string
        }
        Update: {
          content?: string | null
          created_at?: string | null
          id?: number
          post_id?: number
          writer?: string
        }
      }
      post: {
        Row: {
          board_id: number | null
          content: string
          created_at: string | null
          id: number
          title: string
          view: number | null
          writer: string | null
        }
        Insert: {
          board_id?: number | null
          content: string
          created_at?: string | null
          id?: number
          title: string
          view?: number | null
          writer?: string | null
        }
        Update: {
          board_id?: number | null
          content?: string
          created_at?: string | null
          id?: number
          title?: string
          view?: number | null
          writer?: string | null
        }
      }
      user: {
        Row: {
          created_at: string | null
          name: string | null
          point: number | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          name?: string | null
          point?: number | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          name?: string | null
          point?: number | null
          user_id?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      increment: {
        Args: {
          x: number
          row_id: number
        }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
