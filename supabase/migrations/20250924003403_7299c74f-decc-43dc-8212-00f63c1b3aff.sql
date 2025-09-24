-- Fix function search path security issues
-- Update the existing functions to have proper search_path set

-- Fix handle_new_user function
CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  INSERT INTO public.profiles (user_id, first_name, last_name)
  VALUES (
    NEW.id, 
    NEW.raw_user_meta_data ->> 'first_name', 
    NEW.raw_user_meta_data ->> 'last_name'
  );
  RETURN NEW;
END;
$function$;

-- Fix cleanup_expired_onboarding_sessions function  
CREATE OR REPLACE FUNCTION public.cleanup_expired_onboarding_sessions()
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  -- Delete expired sessions and their related data
  DELETE FROM public.onboarding_sessions 
  WHERE expires_at < now() AND status != 'completed';
END;
$function$;