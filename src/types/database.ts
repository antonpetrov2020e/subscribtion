export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Currency = 'RUB' | 'USD' | 'EUR' | 'KZT' | 'AMD'
export type BillingCycle = 'monthly' | 'yearly' | 'quarterly' | 'weekly'
export type SubscriptionStatus = 'active' | 'paused' | 'cancelled'
export type Category = 'AI' | 'Streaming' | 'Soft' | 'Education' | 'Other'
export type UserRole = 'admin' | 'assistant'

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          role: UserRole
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          role?: UserRole
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          role?: UserRole
          created_at?: string
          updated_at?: string
        }
      }
      cards: {
        Row: {
          id: string
          name: string
          currency: Currency
          last_4_digits: string | null
          color_hex: string
          user_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          currency: Currency
          last_4_digits?: string | null
          color_hex: string
          user_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          currency?: Currency
          last_4_digits?: string | null
          color_hex?: string
          user_id?: string
          created_at?: string
          updated_at?: string
        }
      }
      subscriptions: {
        Row: {
          id: string
          service_name: string
          price_original: number
          currency: Currency
          billing_cycle: BillingCycle
          start_date: string
          next_payment_date: string
          status: SubscriptionStatus
          category: Category
          card_id: string
          description: string | null
          image_url: string | null
          user_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          service_name: string
          price_original: number
          currency: Currency
          billing_cycle: BillingCycle
          start_date: string
          next_payment_date: string
          status?: SubscriptionStatus
          category: Category
          card_id: string
          description?: string | null
          image_url?: string | null
          user_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          service_name?: string
          price_original?: number
          currency?: Currency
          billing_cycle?: BillingCycle
          start_date?: string
          next_payment_date?: string
          status?: SubscriptionStatus
          category?: Category
          card_id?: string
          description?: string | null
          image_url?: string | null
          user_id?: string
          created_at?: string
          updated_at?: string
        }
      }
      exchange_rates: {
        Row: {
          id: string
          from_currency: Currency
          to_currency: Currency
          rate: number
          date: string
          created_at: string
        }
        Insert: {
          id?: string
          from_currency: Currency
          to_currency: Currency
          rate: number
          date?: string
          created_at?: string
        }
        Update: {
          id?: string
          from_currency?: Currency
          to_currency?: Currency
          rate?: number
          date?: string
          created_at?: string
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
      currency: Currency
      billing_cycle: BillingCycle
      subscription_status: SubscriptionStatus
      category: Category
      user_role: UserRole
    }
  }
}
