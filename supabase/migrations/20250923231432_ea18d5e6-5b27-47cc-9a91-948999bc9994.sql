-- Create table for AI assistant training data
CREATE TABLE public.ai_assistant_data (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id UUID REFERENCES public.companies(id) ON DELETE CASCADE,
  assistant_type TEXT NOT NULL,
  business_info TEXT,
  website_url TEXT,
  website_content TEXT,
  total_file_size BIGINT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for AI assistant files
CREATE TABLE public.ai_assistant_files (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  assistant_data_id UUID REFERENCES public.ai_assistant_data(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size BIGINT NOT NULL,
  is_image BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create storage bucket for AI assistant files
INSERT INTO storage.buckets (id, name, public) VALUES ('ai-assistant-files', 'ai-assistant-files', false);

-- Enable RLS on both tables
ALTER TABLE public.ai_assistant_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_assistant_files ENABLE ROW LEVEL SECURITY;

-- RLS policies for ai_assistant_data
CREATE POLICY "Company users can view their company's AI data" 
ON public.ai_assistant_data 
FOR SELECT 
USING (company_id IN (
  SELECT profiles.company_id
  FROM profiles
  WHERE profiles.user_id = auth.uid()
));

CREATE POLICY "Company users can manage their company's AI data" 
ON public.ai_assistant_data 
FOR ALL 
USING (company_id IN (
  SELECT profiles.company_id
  FROM profiles
  WHERE profiles.user_id = auth.uid()
));

-- RLS policies for ai_assistant_files
CREATE POLICY "Company users can view their AI files" 
ON public.ai_assistant_files 
FOR SELECT 
USING (assistant_data_id IN (
  SELECT ai_assistant_data.id
  FROM ai_assistant_data
  INNER JOIN profiles ON ai_assistant_data.company_id = profiles.company_id
  WHERE profiles.user_id = auth.uid()
));

CREATE POLICY "Company users can manage their AI files" 
ON public.ai_assistant_files 
FOR ALL 
USING (assistant_data_id IN (
  SELECT ai_assistant_data.id
  FROM ai_assistant_data
  INNER JOIN profiles ON ai_assistant_data.company_id = profiles.company_id
  WHERE profiles.user_id = auth.uid()
));

-- Storage policies for ai-assistant-files bucket
CREATE POLICY "Company users can view their AI files in storage" 
ON storage.objects 
FOR SELECT 
USING (
  bucket_id = 'ai-assistant-files' AND 
  (storage.foldername(name))[1] IN (
    SELECT ai_assistant_data.id::text
    FROM ai_assistant_data
    INNER JOIN profiles ON ai_assistant_data.company_id = profiles.company_id
    WHERE profiles.user_id = auth.uid()
  )
);

CREATE POLICY "Company users can upload their AI files to storage" 
ON storage.objects 
FOR INSERT 
WITH CHECK (
  bucket_id = 'ai-assistant-files' AND 
  (storage.foldername(name))[1] IN (
    SELECT ai_assistant_data.id::text
    FROM ai_assistant_data
    INNER JOIN profiles ON ai_assistant_data.company_id = profiles.company_id
    WHERE profiles.user_id = auth.uid()
  )
);

-- Add trigger for updated_at
CREATE TRIGGER update_ai_assistant_data_updated_at
  BEFORE UPDATE ON public.ai_assistant_data
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();