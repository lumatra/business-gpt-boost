-- Fix the generate_onboarding_token function with a different approach
CREATE OR REPLACE FUNCTION public.generate_onboarding_token()
 RETURNS text
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  -- Generate a random token using md5 and random
  RETURN encode(digest(random()::text || clock_timestamp()::text, 'sha256'), 'base64');
END;
$function$;