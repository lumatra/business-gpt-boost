-- Create onboarding sessions table
CREATE TABLE public.onboarding_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id UUID REFERENCES public.companies(id) ON DELETE CASCADE,
  access_token TEXT NOT NULL UNIQUE,
  client_name TEXT NOT NULL,
  client_email TEXT NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  completed_at TIMESTAMP WITH TIME ZONE,
  steps_completed JSONB DEFAULT '[]'::jsonb
);

-- Create onboarding data table for collected information
CREATE TABLE public.onboarding_data (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID REFERENCES public.onboarding_sessions(id) ON DELETE CASCADE,
  data_type TEXT NOT NULL, -- 'company_info', 'technical_requirements', 'access_credentials', etc.
  data_content JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create onboarding files table
CREATE TABLE public.onboarding_files (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID REFERENCES public.onboarding_sessions(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size BIGINT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.onboarding_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.onboarding_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.onboarding_files ENABLE ROW LEVEL SECURITY;

-- RLS policies for onboarding_sessions
CREATE POLICY "Admins can manage all onboarding sessions" 
ON public.onboarding_sessions 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Company users can view their company's sessions" 
ON public.onboarding_sessions 
FOR SELECT 
USING (company_id IN (
  SELECT profiles.company_id 
  FROM profiles 
  WHERE profiles.user_id = auth.uid()
));

-- RLS policies for onboarding_data
CREATE POLICY "Admins can manage all onboarding data" 
ON public.onboarding_data 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Company users can view their company's onboarding data" 
ON public.onboarding_data 
FOR SELECT 
USING (session_id IN (
  SELECT id FROM public.onboarding_sessions 
  WHERE company_id IN (
    SELECT profiles.company_id 
    FROM profiles 
    WHERE profiles.user_id = auth.uid()
  )
));

-- RLS policies for onboarding_files
CREATE POLICY "Admins can manage all onboarding files" 
ON public.onboarding_files 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Company users can view their company's onboarding files" 
ON public.onboarding_files 
FOR SELECT 
USING (session_id IN (
  SELECT id FROM public.onboarding_sessions 
  WHERE company_id IN (
    SELECT profiles.company_id 
    FROM profiles 
    WHERE profiles.user_id = auth.uid()
  )
));

-- Create storage bucket for onboarding files
INSERT INTO storage.buckets (id, name, public) VALUES ('onboarding-files', 'onboarding-files', false);

-- Storage policies for onboarding files
CREATE POLICY "Admins can manage onboarding files" 
ON storage.objects 
FOR ALL 
USING (bucket_id = 'onboarding-files' AND has_role(auth.uid(), 'admin'::app_role));

-- Function to generate secure access tokens
CREATE OR REPLACE FUNCTION public.generate_onboarding_token()
RETURNS TEXT
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT encode(gen_random_bytes(32), 'base64url');
$$;

-- Function to clean up expired sessions
CREATE OR REPLACE FUNCTION public.cleanup_expired_onboarding_sessions()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Delete expired sessions and their related data
  DELETE FROM public.onboarding_sessions 
  WHERE expires_at < now() AND status != 'completed';
END;
$$;

-- Add updated_at trigger
CREATE TRIGGER update_onboarding_sessions_updated_at
BEFORE UPDATE ON public.onboarding_sessions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();