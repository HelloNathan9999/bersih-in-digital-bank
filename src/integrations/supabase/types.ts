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
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      admin_actions: {
        Row: {
          action: string | null
          action_id: string
          admin_id: string | null
          created_at: string
          notes: string | null
          target_id: number | null
          target_type: string | null
        }
        Insert: {
          action?: string | null
          action_id?: string
          admin_id?: string | null
          created_at?: string
          notes?: string | null
          target_id?: number | null
          target_type?: string | null
        }
        Update: {
          action?: string | null
          action_id?: string
          admin_id?: string | null
          created_at?: string
          notes?: string | null
          target_id?: number | null
          target_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "admin_actions_admin_id_fkey"
            columns: ["admin_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "admin_actions_target_id_fkey"
            columns: ["target_id"]
            isOneToOne: false
            referencedRelation: "comments"
            referencedColumns: ["comment_id"]
          },
        ]
      }
      auth_audit_log: {
        Row: {
          action: string
          created_at: string
          details: Json | null
          ip_address: unknown | null
          log_id: string
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string
          details?: Json | null
          ip_address?: unknown | null
          log_id?: string
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string
          details?: Json | null
          ip_address?: unknown | null
          log_id?: string
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "auth_audit_log_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      auth_rate_limits: {
        Row: {
          attempts: number | null
          blocked_until: string | null
          created_at: string | null
          id: string
          identifier: string
          window_start: string | null
        }
        Insert: {
          attempts?: number | null
          blocked_until?: string | null
          created_at?: string | null
          id?: string
          identifier: string
          window_start?: string | null
        }
        Update: {
          attempts?: number | null
          blocked_until?: string | null
          created_at?: string | null
          id?: string
          identifier?: string
          window_start?: string | null
        }
        Relationships: []
      }
      auth_sessions: {
        Row: {
          created_at: string
          device_id: string | null
          expires_at: string | null
          ip_address: unknown | null
          is_active: boolean | null
          last_activity: string | null
          otp: string | null
          session_id: string
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          device_id?: string | null
          expires_at?: string | null
          ip_address?: unknown | null
          is_active?: boolean | null
          last_activity?: string | null
          otp?: string | null
          session_id?: string
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          device_id?: string | null
          expires_at?: string | null
          ip_address?: unknown | null
          is_active?: boolean | null
          last_activity?: string | null
          otp?: string | null
          session_id?: string
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "auth_sessions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      badges_master: {
        Row: {
          badge_id: string
          created_at: string | null
          deskripsi: string | null
          ikon_url: string | null
          is_activeis_active: boolean | null
          kategori: string | null
          nama_badge: string
          syarat: string | null
        }
        Insert: {
          badge_id?: string
          created_at?: string | null
          deskripsi?: string | null
          ikon_url?: string | null
          is_activeis_active?: boolean | null
          kategori?: string | null
          nama_badge: string
          syarat?: string | null
        }
        Update: {
          badge_id?: string
          created_at?: string | null
          deskripsi?: string | null
          ikon_url?: string | null
          is_activeis_active?: boolean | null
          kategori?: string | null
          nama_badge?: string
          syarat?: string | null
        }
        Relationships: []
      }
      checkin_history: {
        Row: {
          bonus_poin: number | null
          checkin_id: string
          streak: number | null
          tanggal_checkin: string | null
          user_id: string
        }
        Insert: {
          bonus_poin?: number | null
          checkin_id?: string
          streak?: number | null
          tanggal_checkin?: string | null
          user_id: string
        }
        Update: {
          bonus_poin?: number | null
          checkin_id?: string
          streak?: number | null
          tanggal_checkin?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "checkin_history_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      comments: {
        Row: {
          comment_id: number
          content: string | null
          created_at: string
          post_id: string | null
          user_id: string | null
        }
        Insert: {
          comment_id?: number
          content?: string | null
          created_at?: string
          post_id?: string | null
          user_id?: string | null
        }
        Update: {
          comment_id?: number
          content?: string | null
          created_at?: string
          post_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["post_id"]
          },
          {
            foreignKeyName: "comments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      deposit_transactions: {
        Row: {
          jenis_sampah: string | null
          lokasi_setor: string | null
          qr_code_id: string | null
          total_berat: number | null
          total_poin: number | null
          total_saldo: number | null
          transaction_id: string
          user_id: string
          waktu_setor: string | null
        }
        Insert: {
          jenis_sampah?: string | null
          lokasi_setor?: string | null
          qr_code_id?: string | null
          total_berat?: number | null
          total_poin?: number | null
          total_saldo?: number | null
          transaction_id?: string
          user_id: string
          waktu_setor?: string | null
        }
        Update: {
          jenis_sampah?: string | null
          lokasi_setor?: string | null
          qr_code_id?: string | null
          total_berat?: number | null
          total_poin?: number | null
          total_saldo?: number | null
          transaction_id?: string
          user_id?: string
          waktu_setor?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "deposit_transactions_qr_code_id_fkey"
            columns: ["qr_code_id"]
            isOneToOne: false
            referencedRelation: "qr_code"
            referencedColumns: ["qr_code_id"]
          },
          {
            foreignKeyName: "deposit_transactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      edu_content: {
        Row: {
          is_active: boolean | null
          judul: string | null
          kategori: string | null
          konten: string | null
          konten_id: string
          poin_bonus: number | null
          tipe: string
          url: string | null
        }
        Insert: {
          is_active?: boolean | null
          judul?: string | null
          kategori?: string | null
          konten?: string | null
          konten_id?: string
          poin_bonus?: number | null
          tipe: string
          url?: string | null
        }
        Update: {
          is_active?: boolean | null
          judul?: string | null
          kategori?: string | null
          konten?: string | null
          konten_id?: string
          poin_bonus?: number | null
          tipe?: string
          url?: string | null
        }
        Relationships: []
      }
      game_activity: {
        Row: {
          game_id: number
          green_coin_didapat: number | null
          skor: number | null
          tipe_game: string | null
          user_id: string
          waktu_main: string | null
          xp_didapat: number | null
        }
        Insert: {
          game_id?: number
          green_coin_didapat?: number | null
          skor?: number | null
          tipe_game?: string | null
          user_id?: string
          waktu_main?: string | null
          xp_didapat?: number | null
        }
        Update: {
          game_id?: number
          green_coin_didapat?: number | null
          skor?: number | null
          tipe_game?: string | null
          user_id?: string
          waktu_main?: string | null
          xp_didapat?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "game_activity_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      leaderboard: {
        Row: {
          rank_nasional: number | null
          rank_regional: number | null
          skor_bulanan: number | null
          skor_mingguan: number
          user_id: string
        }
        Insert: {
          rank_nasional?: number | null
          rank_regional?: number | null
          skor_bulanan?: number | null
          skor_mingguan?: number
          user_id?: string
        }
        Update: {
          rank_nasional?: number | null
          rank_regional?: number | null
          skor_bulanan?: number | null
          skor_mingguan?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "leaderboard_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      likes: {
        Row: {
          created_at: string
          post_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          post_id?: string
          user_id: string
        }
        Update: {
          created_at?: string
          post_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "likes_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["post_id"]
          },
          {
            foreignKeyName: "likes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      mission_progress: {
        Row: {
          mission_id: string
          progress_id: string
          progress_value: number | null
          status: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          mission_id: string
          progress_id?: string
          progress_value?: number | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          mission_id?: string
          progress_id?: string
          progress_value?: number | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "mission_progress_mission_id_fkey"
            columns: ["mission_id"]
            isOneToOne: false
            referencedRelation: "missions"
            referencedColumns: ["mission_id"]
          },
          {
            foreignKeyName: "mission_progress_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      missions: {
        Row: {
          deskripsi: string | null
          judul_misi: string
          mission_id: string
          reward_green_coin: number | null
          reward_poin: number | null
          target: number | null
          tipe: string | null
          waktu_mulai: string | null
          waktu_selesai: string | null
        }
        Insert: {
          deskripsi?: string | null
          judul_misi: string
          mission_id?: string
          reward_green_coin?: number | null
          reward_poin?: number | null
          target?: number | null
          tipe?: string | null
          waktu_mulai?: string | null
          waktu_selesai?: string | null
        }
        Update: {
          deskripsi?: string | null
          judul_misi?: string
          mission_id?: string
          reward_green_coin?: number | null
          reward_poin?: number | null
          target?: number | null
          tipe?: string | null
          waktu_mulai?: string | null
          waktu_selesai?: string | null
        }
        Relationships: []
      }
      notifications: {
        Row: {
          is_read: boolean | null
          isi: string | null
          judul: string | null
          notif_id: string
          tanggal_kirim: string | null
          tipe_notif: string | null
          user_id: string
        }
        Insert: {
          is_read?: boolean | null
          isi?: string | null
          judul?: string | null
          notif_id?: string
          tanggal_kirim?: string | null
          tipe_notif?: string | null
          user_id: string
        }
        Update: {
          is_read?: boolean | null
          isi?: string | null
          judul?: string | null
          notif_id?: string
          tanggal_kirim?: string | null
          tipe_notif?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      orders: {
        Row: {
          alamat_pengiriman: string | null
          order_id: string
          pembayaran_dengan: string | null
          produk_id: string[]
          status: string | null
          total_harga: number | null
          user_id: string
          waktu_pesanan: string | null
        }
        Insert: {
          alamat_pengiriman?: string | null
          order_id?: string
          pembayaran_dengan?: string | null
          produk_id: string[]
          status?: string | null
          total_harga?: number | null
          user_id: string
          waktu_pesanan?: string | null
        }
        Update: {
          alamat_pengiriman?: string | null
          order_id?: string
          pembayaran_dengan?: string | null
          produk_id?: string[]
          status?: string | null
          total_harga?: number | null
          user_id?: string
          waktu_pesanan?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "orders_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      post_media: {
        Row: {
          created_at: string
          media_id: string
          media_type: string | null
          media_url: string | null
          post_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          media_id?: string
          media_type?: string | null
          media_url?: string | null
          post_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          media_id?: string
          media_type?: string | null
          media_url?: string | null
          post_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "post_media_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["post_id"]
          },
          {
            foreignKeyName: "post_media_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      posts: {
        Row: {
          content: string | null
          created_at: string | null
          image_url: string | null
          is_promoted: boolean | null
          media_duration: number | null
          media_type: string | null
          post_id: string
          status: string | null
          update_at: string | null
          user_id: string
          vidio_url: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          image_url?: string | null
          is_promoted?: boolean | null
          media_duration?: number | null
          media_type?: string | null
          post_id?: string
          status?: string | null
          update_at?: string | null
          user_id: string
          vidio_url?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string | null
          image_url?: string | null
          is_promoted?: boolean | null
          media_duration?: number | null
          media_type?: string | null
          post_id?: string
          status?: string | null
          update_at?: string | null
          user_id?: string
          vidio_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "posts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      products: {
        Row: {
          deskripsi: string | null
          harga_poin: number | null
          harga_saldo: number | null
          image_url: string | null
          is_active: boolean | null
          kategori: string | null
          nama_produk: string
          produk_id: string
          stok: number | null
        }
        Insert: {
          deskripsi?: string | null
          harga_poin?: number | null
          harga_saldo?: number | null
          image_url?: string | null
          is_active?: boolean | null
          kategori?: string | null
          nama_produk: string
          produk_id?: string
          stok?: number | null
        }
        Update: {
          deskripsi?: string | null
          harga_poin?: number | null
          harga_saldo?: number | null
          image_url?: string | null
          is_active?: boolean | null
          kategori?: string | null
          nama_produk?: string
          produk_id?: string
          stok?: number | null
        }
        Relationships: []
      }
      qr_code: {
        Row: {
          is_used: boolean | null
          jenis_sampah: string | null
          kode_unik: string
          lokasi_admin: string | null
          qr_code_id: string
          tanggal_dibuat: string | null
        }
        Insert: {
          is_used?: boolean | null
          jenis_sampah?: string | null
          kode_unik: string
          lokasi_admin?: string | null
          qr_code_id?: string
          tanggal_dibuat?: string | null
        }
        Update: {
          is_used?: boolean | null
          jenis_sampah?: string | null
          kode_unik?: string
          lokasi_admin?: string | null
          qr_code_id?: string
          tanggal_dibuat?: string | null
        }
        Relationships: []
      }
      referral_logs: {
        Row: {
          kode_referral: string | null
          referral_id: string
          referred_id: string | null
          referrer_id: string
          reward_poin: number | null
          tanggal_dibuat: string | null
        }
        Insert: {
          kode_referral?: string | null
          referral_id?: string
          referred_id?: string | null
          referrer_id: string
          reward_poin?: number | null
          tanggal_dibuat?: string | null
        }
        Update: {
          kode_referral?: string | null
          referral_id?: string
          referred_id?: string | null
          referrer_id?: string
          reward_poin?: number | null
          tanggal_dibuat?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "referral_logs_referred_id_fkey"
            columns: ["referred_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "referral_logs_referrer_id_fkey"
            columns: ["referrer_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      reports: {
        Row: {
          created_at: string
          post_id: string | null
          reason: string | null
          report_id: string
          reported_by: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          status: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          post_id?: string | null
          reason?: string | null
          report_id?: string
          reported_by?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          post_id?: string | null
          reason?: string | null
          report_id?: string
          reported_by?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reports_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["post_id"]
          },
          {
            foreignKeyName: "reports_reviewed_by_fkey"
            columns: ["reviewed_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "reports_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      settings_terms: {
        Row: {
          isi_text: string | null
          settings_id: string
          tipe: string
        }
        Insert: {
          isi_text?: string | null
          settings_id?: string
          tipe: string
        }
        Update: {
          isi_text?: string | null
          settings_id?: string
          tipe?: string
        }
        Relationships: []
      }
      shares: {
        Row: {
          post_id: string
          share_id: string
          shared_at: string | null
          user_id: string | null
        }
        Insert: {
          post_id: string
          share_id?: string
          shared_at?: string | null
          user_id?: string | null
        }
        Update: {
          post_id?: string
          share_id?: string
          shared_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "shares_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["post_id"]
          },
          {
            foreignKeyName: "shares_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      user_badges: {
        Row: {
          badge_id: string | null
          tanggal_didapat: string | null
          user_badge_id: string
          user_id: string | null
        }
        Insert: {
          badge_id?: string | null
          tanggal_didapat?: string | null
          user_badge_id?: string
          user_id?: string | null
        }
        Update: {
          badge_id?: string | null
          tanggal_didapat?: string | null
          user_badge_id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_badges_badge_id_fkey"
            columns: ["badge_id"]
            isOneToOne: false
            referencedRelation: "badges_master"
            referencedColumns: ["badge_id"]
          },
          {
            foreignKeyName: "user_badges_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      user_levels: {
        Row: {
          last_updated: string | null
          level: string | null
          user_id: string
          user_level_id: string
          xp_next_level: number | null
          xp_total: number | null
        }
        Insert: {
          last_updated?: string | null
          level?: string | null
          user_id: string
          user_level_id?: string
          xp_next_level?: number | null
          xp_total?: number | null
        }
        Update: {
          last_updated?: string | null
          level?: string | null
          user_id?: string
          user_level_id?: string
          xp_next_level?: number | null
          xp_total?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "user_levels_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      user_wallets: {
        Row: {
          is_frozen: boolean | null
          saldo: number
          update_at: string | null
          user_id: string
          withdraw_enabled: boolean | null
        }
        Insert: {
          is_frozen?: boolean | null
          saldo: number
          update_at?: string | null
          user_id?: string
          withdraw_enabled?: boolean | null
        }
        Update: {
          is_frozen?: boolean | null
          saldo?: number
          update_at?: string | null
          user_id?: string
          withdraw_enabled?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "user_wallets_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      users: {
        Row: {
          alamat: string | null
          badges: string[]
          created_at: string | null
          email: string | null
          green_coins: number | null
          is_active: boolean | null
          last_checkin: string | null
          level_user: string | null
          nama_lengkap: string | null
          nik: string
          nomor_hp: string | null
          password_hash: string | null
          photo_url: string | null
          pin_hash: string | null
          poin: number | null
          refferal_code: string | null
          saldo: number | null
          user_id: string
          xp: number | null
        }
        Insert: {
          alamat?: string | null
          badges?: string[]
          created_at?: string | null
          email?: string | null
          green_coins?: number | null
          is_active?: boolean | null
          last_checkin?: string | null
          level_user?: string | null
          nama_lengkap?: string | null
          nik: string
          nomor_hp?: string | null
          password_hash?: string | null
          photo_url?: string | null
          pin_hash?: string | null
          poin?: number | null
          refferal_code?: string | null
          saldo?: number | null
          user_id?: string
          xp?: number | null
        }
        Update: {
          alamat?: string | null
          badges?: string[]
          created_at?: string | null
          email?: string | null
          green_coins?: number | null
          is_active?: boolean | null
          last_checkin?: string | null
          level_user?: string | null
          nama_lengkap?: string | null
          nik?: string
          nomor_hp?: string | null
          password_hash?: string | null
          photo_url?: string | null
          pin_hash?: string | null
          poin?: number | null
          refferal_code?: string | null
          saldo?: number | null
          user_id?: string
          xp?: number | null
        }
        Relationships: []
      }
      voucher_reward: {
        Row: {
          jenis_reward: string | null
          nama_reward: string | null
          poin_digunakan: number | null
          reward_id: string
          status_klaim: string | null
          tanggal_tukar: string | null
          user_id: string
        }
        Insert: {
          jenis_reward?: string | null
          nama_reward?: string | null
          poin_digunakan?: number | null
          reward_id?: string
          status_klaim?: string | null
          tanggal_tukar?: string | null
          user_id: string
        }
        Update: {
          jenis_reward?: string | null
          nama_reward?: string | null
          poin_digunakan?: number | null
          reward_id?: string
          status_klaim?: string | null
          tanggal_tukar?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "voucher_reward_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      withdraw_transactions: {
        Row: {
          detail_akun: string | null
          jumlah: number | null
          metode: number | null
          status: string | null
          user_id: string
          waktu_ajuan: string | null
          withdraw_id: string
        }
        Insert: {
          detail_akun?: string | null
          jumlah?: number | null
          metode?: number | null
          status?: string | null
          user_id: string
          waktu_ajuan?: string | null
          withdraw_id?: string
        }
        Update: {
          detail_akun?: string | null
          jumlah?: number | null
          metode?: number | null
          status?: string | null
          user_id?: string
          waktu_ajuan?: string | null
          withdraw_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "withdraw_transactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      authenticate_user: {
        Args: { user_nik: string; user_password: string; user_pin: string }
        Returns: {
          message: string
          nama_lengkap: string
          nik: string
          success: boolean
          user_id: string
        }[]
      }
      automated_security_maintenance: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      check_nik_exists: {
        Args: { user_nik: string }
        Returns: boolean
      }
      check_rate_limit: {
        Args: {
          p_identifier: string
          p_max_attempts?: number
          p_window_minutes?: number
        }
        Returns: boolean
      }
      cleanup_expired_sessions: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      cleanup_old_audit_logs: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      create_secure_session: {
        Args: {
          p_device_id?: string
          p_ip_address?: unknown
          p_otp_code?: string
          p_user_agent?: string
          p_user_id: string
        }
        Returns: string
      }
      deactivate_session: {
        Args: { p_session_id: string }
        Returns: boolean
      }
      get_user_password_hash: {
        Args: { user_nik: string }
        Returns: string
      }
      get_user_pin_hash: {
        Args: { user_nik: string }
        Returns: string
      }
      get_user_safe_data: {
        Args: { target_user_id?: string }
        Returns: {
          alamat: string
          badges: string[]
          created_at: string
          email_masked: string
          green_coins: number
          is_active: boolean
          last_checkin: string
          level_user: string
          nama_lengkap_masked: string
          nik_masked: string
          nomor_hp_masked: string
          photo_url: string
          poin: number
          refferal_code: string
          saldo: number
          user_id: string
          xp: number
        }[]
      }
      hash_otp: {
        Args: { otp_code: string }
        Returns: string
      }
      log_authentication_attempt: {
        Args: {
          p_error_message?: string
          p_ip_address?: unknown
          p_nik: string
          p_success: boolean
        }
        Returns: undefined
      }
      log_security_event: {
        Args: { p_details?: Json; p_event_type: string; p_user_id?: string }
        Returns: undefined
      }
      sanitize_input: {
        Args: { input_text: string }
        Returns: string
      }
      schedule_cleanup: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      validate_financial_operation: {
        Args: { p_amount?: number; p_operation: string; p_user_id: string }
        Returns: boolean
      }
      validate_qr_code: {
        Args: { qr_code_unique: string }
        Returns: {
          is_valid: boolean
          jenis_sampah: string
          lokasi_admin: string
          qr_code_id: string
        }[]
      }
      validate_session_security: {
        Args: {
          p_current_ip?: unknown
          p_current_user_agent?: string
          p_session_id: string
        }
        Returns: boolean
      }
      verify_otp: {
        Args: { hashed_otp: string; otp_code: string }
        Returns: boolean
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
