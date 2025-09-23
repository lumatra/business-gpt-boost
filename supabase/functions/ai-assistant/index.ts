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
    const { action, companyId, message, documents, assistantType } = await req.json();
    
    console.log('AI Assistant request:', { action, companyId, assistantType });

    switch (action) {
      case 'create_assistant':
        return await createAssistant(openAIApiKey, supabase, companyId, assistantType, documents);
      
      case 'chat':
        return await chatWithAssistant(openAIApiKey, supabase, companyId, assistantType, message);
        
      case 'upload_documents':
        return await uploadDocuments(openAIApiKey, supabase, companyId, assistantType, documents);
        
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
    hr: {
      name: `${company.name} - HR Assistant`,
      instructions: `You are an HR assistant for ${company.name}. You help with employee onboarding, policies, benefits, and general HR questions. Always maintain professionalism and confidentiality. Use the uploaded company documents to provide accurate, company-specific information.`,
      tools: [{ type: "file_search" }]
    },
    finance: {
      name: `${company.name} - Finance Assistant`,
      instructions: `You are a finance assistant for ${company.name}. You help with budgeting, financial analysis, expense management, and financial reporting. Use the uploaded financial documents and policies to provide accurate guidance.`,
      tools: [{ type: "file_search" }]
    },
    marketing: {
      name: `${company.name} - Marketing Assistant`,
      instructions: `You are a marketing assistant for ${company.name}. You help with campaign planning, content creation, market analysis, and brand management. Use the uploaded brand guidelines and marketing materials to maintain consistency.`,
      tools: [{ type: "file_search" }]
    },
    operations: {
      name: `${company.name} - Operations Assistant`,
      instructions: `You are an operations assistant for ${company.name}. You help with process optimization, workflow management, and operational efficiency. Use the uploaded operational documents and procedures to provide accurate guidance.`,
      tools: [{ type: "file_search" }]
    },
    legal: {
      name: `${company.name} - Legal Assistant`,
      instructions: `You are a legal assistant for ${company.name}. You help with contract review, compliance questions, and legal documentation. Always remind users to consult with qualified legal professionals for important matters. Use uploaded legal documents for reference.`,
      tools: [{ type: "file_search" }]
    },
    customer_service: {
      name: `${company.name} - Customer Service Assistant`,
      instructions: `You are a customer service assistant for ${company.name}. You help with customer inquiries, support processes, and service quality. Use the uploaded customer service guidelines and product information to provide excellent support.`,
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

async function uploadDocuments(openAIApiKey: string, supabase: any, companyId: string, assistantType: string, documents: any[]) {
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

  await uploadDocumentsToAssistant(openAIApiKey, assistantId, documents);

  return new Response(JSON.stringify({ 
    message: 'Documents uploaded successfully'
  }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
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

  // Upload files to OpenAI
  const fileIds = [];
  for (const doc of documents) {
    const formData = new FormData();
    formData.append('file', new Blob([doc.content], { type: doc.type }), doc.name);
    formData.append('purpose', 'assistants');

    const fileResponse = await fetch('https://api.openai.com/v1/files', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
      },
      body: formData,
    });

    const file = await fileResponse.json();
    fileIds.push(file.id);
    console.log('Uploaded file:', file.id);
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