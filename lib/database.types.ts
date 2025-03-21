export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      businesses: {
        Row: {
          id: string
          name: string
          description: string | null
          logo: string | null
          website: string | null
          category: string
          subcategory: string | null
          rating: number | null
          review_count: number | null
          created_at: string
          updated_at: string
          user_id: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          logo?: string | null
          website?: string | null
          category: string
          subcategory?: string | null
          rating?: number | null
          review_count?: number | null
          created_at?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          logo?: string | null
          website?: string | null
          category?: string
          subcategory?: string | null
          rating?: number | null
          review_count?: number | null
          created_at?: string
          updated_at?: string
          user_id?: string
        }
      }
      promotions: {
        Row: {
          id: string
          title: string
          description: string | null
          type: string
          category: string
          subcategory: string | null
          business_id: string
          location: string
          price: number | null
          currency: string | null
          discount: number | null
          original_price: number | null
          start_date: string
          end_date: string
          image: string | null
          images: string[] | null
          tags: string[] | null
          features: Json | null
          rank_score: number
          is_featured: boolean
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          type: string
          category: string
          subcategory?: string | null
          business_id: string
          location: string
          price?: number | null
          currency?: string | null
          discount?: number | null
          original_price?: number | null
          start_date: string
          end_date: string
          image?: string | null
          images?: string[] | null
          tags?: string[] | null
          features?: Json | null
          rank_score?: number
          is_featured?: boolean
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          type?: string
          category?: string
          subcategory?: string | null
          business_id?: string
          location?: string
          price?: number | null
          currency?: string | null
          discount?: number | null
          original_price?: number | null
          start_date?: string
          end_date?: string
          image?: string | null
          images?: string[] | null
          tags?: string[] | null
          features?: Json | null
          rank_score?: number
          is_featured?: boolean
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
      promotion_metrics: {
        Row: {
          promotion_id: string
          views: number
          clicks: number
          saves: number
          shares: number
          ctr: number
          updated_at: string
        }
        Insert: {
          promotion_id: string
          views?: number
          clicks?: number
          saves?: number
          shares?: number
          ctr?: number
          updated_at?: string
        }
        Update: {
          promotion_id?: string
          views?: number
          clicks?: number
          saves?: number
          shares?: number
          ctr?: number
          updated_at?: string
        }
      }
      promotion_analytics: {
        Row: {
          id: string
          promotion_id: string
          user_id: string | null
          action: string
          timestamp: string
          metadata: Json | null
        }
        Insert: {
          id?: string
          promotion_id: string
          user_id?: string | null
          action: string
          timestamp: string
          metadata?: Json | null
        }
        Update: {
          id?: string
          promotion_id?: string
          user_id?: string | null
          action?: string
          timestamp?: string
          metadata?: Json | null
        }
      }
      promotion_reviews: {
        Row: {
          id: string
          promotion_id: string
          user_id: string
          rating: number
          content: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          promotion_id: string
          user_id: string
          rating: number
          content?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          promotion_id?: string
          user_id?: string
          rating?: number
          content?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      // Other tables would be defined here
    }
    Functions: {
      increment_promotion_views: {
        Args: { p_id: string }
        Returns: void
      }
      increment_promotion_clicks: {
        Args: { p_id: string }
        Returns: void
      }
      calculate_promotion_rank: {
        Args: { p_id: string }
        Returns: void
      }
    }
  }
}

