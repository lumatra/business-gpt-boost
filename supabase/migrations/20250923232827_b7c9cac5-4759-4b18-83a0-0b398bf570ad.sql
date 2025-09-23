-- Insert sample AI assistant data for MJ Hairdressers
INSERT INTO public.ai_assistant_data (
  company_id, 
  assistant_type, 
  business_info, 
  website_url, 
  website_content,
  total_file_size
) VALUES (
  '97ccc709-fcbc-4c78-b4a8-1839ed5eb963',
  'Customer Service Bot',
  'MJ Hairdressers is a premium hair salon specializing in cuts, colors, and styling. Located in downtown, we serve clients looking for trendy and classic hairstyles. Our team includes 3 experienced stylists: Mary Johnson (owner, 15 years experience), Sarah Kim (color specialist), and Tom Rodriguez (men''s cuts expert). We offer services from $30-200, accept walk-ins and appointments, and are open Tuesday-Saturday 9am-7pm.',
  'https://mjhairdressers.com',
  'Welcome to MJ Hairdressers - Your Style, Our Passion. Services: Haircuts ($30-60), Hair Coloring ($80-150), Highlights ($100-200), Styling ($25-50). Book online or call (555) 123-4567. Located at 123 Main St, Downtown.',
  2500000
);

-- Insert sample files for the AI assistant
INSERT INTO public.ai_assistant_files (
  assistant_data_id,
  file_name,
  file_path,
  file_type,
  file_size,
  is_image
) VALUES 
(
  (SELECT id FROM public.ai_assistant_data WHERE company_id = '97ccc709-fcbc-4c78-b4a8-1839ed5eb963' ORDER BY created_at DESC LIMIT 1),
  'MJ_Logo.png',
  'logos/MJ_Logo.png',
  'image/png',
  150000,
  true
),
(
  (SELECT id FROM public.ai_assistant_data WHERE company_id = '97ccc709-fcbc-4c78-b4a8-1839ed5eb963' ORDER BY created_at DESC LIMIT 1),
  'Service_Menu.pdf',
  'documents/Service_Menu.pdf',
  'application/pdf',
  800000,
  false
),
(
  (SELECT id FROM public.ai_assistant_data WHERE company_id = '97ccc709-fcbc-4c78-b4a8-1839ed5eb963' ORDER BY created_at DESC LIMIT 1),
  'Staff_Bios.docx',
  'documents/Staff_Bios.docx',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  450000,
  false
),
(
  (SELECT id FROM public.ai_assistant_data WHERE company_id = '97ccc709-fcbc-4c78-b4a8-1839ed5eb963' ORDER BY created_at DESC LIMIT 1),
  'Salon_Interior.jpg',
  'images/Salon_Interior.jpg',
  'image/jpeg',
  1100000,
  true
);