export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          name: string
          email: string
          settings: Json | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          name: string
          email: string
          settings?: Json | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          name?: string
          email?: string
          settings?: Json | null
        }
      }
      chats: {
        Row: {
          id: string
          user_id: string
          contact_name: string
          last_message: string | null
          priority: 'high' | 'medium' | 'low'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          contact_name: string
          last_message?: string | null
          priority?: 'high' | 'medium' | 'low'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          contact_name?: string
          last_message?: string | null
          priority?: 'high' | 'medium' | 'low'
          created_at?: string
          updated_at?: string
        }
      }
      messages: {
        Row: {
          id: string
          chat_id: string
          content: string
          direction: 'incoming' | 'outgoing'
          timestamp: string
          read: boolean
          created_at: string
        }
        Insert: {
          id?: string
          chat_id: string
          content: string
          direction: 'incoming' | 'outgoing'
          timestamp?: string
          read?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          chat_id?: string
          content?: string
          direction?: 'incoming' | 'outgoing'
          timestamp?: string
          read?: boolean
          created_at?: string
        }
      }
      scheduled_messages: {
        Row: {
          id: string
          chat_id: string
          content: string
          send_at: string
          status: 'pending' | 'sent' | 'failed'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          chat_id: string
          content: string
          send_at: string
          status?: 'pending' | 'sent' | 'failed'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          chat_id?: string
          content?: string
          send_at?: string
          status?: 'pending' | 'sent' | 'failed'
          created_at?: string
          updated_at?: string
        }
      }
      automations: {
        Row: {
          id: string
          user_id: string
          trigger_type: 'keyword' | 'contact' | 'time'
          condition: string
          action: string
          enabled: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          trigger_type: 'keyword' | 'contact' | 'time'
          condition: string
          action: string
          enabled?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          trigger_type?: 'keyword' | 'contact' | 'time'
          condition?: string
          action?: string
          enabled?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      ai_logs: {
        Row: {
          id: string
          user_id: string
          input: string
          output: string
          model_used: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          input: string
          output: string
          model_used: string
          created_at?: string
        }
      }
    }
  }
}
