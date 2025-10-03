export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      activity_logs_user: {
        Row: {
          activity_log_id: string
          activity_type: string | null
          created_at: string | null
          description: string | null
          user_id: string | null
        }
        Insert: {
          activity_log_id?: string
          activity_type?: string | null
          created_at?: string | null
          description?: string | null
          user_id?: string | null
        }
        Update: {
          activity_log_id?: string
          activity_type?: string | null
          created_at?: string | null
          description?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      badges_master: {
        Row: {
          badge_id: string
          created_at: string | null
          description: string | null
          icon_url: string | null
          name: string | null
          updated_at: string | null
        }
        Insert: {
          badge_id?: string
          created_at?: string | null
          description?: string | null
          icon_url?: string | null
          name?: string | null
          updated_at?: string | null
        }
        Update: {
          badge_id?: string
          created_at?: string | null
          description?: string | null
          icon_url?: string | null
          name?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      cart_items: {
        Row: {
          added_at: string | null
          cart_item_id: string
          product_id: string | null
          quantity: number | null
          user_id: string | null
        }
        Insert: {
          added_at?: string | null
          cart_item_id?: string
          product_id?: string | null
          quantity?: number | null
          user_id?: string | null
        }
        Update: {
          added_at?: string | null
          cart_item_id?: string
          product_id?: string | null
          quantity?: number | null
          user_id?: string | null
        }
        Relationships: []
      }
      checkin_history: {
        Row: {
          checkin_date: string | null
          checkin_id: string
          created_at: string | null
          points_earned: number | null
          user_id: string | null
        }
        Insert: {
          checkin_date?: string | null
          checkin_id?: string
          created_at?: string | null
          points_earned?: number | null
          user_id?: string | null
        }
        Update: {
          checkin_date?: string | null
          checkin_id?: string
          created_at?: string | null
          points_earned?: number | null
          user_id?: string | null
        }
        Relationships: []
      }
      comments: {
        Row: {
          comment_id: string
          content: string | null
          created_at: string | null
          post_id: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          comment_id?: string
          content?: string | null
          created_at?: string | null
          post_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          comment_id?: string
          content?: string | null
          created_at?: string | null
          post_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      edu_content: {
        Row: {
          body: string | null
          content_id: string
          created_at: string | null
          media_url: string | null
          published_at: string | null
          title: string | null
          updated_at: string | null
        }
        Insert: {
          body?: string | null
          content_id?: string
          created_at?: string | null
          media_url?: string | null
          published_at?: string | null
          title?: string | null
          updated_at?: string | null
        }
        Update: {
          body?: string | null
          content_id?: string
          created_at?: string | null
          media_url?: string | null
          published_at?: string | null
          title?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      feedback_user: {
        Row: {
          content: string | null
          created_at: string | null
          feedback_id: string
          rating: number | null
          user_id: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          feedback_id?: string
          rating?: number | null
          user_id?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string | null
          feedback_id?: string
          rating?: number | null
          user_id?: string | null
        }
        Relationships: []
      }
      game_activity: {
        Row: {
          activity_id: string
          created_at: string | null
          mission_id: string | null
          progress: number | null
          status: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          activity_id?: string
          created_at?: string | null
          mission_id?: string | null
          progress?: number | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          activity_id?: string
          created_at?: string | null
          mission_id?: string | null
          progress?: number | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      leaderboard: {
        Row: {
          last_updated: string | null
          leaderboard_id: string
          points: number | null
          rank: number | null
          user_id: string | null
        }
        Insert: {
          last_updated?: string | null
          leaderboard_id?: string
          points?: number | null
          rank?: number | null
          user_id?: string | null
        }
        Update: {
          last_updated?: string | null
          leaderboard_id?: string
          points?: number | null
          rank?: number | null
          user_id?: string | null
        }
        Relationships: []
      }
      likes: {
        Row: {
          created_at: string | null
          like_id: string
          post_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          like_id?: string
          post_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          like_id?: string
          post_id?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      mission_progress: {
        Row: {
          completed_at: string | null
          mission_id: string | null
          mission_progress_id: string
          progress_percentage: number | null
          started_at: string | null
          status: string | null
          user_id: string | null
        }
        Insert: {
          completed_at?: string | null
          mission_id?: string | null
          mission_progress_id?: string
          progress_percentage?: number | null
          started_at?: string | null
          status?: string | null
          user_id?: string | null
        }
        Update: {
          completed_at?: string | null
          mission_id?: string | null
          mission_progress_id?: string
          progress_percentage?: number | null
          started_at?: string | null
          status?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      missions: {
        Row: {
          created_at: string | null
          description: string | null
          end_date: string | null
          mission_id: string
          reward_points: number | null
          start_date: string | null
          title: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          mission_id?: string
          reward_points?: number | null
          start_date?: string | null
          title?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          mission_id?: string
          reward_points?: number | null
          start_date?: string | null
          title?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      notifications: {
        Row: {
          is_read: boolean | null
          message: string | null
          notification_id: string
          sent_at: string | null
          title: string | null
          user_id: string | null
        }
        Insert: {
          is_read?: boolean | null
          message?: string | null
          notification_id?: string
          sent_at?: string | null
          title?: string | null
          user_id?: string | null
        }
        Update: {
          is_read?: boolean | null
          message?: string | null
          notification_id?: string
          sent_at?: string | null
          title?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      post_media: {
        Row: {
          created_at: string | null
          media_id: string
          media_type: string | null
          media_url: string | null
          post_id: string | null
        }
        Insert: {
          created_at?: string | null
          media_id?: string
          media_type?: string | null
          media_url?: string | null
          post_id?: string | null
        }
        Update: {
          created_at?: string | null
          media_id?: string
          media_type?: string | null
          media_url?: string | null
          post_id?: string | null
        }
        Relationships: []
      }
      posts: {
        Row: {
          content: string | null
          created_at: string | null
          is_public: boolean | null
          post_id: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          is_public?: boolean | null
          post_id?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string | null
          is_public?: boolean | null
          post_id?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      products: {
        Row: {
          created_at: string | null
          description: string | null
          image_url: string | null
          name: string | null
          price: number | null
          product_id: string
          stock: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          image_url?: string | null
          name?: string | null
          price?: number | null
          product_id?: string
          stock?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          image_url?: string | null
          name?: string | null
          price?: number | null
          product_id?: string
          stock?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      qr_code: {
        Row: {
          code: string | null
          created_at: string | null
          description: string | null
          owner_id: string | null
          qr_code_id: string
        }
        Insert: {
          code?: string | null
          created_at?: string | null
          description?: string | null
          owner_id?: string | null
          qr_code_id?: string
        }
        Update: {
          code?: string | null
          created_at?: string | null
          description?: string | null
          owner_id?: string | null
          qr_code_id?: string
        }
        Relationships: []
      }
      referral_logs: {
        Row: {
          referral_date: string | null
          referral_log_id: string
          referred_user_id: string | null
          referrer_user_id: string | null
        }
        Insert: {
          referral_date?: string | null
          referral_log_id?: string
          referred_user_id?: string | null
          referrer_user_id?: string | null
        }
        Update: {
          referral_date?: string | null
          referral_log_id?: string
          referred_user_id?: string | null
          referrer_user_id?: string | null
        }
        Relationships: []
      }
      shares: {
        Row: {
          post_id: string | null
          share_id: string
          shared_at: string | null
          user_id: string | null
        }
        Insert: {
          post_id?: string | null
          share_id?: string
          shared_at?: string | null
          user_id?: string | null
        }
        Update: {
          post_id?: string | null
          share_id?: string
          shared_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      transactions_history: {
        Row: {
          amount: number | null
          created_at: string | null
          status: string | null
          transaction_id: string
          transaction_type: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          amount?: number | null
          created_at?: string | null
          status?: string | null
          transaction_id?: string
          transaction_type?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          amount?: number | null
          created_at?: string | null
          status?: string | null
          transaction_id?: string
          transaction_type?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      user_badges: {
        Row: {
          awarded_at: string | null
          badge_id: string | null
          user_badge_id: string
          user_id: string | null
        }
        Insert: {
          awarded_at?: string | null
          badge_id?: string | null
          user_badge_id?: string
          user_id?: string | null
        }
        Update: {
          awarded_at?: string | null
          badge_id?: string | null
          user_badge_id?: string
          user_id?: string | null
        }
        Relationships: []
      }
      user_devices: {
        Row: {
          device_id: string
          device_token: string | null
          device_type: string | null
          last_active_at: string | null
          user_id: string | null
        }
        Insert: {
          device_id?: string
          device_token?: string | null
          device_type?: string | null
          last_active_at?: string | null
          user_id?: string | null
        }
        Update: {
          device_id?: string
          device_token?: string | null
          device_type?: string | null
          last_active_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      user_levels: {
        Row: {
          achieved_at: string | null
          level: number | null
          points_required: number | null
          user_id: string | null
          user_level_id: string
        }
        Insert: {
          achieved_at?: string | null
          level?: number | null
          points_required?: number | null
          user_id?: string | null
          user_level_id?: string
        }
        Update: {
          achieved_at?: string | null
          level?: number | null
          points_required?: number | null
          user_id?: string | null
          user_level_id?: string
        }
        Relationships: []
      }
      user_settings: {
        Row: {
          created_at: string | null
          dark_mode_enabled: boolean | null
          preferred_language: string | null
          receive_notifications: boolean | null
          user_id: string | null
          user_settings_id: string
        }
        Insert: {
          created_at?: string | null
          dark_mode_enabled?: boolean | null
          preferred_language?: string | null
          receive_notifications?: boolean | null
          user_id?: string | null
          user_settings_id?: string
        }
        Update: {
          created_at?: string | null
          dark_mode_enabled?: boolean | null
          preferred_language?: string | null
          receive_notifications?: boolean | null
          user_id?: string | null
          user_settings_id?: string
        }
        Relationships: []
      }
      user_wallets: {
        Row: {
          balance: number | null
          last_updated: string | null
          user_id: string | null
          wallet_id: string
        }
        Insert: {
          balance?: number | null
          last_updated?: string | null
          user_id?: string | null
          wallet_id?: string
        }
        Update: {
          balance?: number | null
          last_updated?: string | null
          user_id?: string | null
          wallet_id?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          alamat: string | null
          badges: string[] | null
          created_at: string | null
          email: string | null
          green_coins: number | null
          is_active: boolean | null
          last_checkin: string | null
          level_user: string | null
          nama_lengkap: string | null
          nik: string | null
          nomor_hp: string | null
          password_hash: string | null
          photo_url: string | null
          pin_hash: string | null
          poin: number | null
          referral_code: string | null
          saldo: number | null
          user_id: string
          xp: number | null
        }
        Insert: {
          alamat?: string | null
          badges?: string[] | null
          created_at?: string | null
          email?: string | null
          green_coins?: number | null
          is_active?: boolean | null
          last_checkin?: string | null
          level_user?: string | null
          nama_lengkap?: string | null
          nik?: string | null
          nomor_hp?: string | null
          password_hash?: string | null
          photo_url?: string | null
          pin_hash?: string | null
          poin?: number | null
          referral_code?: string | null
          saldo?: number | null
          user_id?: string
          xp?: number | null
        }
        Update: {
          alamat?: string | null
          badges?: string[] | null
          created_at?: string | null
          email?: string | null
          green_coins?: number | null
          is_active?: boolean | null
          last_checkin?: string | null
          level_user?: string | null
          nama_lengkap?: string | null
          nik?: string | null
          nomor_hp?: string | null
          password_hash?: string | null
          photo_url?: string | null
          pin_hash?: string | null
          poin?: number | null
          referral_code?: string | null
          saldo?: number | null
          user_id?: string
          xp?: number | null
        }
        Relationships: []
      }
      voucher_reward: {
        Row: {
          code: string | null
          created_at: string | null
          description: string | null
          discount_amount: number | null
          expiry_date: string | null
          voucher_id: string
        }
        Insert: {
          code?: string | null
          created_at?: string | null
          description?: string | null
          discount_amount?: number | null
          expiry_date?: string | null
          voucher_id?: string
        }
        Update: {
          code?: string | null
          created_at?: string | null
          description?: string | null
          discount_amount?: number | null
          expiry_date?: string | null
          voucher_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      log_security_event: {
        Args: { p_details: Json; p_event_type: string; p_user_id: string }
        Returns: undefined
      }
      validate_financial_operation: {
        Args: { p_amount: number; p_operation: string; p_user_id: string }
        Returns: boolean
      }
      validate_qr_code: {
        Args: { p_code: string; p_user_id: string }
        Returns: {
          is_valid: boolean
          message: string
          reward_amount: number
        }[]
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

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
