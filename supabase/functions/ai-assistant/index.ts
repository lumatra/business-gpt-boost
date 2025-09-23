import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const { action, companyId, message, documents, assistantType, businessInfo, websiteUrl } = await req.json();
    
    console.log('AI Assistant request:', { action, companyId, assistantType });

    switch (action) {
      case 'create_assistant':
        return await createAssistant(openAIApiKey, supabase, companyId, assistantType, documents);
      
      case 'chat':
        return await chatWithAssistant(openAIApiKey, supabase, companyId, assistantType, message);
        
      case 'upload_documents':
        return await uploadDocuments(openAIApiKey, supabase, companyId, assistantType, documents, businessInfo, websiteUrl);
        
      default:
        throw new Error('Invalid action');
    }
  } catch (error) {
    console.error('Error in ai-assistant function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

async function createAssistant(openAIApiKey: string, supabase: any, companyId: string, assistantType: string, documents?: any[]) {
  // Get company information
  const { data: company } = await supabase
    .from('companies')
    .select('*')
    .eq('id', companyId)
    .single();

  if (!company) {
    throw new Error('Company not found');
  }

  // Define assistant configurations for each type
  const assistantConfigs = {
    social: {
      name: `${company.name} - Social Media AI Assistant`,
      instructions: `You are a social media assistant for ${company.name}. You help with daily post creation, brand voice learning, auto scheduling, and comment management. Use the uploaded brand guidelines, logos, and marketing materials to maintain consistency. Always create engaging content that matches the company's tone and values.`,
      tools: [{ type: "file_search" }]
    },
    finance: {
      name: `${company.name} - Financial AI Advisor`,
      instructions: `You are a financial advisor for ${company.name}. You help with cash flow forecasting, pricing optimization, tax planning, and profit analysis. Use the uploaded financial documents, pricing guides, and business information to provide accurate, company-specific financial guidance.`,
      tools: [{ type: "file_search" }]
    },
    sales: {
      name: `${company.name} - Tender & Sales AI Expert`,
      instructions: `You are a sales and tender expert for ${company.name}. You help with proposal writing, RFP analysis, quote generation, and competitor research. Use the uploaded company documents, service descriptions, and case studies to create compelling proposals and sales materials.`,
      tools: [{ type: "file_search" }]
    },
    marketing: {
      name: `${company.name} - Marketing AI Specialist`,
      instructions: `You are a marketing specialist for ${company.name}. You help with campaign creation, email sequences, ad copywriting, and ROI tracking. Use the uploaded marketing materials, brand guidelines, and business information to create targeted campaigns that resonate with your audience.`,
      tools: [{ type: "file_search" }]
    },
    customer: {
      name: `${company.name} - Customer Service AI Assistant`,
      instructions: `You are a customer service assistant for ${company.name}. You provide 24/7 chat support, FAQ automation, ticket management, and sentiment analysis. Use the uploaded company policies, service descriptions, and FAQ documents to provide excellent customer support that reflects the company's values.`,
      tools: [{ type: "file_search" }]
    },
    custom: {
      name: `${company.name} - Custom AI Solutions`,
      instructions: `You are a custom AI solution for ${company.name}. You help with CRM automation, process optimization, business case writing, and custom integrations. Use all uploaded documents and business information to provide tailored solutions that address the company's specific needs and challenges.`,
      tools: [{ type: "file_search" }]
    }
  };

  const config = assistantConfigs[assistantType as keyof typeof assistantConfigs];
  if (!config) {
    throw new Error('Invalid assistant type');
  }

  // Create the assistant
  const response = await fetch('https://api.openai.com/v1/assistants', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${openAIApiKey}`,
      'Content-Type': 'application/json',
      'OpenAI-Beta': 'assistants=v2'
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      name: config.name,
      instructions: config.instructions,
      tools: config.tools,
      tool_resources: {
        file_search: {
          vector_stores: []
        }
      }
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    console.error('OpenAI API error:', error);
    throw new Error(`Failed to create assistant: ${error}`);
  }

  const assistant = await response.json();
  console.log('Created assistant:', assistant.id);

  // Update company's GPT configuration
  const currentConfig = company.gpt_configuration || {};
  const updatedConfig = {
    ...currentConfig,
    assistants: {
      ...currentConfig.assistants,
      [assistantType]: {
        assistant_id: assistant.id,
        created_at: new Date().toISOString()
      }
    }
  };

  await supabase
    .from('companies')
    .update({ gpt_configuration: updatedConfig })
    .eq('id', companyId);

  // Upload documents if provided
  if (documents && documents.length > 0) {
    await uploadDocumentsToAssistant(openAIApiKey, assistant.id, documents);
  }

  return new Response(JSON.stringify({ 
    assistant_id: assistant.id,
    message: 'Assistant created successfully'
  }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

async function uploadDocuments(openAIApiKey: string, supabase: any, companyId: string, assistantType: string, documents: any[], businessInfo?: string, websiteUrl?: string) {
  // Get the assistant ID
  const { data: company } = await supabase
    .from('companies')
    .select('gpt_configuration')
    .eq('id', companyId)
    .single();

  const assistantId = company?.gpt_configuration?.assistants?.[assistantType]?.assistant_id;
  if (!assistantId) {
    throw new Error('Assistant not found. Please create assistant first.');
  }

  // Prepare all documents including business info and website content
  const allDocuments = [...(documents || [])];
  
  // Add business information as a document if provided
  if (businessInfo) {
    allDocuments.push({
      name: 'business-information.txt',
      content: businessInfo,
      type: 'text/plain',
      isImage: false
    });
  }
  
  // Fetch and add website content if URL provided
  if (websiteUrl) {
    try {
      const websiteContent = await fetchWebsiteContent(websiteUrl);
      if (websiteContent) {
        allDocuments.push({
          name: 'website-about-page.txt',
          content: websiteContent,
          type: 'text/plain',
          isImage: false
        });
      }
    } catch (error) {
      console.error('Failed to fetch website content:', error);
      // Continue without website content
    }
  }

  if (allDocuments.length > 0) {
    await uploadDocumentsToAssistant(openAIApiKey, assistantId, allDocuments);
  }

  return new Response(JSON.stringify({ 
    message: `Successfully processed ${allDocuments.length} items`
  }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

async function fetchWebsiteContent(url: string): Promise<string | null> {
  try {
    // Ensure URL has protocol
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
    }
    
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; AI Assistant Bot)'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const html = await response.text();
    
    // Simple text extraction - remove HTML tags and clean up
    const textContent = html
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
      .replace(/<[^>]*>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    
    // Extract relevant sections (look for about, company, service descriptions)
    const relevantKeywords = ['about', 'company', 'service', 'mission', 'vision', 'team', 'history'];
    const sentences = textContent.split(/[.!?]+/);
    const relevantSentences = sentences.filter(sentence => 
      relevantKeywords.some(keyword => 
        sentence.toLowerCase().includes(keyword)
      )
    );
    
    return relevantSentences.length > 0 
      ? relevantSentences.join('. ') 
      : textContent.substring(0, 2000); // Fallback to first 2000 chars
      
  } catch (error) {
    console.error('Error fetching website content:', error);
    return null;
  }
}

async function uploadDocumentsToAssistant(openAIApiKey: string, assistantId: string, documents: any[]) {
  // Create a vector store
  const vectorStoreResponse = await fetch('https://api.openai.com/v1/vector_stores', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${openAIApiKey}`,
      'Content-Type': 'application/json',
      'OpenAI-Beta': 'assistants=v2'
    },
    body: JSON.stringify({
      name: `Documents for Assistant ${assistantId}`
    }),
  });

  const vectorStore = await vectorStoreResponse.json();
  console.log('Created vector store:', vectorStore.id);

  // Upload files to OpenAI (only non-image files)
  const fileIds = [];
  for (const doc of documents) {
    // Skip images for now as they can't be used in vector stores
    if (doc.isImage) {
      console.log('Skipping image file for vector store:', doc.name);
      continue;
    }
    
    const formData = new FormData();
    const blob = doc.content.startsWith('data:') 
      ? dataURLtoBlob(doc.content) 
      : new Blob([doc.content], { type: doc.type });
    
    formData.append('file', blob, doc.name);
    formData.append('purpose', 'assistants');

    try {
      const fileResponse = await fetch('https://api.openai.com/v1/files', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openAIApiKey}`,
        },
        body: formData,
      });

      if (!fileResponse.ok) {
        console.error(`Failed to upload ${doc.name}:`, await fileResponse.text());
        continue;
      }

      const file = await fileResponse.json();
      fileIds.push(file.id);
      console.log('Uploaded file:', file.id, doc.name);
    } catch (error) {
      console.error(`Error uploading ${doc.name}:`, error);
    }
  }

  if (fileIds.length === 0) {
    console.log('No files to add to vector store');
    return;
  }

  // Add files to vector store
  await fetch(`https://api.openai.com/v1/vector_stores/${vectorStore.id}/files`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${openAIApiKey}`,
      'Content-Type': 'application/json',
      'OpenAI-Beta': 'assistants=v2'
    },
    body: JSON.stringify({
      file_ids: fileIds
    }),
  });

  // Update assistant to use the vector store
  await fetch(`https://api.openai.com/v1/assistants/${assistantId}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${openAIApiKey}`,
      'Content-Type': 'application/json',
      'OpenAI-Beta': 'assistants=v2'
    },
    body: JSON.stringify({
      tool_resources: {
        file_search: {
          vector_store_ids: [vectorStore.id]
        }
      }
    }),
  });
}

function dataURLtoBlob(dataURL: string): Blob {
  const arr = dataURL.split(',');
  const mime = arr[0].match(/:(.*?);/)![1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}

async function chatWithAssistant(openAIApiKey: string, supabase: any, companyId: string, assistantType: string, message: string) {
  // Get the assistant ID
  const { data: company } = await supabase
    .from('companies')
    .select('gpt_configuration')
    .eq('id', companyId)
    .single();

  const assistantId = company?.gpt_configuration?.assistants?.[assistantType]?.assistant_id;
  if (!assistantId) {
    throw new Error('Assistant not found. Please create assistant first.');
  }

  // Create a thread
  const threadResponse = await fetch('https://api.openai.com/v1/threads', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${openAIApiKey}`,
      'Content-Type': 'application/json',
      'OpenAI-Beta': 'assistants=v2'
    },
    body: JSON.stringify({}),
  });

  const thread = await threadResponse.json();

  // Add message to thread
  await fetch(`https://api.openai.com/v1/threads/${thread.id}/messages`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${openAIApiKey}`,
      'Content-Type': 'application/json',
      'OpenAI-Beta': 'assistants=v2'
    },
    body: JSON.stringify({
      role: 'user',
      content: message
    }),
  });

  // Run the assistant
  const runResponse = await fetch(`https://api.openai.com/v1/threads/${thread.id}/runs`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${openAIApiKey}`,
      'Content-Type': 'application/json',
      'OpenAI-Beta': 'assistants=v2'
    },
    body: JSON.stringify({
      assistant_id: assistantId
    }),
  });

  const run = await runResponse.json();

  // Poll for completion
  let runStatus = run.status;
  while (runStatus === 'queued' || runStatus === 'in_progress') {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const statusResponse = await fetch(`https://api.openai.com/v1/threads/${thread.id}/runs/${run.id}`, {
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'OpenAI-Beta': 'assistants=v2'
      },
    });
    
    const statusData = await statusResponse.json();
    runStatus = statusData.status;
  }

  if (runStatus !== 'completed') {
    throw new Error(`Assistant run failed with status: ${runStatus}`);
  }

  // Get the messages
  const messagesResponse = await fetch(`https://api.openai.com/v1/threads/${thread.id}/messages`, {
    headers: {
      'Authorization': `Bearer ${openAIApiKey}`,
      'OpenAI-Beta': 'assistants=v2'
    },
  });

  const messages = await messagesResponse.json();
  const assistantMessage = messages.data.find((msg: any) => msg.role === 'assistant');
  
  return new Response(JSON.stringify({ 
    response: assistantMessage?.content[0]?.text?.value || 'No response generated'
  }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}