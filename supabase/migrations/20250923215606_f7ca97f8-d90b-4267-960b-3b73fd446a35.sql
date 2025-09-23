-- Create a test company for the current user (Mary James from MJ Hairdressers)
INSERT INTO public.companies (
  name,
  email,
  phone,
  website,
  status,
  subscription_tier
) VALUES (
  'MJ Hairdressers',
  'elainebretwmanning@gmail.com',
  '+1 (555) 123-4567',
  'www.mjhairdressers.com',
  'active',
  'professional'
);

-- Get the company ID and update the user's profile
UPDATE public.profiles 
SET company_id = (
  SELECT id FROM public.companies WHERE name = 'MJ Hairdressers' LIMIT 1
)
WHERE user_id = '0d3e7da3-6a39-4a9b-a217-edcdb8a0f4fe';