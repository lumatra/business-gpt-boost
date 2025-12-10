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
      ai_assistant_data: {
        Row: {
          assistant_type: string
          business_info: string | null
          company_id: string | null
          created_at: string
          id: string
          total_file_size: number | null
          updated_at: string
          website_content: string | null
          website_url: string | null
        }
        Insert: {
          assistant_type: string
          business_info?: string | null
          company_id?: string | null
          created_at?: string
          id?: string
          total_file_size?: number | null
          updated_at?: string
          website_content?: string | null
          website_url?: string | null
        }
        Update: {
          assistant_type?: string
          business_info?: string | null
          company_id?: string | null
          created_at?: string
          id?: string
          total_file_size?: number | null
          updated_at?: string
          website_content?: string | null
          website_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_assistant_data_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_assistant_files: {
        Row: {
          assistant_data_id: string | null
          created_at: string
          file_name: string
          file_path: string
          file_size: number
          file_type: string
          id: string
          is_image: boolean | null
        }
        Insert: {
          assistant_data_id?: string | null
          created_at?: string
          file_name: string
          file_path: string
          file_size: number
          file_type: string
          id?: string
          is_image?: boolean | null
        }
        Update: {
          assistant_data_id?: string | null
          created_at?: string
          file_name?: string
          file_path?: string
          file_size?: number
          file_type?: string
          id?: string
          is_image?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_assistant_files_assistant_data_id_fkey"
            columns: ["assistant_data_id"]
            isOneToOne: false
            referencedRelation: "ai_assistant_data"
            referencedColumns: ["id"]
          },
        ]
      }
      assistant_files: {
        Row: {
          assistant_id: string
          created_at: string
          description: string | null
          file_name: string
          file_path: string
          file_size: number
          file_type: string
          id: string
          updated_at: string
        }
        Insert: {
          assistant_id: string
          created_at?: string
          description?: string | null
          file_name: string
          file_path: string
          file_size: number
          file_type: string
          id?: string
          updated_at?: string
        }
        Update: {
          assistant_id?: string
          created_at?: string
          description?: string | null
          file_name?: string
          file_path?: string
          file_size?: number
          file_type?: string
          id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "assistant_files_assistant_id_fkey"
            columns: ["assistant_id"]
            isOneToOne: false
            referencedRelation: "assistants"
            referencedColumns: ["id"]
          },
        ]
      }
      assistant_kb_bindings: {
        Row: {
          assistant_id: string
          created_at: string
          id: string
          kb_index_id: string
        }
        Insert: {
          assistant_id: string
          created_at?: string
          id?: string
          kb_index_id: string
        }
        Update: {
          assistant_id?: string
          created_at?: string
          id?: string
          kb_index_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "assistant_kb_bindings_assistant_id_fkey"
            columns: ["assistant_id"]
            isOneToOne: false
            referencedRelation: "assistants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assistant_kb_bindings_kb_index_id_fkey"
            columns: ["kb_index_id"]
            isOneToOne: false
            referencedRelation: "kb_indices"
            referencedColumns: ["id"]
          },
        ]
      }
      assistant_requests: {
        Row: {
          assistant_type: string
          company_id: string
          created_at: string
          description: string
          id: string
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          assistant_type: string
          company_id: string
          created_at?: string
          description: string
          id?: string
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          assistant_type?: string
          company_id?: string
          created_at?: string
          description?: string
          id?: string
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "assistant_requests_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      assistant_test_configs: {
        Row: {
          business_config: Json
          created_at: string
          description: string | null
          id: string
          is_active: boolean
          test_cases: Json
          title: string
          updated_at: string
          wizard_type: string
        }
        Insert: {
          business_config?: Json
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          test_cases?: Json
          title: string
          updated_at?: string
          wizard_type: string
        }
        Update: {
          business_config?: Json
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          test_cases?: Json
          title?: string
          updated_at?: string
          wizard_type?: string
        }
        Relationships: []
      }
      assistant_type_templates: {
        Row: {
          assistant_type: string
          best_practices: string | null
          created_at: string
          id: string
          system_instructions: string
          templates: Json | null
          title: string
          updated_at: string
        }
        Insert: {
          assistant_type: string
          best_practices?: string | null
          created_at?: string
          id?: string
          system_instructions: string
          templates?: Json | null
          title: string
          updated_at?: string
        }
        Update: {
          assistant_type?: string
          best_practices?: string | null
          created_at?: string
          id?: string
          system_instructions?: string
          templates?: Json | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      assistant_versions: {
        Row: {
          assistant_id: string
          config_json: Json
          created_at: string
          id: string
          promoted_at: string | null
          status: Database["public"]["Enums"]["assistant_version_status"]
        }
        Insert: {
          assistant_id: string
          config_json?: Json
          created_at?: string
          id?: string
          promoted_at?: string | null
          status?: Database["public"]["Enums"]["assistant_version_status"]
        }
        Update: {
          assistant_id?: string
          config_json?: Json
          created_at?: string
          id?: string
          promoted_at?: string | null
          status?: Database["public"]["Enums"]["assistant_version_status"]
        }
        Relationships: [
          {
            foreignKeyName: "assistant_versions_assistant_id_fkey"
            columns: ["assistant_id"]
            isOneToOne: false
            referencedRelation: "assistants"
            referencedColumns: ["id"]
          },
        ]
      }
      assistants: {
        Row: {
          account_id: string
          api_description: string | null
          created_at: string
          description: string | null
          id: string
          information_sources: Json | null
          name: string
          prompt_suggestions: string[] | null
          status: Database["public"]["Enums"]["assistant_status"]
          twilio_enabled: boolean | null
          twilio_phone_number: string | null
          updated_at: string
        }
        Insert: {
          account_id: string
          api_description?: string | null
          created_at?: string
          description?: string | null
          id?: string
          information_sources?: Json | null
          name: string
          prompt_suggestions?: string[] | null
          status?: Database["public"]["Enums"]["assistant_status"]
          twilio_enabled?: boolean | null
          twilio_phone_number?: string | null
          updated_at?: string
        }
        Update: {
          account_id?: string
          api_description?: string | null
          created_at?: string
          description?: string | null
          id?: string
          information_sources?: Json | null
          name?: string
          prompt_suggestions?: string[] | null
          status?: Database["public"]["Enums"]["assistant_status"]
          twilio_enabled?: boolean | null
          twilio_phone_number?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "assistants_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assistants_company_fk"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_log: {
        Row: {
          action: string
          actor_user_id: string | null
          created_at: string | null
          id: string
          meta: Json | null
          subject_id: string | null
          subject_type: string | null
        }
        Insert: {
          action: string
          actor_user_id?: string | null
          created_at?: string | null
          id?: string
          meta?: Json | null
          subject_id?: string | null
          subject_type?: string | null
        }
        Update: {
          action?: string
          actor_user_id?: string | null
          created_at?: string | null
          id?: string
          meta?: Json | null
          subject_id?: string | null
          subject_type?: string | null
        }
        Relationships: []
      }
      audit_logs: {
        Row: {
          action: string
          actor_user_id: string | null
          created_at: string
          id: string
          meta: Json | null
          subject_id: string | null
          subject_type: string
        }
        Insert: {
          action: string
          actor_user_id?: string | null
          created_at?: string
          id?: string
          meta?: Json | null
          subject_id?: string | null
          subject_type: string
        }
        Update: {
          action?: string
          actor_user_id?: string | null
          created_at?: string
          id?: string
          meta?: Json | null
          subject_id?: string | null
          subject_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "audit_logs_actor_user_id_fkey"
            columns: ["actor_user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      calendar_bookings: {
        Row: {
          booking_date: string
          booking_type: string
          business_name: string | null
          call_details: string | null
          call_notes: string | null
          company_id: string
          created_at: string
          created_by: string | null
          customer_email: string | null
          customer_name: string
          customer_phone: string
          end_time: string
          id: string
          provider_user_id: string
          reason: string | null
          start_time: string
          status: string
          updated_at: string
        }
        Insert: {
          booking_date: string
          booking_type?: string
          business_name?: string | null
          call_details?: string | null
          call_notes?: string | null
          company_id: string
          created_at?: string
          created_by?: string | null
          customer_email?: string | null
          customer_name: string
          customer_phone: string
          end_time: string
          id?: string
          provider_user_id: string
          reason?: string | null
          start_time: string
          status?: string
          updated_at?: string
        }
        Update: {
          booking_date?: string
          booking_type?: string
          business_name?: string | null
          call_details?: string | null
          call_notes?: string | null
          company_id?: string
          created_at?: string
          created_by?: string | null
          customer_email?: string | null
          customer_name?: string
          customer_phone?: string
          end_time?: string
          id?: string
          provider_user_id?: string
          reason?: string | null
          start_time?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "calendar_bookings_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "calendar_bookings_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "calendar_bookings_provider_user_id_fkey"
            columns: ["provider_user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      companies: {
        Row: {
          brand_ethos: string | null
          created_at: string
          description: string | null
          email: string
          gpt_configuration: Json | null
          id: string
          location: string | null
          logo_url: string | null
          messages_used_this_period: number | null
          name: string
          number_of_employees: number | null
          owner_user_id: string | null
          period_end_date: string | null
          period_start_date: string | null
          phone: string | null
          plan: Database["public"]["Enums"]["account_plan"] | null
          status: Database["public"]["Enums"]["account_status"]
          subscription_plan_id: string | null
          subscription_tier: string | null
          twilio_enabled: boolean | null
          twilio_phone_number: string | null
          updated_at: string
          website: string | null
          website_content: Json | null
          website_scrape_status: string | null
          website_scraped_at: string | null
        }
        Insert: {
          brand_ethos?: string | null
          created_at?: string
          description?: string | null
          email: string
          gpt_configuration?: Json | null
          id?: string
          location?: string | null
          logo_url?: string | null
          messages_used_this_period?: number | null
          name: string
          number_of_employees?: number | null
          owner_user_id?: string | null
          period_end_date?: string | null
          period_start_date?: string | null
          phone?: string | null
          plan?: Database["public"]["Enums"]["account_plan"] | null
          status?: Database["public"]["Enums"]["account_status"]
          subscription_plan_id?: string | null
          subscription_tier?: string | null
          twilio_enabled?: boolean | null
          twilio_phone_number?: string | null
          updated_at?: string
          website?: string | null
          website_content?: Json | null
          website_scrape_status?: string | null
          website_scraped_at?: string | null
        }
        Update: {
          brand_ethos?: string | null
          created_at?: string
          description?: string | null
          email?: string
          gpt_configuration?: Json | null
          id?: string
          location?: string | null
          logo_url?: string | null
          messages_used_this_period?: number | null
          name?: string
          number_of_employees?: number | null
          owner_user_id?: string | null
          period_end_date?: string | null
          period_start_date?: string | null
          phone?: string | null
          plan?: Database["public"]["Enums"]["account_plan"] | null
          status?: Database["public"]["Enums"]["account_status"]
          subscription_plan_id?: string | null
          subscription_tier?: string | null
          twilio_enabled?: boolean | null
          twilio_phone_number?: string | null
          updated_at?: string
          website?: string | null
          website_content?: Json | null
          website_scrape_status?: string | null
          website_scraped_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "companies_subscription_plan_id_fkey"
            columns: ["subscription_plan_id"]
            isOneToOne: false
            referencedRelation: "subscription_plans"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_companies_owner_user_id"
            columns: ["owner_user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      company_calendar_settings: {
        Row: {
          buffer_minutes: number | null
          calendar_enabled: boolean
          company_id: string
          created_at: string
          id: string
          not_working_message: string | null
          optional_message: string | null
          optional_message_enabled: boolean | null
          out_of_hours_message: string | null
          phone_call_duration_minutes: number | null
          phone_schedule_enabled: boolean | null
          phone_schedule_end_time: string | null
          phone_schedule_start_time: string | null
          service_postcode: string | null
          service_radius_miles: number | null
          setup_completed_at: string | null
          setup_requested_at: string | null
          slot_duration_minutes: number | null
          sms_auto_respond: boolean | null
          sms_daily_schedule: Json | null
          sms_end_time: string | null
          sms_mode: string | null
          sms_start_time: string | null
          sms_working_days: number[] | null
          updated_at: string
        }
        Insert: {
          buffer_minutes?: number | null
          calendar_enabled?: boolean
          company_id: string
          created_at?: string
          id?: string
          not_working_message?: string | null
          optional_message?: string | null
          optional_message_enabled?: boolean | null
          out_of_hours_message?: string | null
          phone_call_duration_minutes?: number | null
          phone_schedule_enabled?: boolean | null
          phone_schedule_end_time?: string | null
          phone_schedule_start_time?: string | null
          service_postcode?: string | null
          service_radius_miles?: number | null
          setup_completed_at?: string | null
          setup_requested_at?: string | null
          slot_duration_minutes?: number | null
          sms_auto_respond?: boolean | null
          sms_daily_schedule?: Json | null
          sms_end_time?: string | null
          sms_mode?: string | null
          sms_start_time?: string | null
          sms_working_days?: number[] | null
          updated_at?: string
        }
        Update: {
          buffer_minutes?: number | null
          calendar_enabled?: boolean
          company_id?: string
          created_at?: string
          id?: string
          not_working_message?: string | null
          optional_message?: string | null
          optional_message_enabled?: boolean | null
          out_of_hours_message?: string | null
          phone_call_duration_minutes?: number | null
          phone_schedule_enabled?: boolean | null
          phone_schedule_end_time?: string | null
          phone_schedule_start_time?: string | null
          service_postcode?: string | null
          service_radius_miles?: number | null
          setup_completed_at?: string | null
          setup_requested_at?: string | null
          slot_duration_minutes?: number | null
          sms_auto_respond?: boolean | null
          sms_daily_schedule?: Json | null
          sms_end_time?: string | null
          sms_mode?: string | null
          sms_start_time?: string | null
          sms_working_days?: number[] | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "company_calendar_settings_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: true
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      company_kb_selections: {
        Row: {
          company_id: string
          created_at: string
          id: string
          kb_index_id: string
        }
        Insert: {
          company_id: string
          created_at?: string
          id?: string
          kb_index_id: string
        }
        Update: {
          company_id?: string
          created_at?: string
          id?: string
          kb_index_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "company_kb_selections_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "company_kb_selections_kb_index_id_fkey"
            columns: ["kb_index_id"]
            isOneToOne: false
            referencedRelation: "kb_indices"
            referencedColumns: ["id"]
          },
        ]
      }
      company_tokens: {
        Row: {
          balance: number
          company_id: string
          created_at: string
          id: string
          total_purchased: number
          total_used: number
          updated_at: string
        }
        Insert: {
          balance?: number
          company_id: string
          created_at?: string
          id?: string
          total_purchased?: number
          total_used?: number
          updated_at?: string
        }
        Update: {
          balance?: number
          company_id?: string
          created_at?: string
          id?: string
          total_purchased?: number
          total_used?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "company_tokens_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: true
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      complaints_wizard_configs: {
        Row: {
          assistant_id: string
          business_name: string
          common_issues: string | null
          compensation_style: string | null
          contact_details: string
          created_at: string | null
          id: string
          local_dialect: string | null
          location: string | null
          owner_name: string
          refund_policy: string
          response_style: string
          service_type: string
          updated_at: string | null
          urgent_threshold: string
        }
        Insert: {
          assistant_id: string
          business_name: string
          common_issues?: string | null
          compensation_style?: string | null
          contact_details: string
          created_at?: string | null
          id?: string
          local_dialect?: string | null
          location?: string | null
          owner_name: string
          refund_policy: string
          response_style: string
          service_type: string
          updated_at?: string | null
          urgent_threshold: string
        }
        Update: {
          assistant_id?: string
          business_name?: string
          common_issues?: string | null
          compensation_style?: string | null
          contact_details?: string
          created_at?: string | null
          id?: string
          local_dialect?: string | null
          location?: string | null
          owner_name?: string
          refund_policy?: string
          response_style?: string
          service_type?: string
          updated_at?: string | null
          urgent_threshold?: string
        }
        Relationships: [
          {
            foreignKeyName: "complaints_wizard_configs_assistant_id_fkey"
            columns: ["assistant_id"]
            isOneToOne: false
            referencedRelation: "assistants"
            referencedColumns: ["id"]
          },
        ]
      }
      conversations: {
        Row: {
          account_id: string
          assistant_id: string
          created_at: string
          id: string
          status: Database["public"]["Enums"]["conversation_status"]
          updated_at: string
          user_id: string | null
        }
        Insert: {
          account_id: string
          assistant_id: string
          created_at?: string
          id?: string
          status?: Database["public"]["Enums"]["conversation_status"]
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          account_id?: string
          assistant_id?: string
          created_at?: string
          id?: string
          status?: Database["public"]["Enums"]["conversation_status"]
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "conversations_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conversations_assistant_id_fkey"
            columns: ["assistant_id"]
            isOneToOne: false
            referencedRelation: "assistants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conversations_company_fk"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conversations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      faq_wizard_configs: {
        Row: {
          agent_name: string | null
          assistant_id: string
          business_name: string
          can_source_materials: boolean | null
          contact_details: string
          created_at: string | null
          extra_notes: string | null
          id: string
          location: string
          materials_note: string | null
          opening_hours: string
          owner_name: string
          pricing_info: string
          pricing_type: string
          service_area: string
          service_area_strict: boolean | null
          services_list: string
          updated_at: string | null
          weekend_policy: string
        }
        Insert: {
          agent_name?: string | null
          assistant_id: string
          business_name: string
          can_source_materials?: boolean | null
          contact_details: string
          created_at?: string | null
          extra_notes?: string | null
          id?: string
          location: string
          materials_note?: string | null
          opening_hours: string
          owner_name: string
          pricing_info: string
          pricing_type: string
          service_area: string
          service_area_strict?: boolean | null
          services_list: string
          updated_at?: string | null
          weekend_policy: string
        }
        Update: {
          agent_name?: string | null
          assistant_id?: string
          business_name?: string
          can_source_materials?: boolean | null
          contact_details?: string
          created_at?: string | null
          extra_notes?: string | null
          id?: string
          location?: string
          materials_note?: string | null
          opening_hours?: string
          owner_name?: string
          pricing_info?: string
          pricing_type?: string
          service_area?: string
          service_area_strict?: boolean | null
          services_list?: string
          updated_at?: string | null
          weekend_policy?: string
        }
        Relationships: [
          {
            foreignKeyName: "faq_wizard_configs_assistant_id_fkey"
            columns: ["assistant_id"]
            isOneToOne: false
            referencedRelation: "assistants"
            referencedColumns: ["id"]
          },
        ]
      }
      inquiries: {
        Row: {
          company_name: string
          company_size: string | null
          contact_name: string
          created_at: string
          email: string
          id: string
          message: string | null
          phone: string | null
          status: string | null
          use_case: string | null
        }
        Insert: {
          company_name: string
          company_size?: string | null
          contact_name: string
          created_at?: string
          email: string
          id?: string
          message?: string | null
          phone?: string | null
          status?: string | null
          use_case?: string | null
        }
        Update: {
          company_name?: string
          company_size?: string | null
          contact_name?: string
          created_at?: string
          email?: string
          id?: string
          message?: string | null
          phone?: string | null
          status?: string | null
          use_case?: string | null
        }
        Relationships: []
      }
      kb_indices: {
        Row: {
          account_id: string | null
          api_instructions: string | null
          created_at: string
          description: string | null
          id: string
          metadata: Json | null
          namespace: string
          objective: string | null
          type: Database["public"]["Enums"]["kb_type"]
          updated_at: string
          variable_mappings: Json | null
        }
        Insert: {
          account_id?: string | null
          api_instructions?: string | null
          created_at?: string
          description?: string | null
          id?: string
          metadata?: Json | null
          namespace: string
          objective?: string | null
          type: Database["public"]["Enums"]["kb_type"]
          updated_at?: string
          variable_mappings?: Json | null
        }
        Update: {
          account_id?: string | null
          api_instructions?: string | null
          created_at?: string
          description?: string | null
          id?: string
          metadata?: Json | null
          namespace?: string
          objective?: string | null
          type?: Database["public"]["Enums"]["kb_type"]
          updated_at?: string
          variable_mappings?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "kb_indices_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          account_id: string
          attachments: Json | null
          content: string
          conversation_id: string
          created_at: string
          id: string
          role: Database["public"]["Enums"]["message_role"]
          tokens_in: number | null
          tokens_out: number | null
        }
        Insert: {
          account_id: string
          attachments?: Json | null
          content: string
          conversation_id: string
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["message_role"]
          tokens_in?: number | null
          tokens_out?: number | null
        }
        Update: {
          account_id?: string
          attachments?: Json | null
          content?: string
          conversation_id?: string
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["message_role"]
          tokens_in?: number | null
          tokens_out?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "messages_company_fk"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          booking_id: string | null
          company_id: string
          created_at: string
          id: string
          message: string
          read: boolean
          title: string
          type: string
          user_id: string
        }
        Insert: {
          booking_id?: string | null
          company_id: string
          created_at?: string
          id?: string
          message: string
          read?: boolean
          title: string
          type: string
          user_id: string
        }
        Update: {
          booking_id?: string | null
          company_id?: string
          created_at?: string
          id?: string
          message?: string
          read?: boolean
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "calendar_bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notifications_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      onboarding_data: {
        Row: {
          created_at: string
          data_content: Json
          data_type: string
          id: string
          session_id: string | null
        }
        Insert: {
          created_at?: string
          data_content: Json
          data_type: string
          id?: string
          session_id?: string | null
        }
        Update: {
          created_at?: string
          data_content?: Json
          data_type?: string
          id?: string
          session_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "onboarding_data_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "onboarding_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      onboarding_files: {
        Row: {
          created_at: string
          description: string | null
          file_name: string
          file_path: string
          file_size: number
          file_type: string
          id: string
          session_id: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          file_name: string
          file_path: string
          file_size: number
          file_type: string
          id?: string
          session_id?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          file_name?: string
          file_path?: string
          file_size?: number
          file_type?: string
          id?: string
          session_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "onboarding_files_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "onboarding_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      onboarding_sessions: {
        Row: {
          access_token: string
          client_email: string
          client_name: string
          company_id: string | null
          completed_at: string | null
          created_at: string
          created_by: string | null
          expires_at: string
          id: string
          status: string
          steps_completed: Json | null
          updated_at: string
        }
        Insert: {
          access_token: string
          client_email: string
          client_name: string
          company_id?: string | null
          completed_at?: string | null
          created_at?: string
          created_by?: string | null
          expires_at: string
          id?: string
          status?: string
          steps_completed?: Json | null
          updated_at?: string
        }
        Update: {
          access_token?: string
          client_email?: string
          client_name?: string
          company_id?: string | null
          completed_at?: string | null
          created_at?: string
          created_by?: string | null
          expires_at?: string
          id?: string
          status?: string
          steps_completed?: Json | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "onboarding_sessions_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      one_time_tokens_used: {
        Row: {
          jti: string
          purpose: string
          used_at: string
        }
        Insert: {
          jti: string
          purpose: string
          used_at?: string
        }
        Update: {
          jti?: string
          purpose?: string
          used_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          company_id: string | null
          created_at: string
          email: string | null
          first_name: string | null
          id: string
          is_company_admin: boolean | null
          last_login_at: string | null
          last_name: string | null
          role: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          company_id?: string | null
          created_at?: string
          email?: string | null
          first_name?: string | null
          id?: string
          is_company_admin?: boolean | null
          last_login_at?: string | null
          last_name?: string | null
          role?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          company_id?: string | null
          created_at?: string
          email?: string | null
          first_name?: string | null
          id?: string
          is_company_admin?: boolean | null
          last_login_at?: string | null
          last_name?: string | null
          role?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      sms_messages: {
        Row: {
          assistant_id: string | null
          company_id: string | null
          conversation_id: string | null
          created_at: string
          direction: string
          from_number: string
          id: string
          message_body: string
          message_sid: string | null
          status: string | null
          to_number: string | null
          updated_at: string
        }
        Insert: {
          assistant_id?: string | null
          company_id?: string | null
          conversation_id?: string | null
          created_at?: string
          direction: string
          from_number: string
          id?: string
          message_body: string
          message_sid?: string | null
          status?: string | null
          to_number?: string | null
          updated_at?: string
        }
        Update: {
          assistant_id?: string | null
          company_id?: string | null
          conversation_id?: string | null
          created_at?: string
          direction?: string
          from_number?: string
          id?: string
          message_body?: string
          message_sid?: string | null
          status?: string | null
          to_number?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "sms_messages_assistant_id_fkey"
            columns: ["assistant_id"]
            isOneToOne: false
            referencedRelation: "assistants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sms_messages_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sms_messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      subscription_plans: {
        Row: {
          created_at: string
          features: string[] | null
          id: string
          max_assistants: number
          max_users: number
          monthly_tokens: number
          name: string
          price_cents: number
          stripe_price_id: string
          stripe_product_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          features?: string[] | null
          id?: string
          max_assistants: number
          max_users?: number
          monthly_tokens: number
          name: string
          price_cents: number
          stripe_price_id: string
          stripe_product_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          features?: string[] | null
          id?: string
          max_assistants?: number
          max_users?: number
          monthly_tokens?: number
          name?: string
          price_cents?: number
          stripe_price_id?: string
          stripe_product_id?: string
          updated_at?: string
        }
        Relationships: []
      }
      system_settings: {
        Row: {
          created_at: string
          description: string | null
          id: string
          setting_key: string
          setting_value: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          setting_key: string
          setting_value: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          setting_key?: string
          setting_value?: string
          updated_at?: string
        }
        Relationships: []
      }
      token_transactions: {
        Row: {
          amount: number
          company_id: string | null
          conversation_id: string | null
          created_at: string
          description: string | null
          id: string
          stripe_payment_intent_id: string | null
          type: string
          user_id: string
        }
        Insert: {
          amount: number
          company_id?: string | null
          conversation_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          stripe_payment_intent_id?: string | null
          type: string
          user_id: string
        }
        Update: {
          amount?: number
          company_id?: string | null
          conversation_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          stripe_payment_intent_id?: string | null
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "token_transactions_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "token_transactions_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      user_availability: {
        Row: {
          buffer_minutes: number
          company_id: string
          created_at: string
          enabled: boolean
          end_time: string
          id: string
          slot_duration: number
          start_time: string
          updated_at: string
          user_id: string
          working_days: number[]
        }
        Insert: {
          buffer_minutes?: number
          company_id: string
          created_at?: string
          enabled?: boolean
          end_time?: string
          id?: string
          slot_duration?: number
          start_time?: string
          updated_at?: string
          user_id: string
          working_days?: number[]
        }
        Update: {
          buffer_minutes?: number
          company_id?: string
          created_at?: string
          enabled?: boolean
          end_time?: string
          id?: string
          slot_duration?: number
          start_time?: string
          updated_at?: string
          user_id?: string
          working_days?: number[]
        }
        Relationships: [
          {
            foreignKeyName: "user_availability_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_availability_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      user_sessions: {
        Row: {
          access_token_enc: string | null
          created_at: string
          expires_at: string
          id: string
          ip_address: unknown
          last_accessed_at: string
          refresh_token_enc: string | null
          session_token: string
          session_token_hash: string | null
          user_agent: string | null
          user_id: string
        }
        Insert: {
          access_token_enc?: string | null
          created_at?: string
          expires_at: string
          id?: string
          ip_address?: unknown
          last_accessed_at?: string
          refresh_token_enc?: string | null
          session_token: string
          session_token_hash?: string | null
          user_agent?: string | null
          user_id: string
        }
        Update: {
          access_token_enc?: string | null
          created_at?: string
          expires_at?: string
          id?: string
          ip_address?: unknown
          last_accessed_at?: string
          refresh_token_enc?: string | null
          session_token?: string
          session_token_hash?: string | null
          user_agent?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_subscriptions: {
        Row: {
          created_at: string
          current_period_end: string | null
          current_period_start: string | null
          id: string
          messages_included: number | null
          messages_used_this_period: number | null
          plan_id: string | null
          status: string
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          tokens_used_this_period: number
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          messages_included?: number | null
          messages_used_this_period?: number | null
          plan_id?: string | null
          status?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          tokens_used_this_period?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          messages_included?: number | null
          messages_used_this_period?: number | null
          plan_id?: string | null
          status?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          tokens_used_this_period?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_subscriptions_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "subscription_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      user_tokens: {
        Row: {
          balance: number
          created_at: string
          id: string
          total_purchased: number
          total_used: number
          updated_at: string
          user_id: string
        }
        Insert: {
          balance?: number
          created_at?: string
          id?: string
          total_purchased?: number
          total_used?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          balance?: number
          created_at?: string
          id?: string
          total_purchased?: number
          total_used?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      add_company_tokens: {
        Args: {
          _amount: number
          _company_id: string
          _description?: string
          _purchased_by_user_id?: string
          _stripe_payment_intent_id?: string
        }
        Returns: undefined
      }
      add_user_tokens: {
        Args: {
          _amount: number
          _description?: string
          _stripe_payment_intent_id?: string
          _user_id: string
        }
        Returns: undefined
      }
      assign_admin_role_by_email: {
        Args: { _email: string }
        Returns: undefined
      }
      cleanup_expired_onboarding_sessions: { Args: never; Returns: undefined }
      cleanup_expired_sessions: { Args: never; Returns: undefined }
      deduct_company_message: {
        Args: { _company_id: string }
        Returns: boolean
      }
      deduct_company_tokens: {
        Args: {
          _amount: number
          _company_id: string
          _conversation_id?: string
          _description?: string
          _user_id?: string
        }
        Returns: boolean
      }
      deduct_user_tokens: {
        Args: {
          _amount: number
          _conversation_id?: string
          _description?: string
          _user_id: string
        }
        Returns: boolean
      }
      generate_onboarding_token: { Args: never; Returns: string }
      get_user_company_id: { Args: { _user_id: string }; Returns: string }
      has_message_allowance: { Args: { _company_id: string }; Returns: boolean }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_calendar_enabled_company: {
        Args: { _company_id: string }
        Returns: boolean
      }
      is_company_admin: { Args: { _user_id: string }; Returns: boolean }
      reset_monthly_message_counts: { Args: never; Returns: undefined }
      revoke_all_user_sessions: {
        Args: { _user_id: string }
        Returns: undefined
      }
      revoke_company_sessions: {
        Args: { _company_id: string }
        Returns: undefined
      }
    }
    Enums: {
      account_plan: "trial" | "starter" | "professional" | "enterprise"
      account_status: "active" | "suspended" | "cancelled"
      app_role: "admin" | "company_admin" | "company_user"
      assistant_status: "draft" | "active" | "inactive" | "archived"
      assistant_version_status: "draft" | "live" | "archived"
      company_status: "lead" | "trial" | "active" | "suspended"
      conversation_status: "active" | "archived"
      kb_type: "global" | "tenant"
      message_role: "user" | "assistant" | "system"
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
    Enums: {
      account_plan: ["trial", "starter", "professional", "enterprise"],
      account_status: ["active", "suspended", "cancelled"],
      app_role: ["admin", "company_admin", "company_user"],
      assistant_status: ["draft", "active", "inactive", "archived"],
      assistant_version_status: ["draft", "live", "archived"],
      company_status: ["lead", "trial", "active", "suspended"],
      conversation_status: ["active", "archived"],
      kb_type: ["global", "tenant"],
      message_role: ["user", "assistant", "system"],
    },
  },
} as const
