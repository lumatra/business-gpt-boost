import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  FileText, 
  Image, 
  Globe, 
  Download, 
  Calendar,
  Building2,
  Zap
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';

interface AIAssistantData {
  id: string;
  company_id: string;
  assistant_type: string;
  business_info: string;
  website_url: string;
  website_content: string;
  total_file_size: number;
  created_at: string;
  updated_at: string;
}

interface AIAssistantFile {
  id: string;
  assistant_data_id: string;
  file_name: string;
  file_path: string;
  file_type: string;
  file_size: number;
  is_image: boolean;
  created_at: string;
}

export default function AIAssistantData() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [assistantData, setAssistantData] = useState<AIAssistantData[]>([]);
  const [assistantFiles, setAssistantFiles] = useState<Record<string, AIAssistantFile[]>>({});
  const [loading, setLoading] = useState(true);
  const [selectedAssistant, setSelectedAssistant] = useState<AIAssistantData | null>(null);

  useEffect(() => {
    if (user) {
      fetchAssistantData();
    }
  }, [user]);

  const fetchAssistantData = async () => {
    try {
      // Get user's company
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('company_id')
        .eq('user_id', user?.id)
        .single();

      if (profileError) throw profileError;

      if (!profile?.company_id) {
        setLoading(false);
        return;
      }

      // Fetch AI assistant data for the company
      const { data: assistants, error: assistantError } = await supabase
        .from('ai_assistant_data')
        .select('*')
        .eq('company_id', profile.company_id)
        .order('created_at', { ascending: false });

      if (assistantError) throw assistantError;

      setAssistantData(assistants || []);

      // Fetch files for each assistant
      if (assistants && assistants.length > 0) {
        const filesPromises = assistants.map(async (assistant) => {
          const { data: files, error } = await supabase
            .from('ai_assistant_files')
            .select('*')
            .eq('assistant_data_id', assistant.id)
            .order('created_at', { ascending: false });

          if (error) throw error;
          return { assistantId: assistant.id, files: files || [] };
        });

        const filesResults = await Promise.all(filesPromises);
        const filesMap: Record<string, AIAssistantFile[]> = {};
        filesResults.forEach(result => {
          filesMap[result.assistantId] = result.files;
        });
        setAssistantFiles(filesMap);
      }

    } catch (error) {
      console.error('Error fetching AI assistant data:', error);
      toast({
        title: "Error",
        description: "Failed to load AI assistant data.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const downloadFile = async (file: AIAssistantFile) => {
    try {
      const { data, error } = await supabase.storage
        .from('ai-assistant-files')
        .download(file.file_path);

      if (error) throw error;

      // Create download link
      const url = URL.createObjectURL(data);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.file_name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

    } catch (error) {
      console.error('Error downloading file:', error);
      toast({
        title: "Download Error",
        description: "Failed to download file.",
        variant: "destructive",
      });
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getAssistantTypeIcon = (type: string) => {
    switch (type) {
      case 'social_media':
        return '📱';
      case 'financial':
        return '💰';
      case 'tender_sales':
        return '📊';
      case 'marketing':
        return '🎯';
      case 'customer_service':
        return '🎧';
      case 'custom':
        return '⚡';
      default:
        return '🤖';
    }
  };

  const getAssistantTypeName = (type: string) => {
    switch (type) {
      case 'social_media':
        return 'Social Media';
      case 'financial':
        return 'Financial';
      case 'tender_sales':
        return 'Tender & Sales';
      case 'marketing':
        return 'Marketing';
      case 'customer_service':
        return 'Customer Service';
      case 'custom':
        return 'Custom AI Solutions';
      default:
        return type;
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-1/4"></div>
          <div className="h-32 bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  if (assistantData.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <Zap className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-2xl font-semibold mb-2">No AI Assistant Data</h2>
          <p className="text-muted-foreground mb-4">
            You haven't created any AI assistants yet or uploaded any training data.
          </p>
          <Button onClick={() => window.location.href = '/ai-assistants'}>
            Create AI Assistant
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">AI Assistant Training Data</h1>
          <p className="text-muted-foreground">View all uploaded documents, images, and business information for your AI assistants</p>
        </div>
      </div>

      <div className="grid gap-6">
        {assistantData.map((assistant) => {
          const files = assistantFiles[assistant.id] || [];
          const imageFiles = files.filter(f => f.is_image);
          const documentFiles = files.filter(f => !f.is_image);

          return (
            <Card key={assistant.id} className="overflow-hidden">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{getAssistantTypeIcon(assistant.assistant_type)}</span>
                    <div>
                      <CardTitle className="text-xl">
                        {getAssistantTypeName(assistant.assistant_type)} Assistant
                      </CardTitle>
                      <CardDescription>
                        Created {new Date(assistant.created_at).toLocaleDateString()} • 
                        Total data: {formatFileSize(assistant.total_file_size)}
                      </CardDescription>
                    </div>
                  </div>
                  <Badge variant="secondary">
                    {files.length} files
                  </Badge>
                </div>
              </CardHeader>

              <CardContent>
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="documents">Documents ({documentFiles.length})</TabsTrigger>
                    <TabsTrigger value="images">Images ({imageFiles.length})</TabsTrigger>
                    <TabsTrigger value="business-info">Business Info</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="space-y-4 mt-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex items-center space-x-2">
                        <FileText className="h-5 w-5 text-blue-500" />
                        <div>
                          <p className="font-medium">{documentFiles.length}</p>
                          <p className="text-sm text-muted-foreground">Documents</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Image className="h-5 w-5 text-green-500" />
                        <div>
                          <p className="font-medium">{imageFiles.length}</p>
                          <p className="text-sm text-muted-foreground">Images</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Globe className="h-5 w-5 text-purple-500" />
                        <div>
                          <p className="font-medium">{assistant.website_url ? 'Yes' : 'No'}</p>
                          <p className="text-sm text-muted-foreground">Website Data</p>
                        </div>
                      </div>
                    </div>
                    
                    {assistant.website_url && (
                      <div className="border rounded-lg p-4">
                        <h4 className="font-medium mb-2 flex items-center">
                          <Globe className="h-4 w-4 mr-2" />
                          Website Information
                        </h4>
                        <p className="text-sm text-muted-foreground mb-2">
                          <strong>URL:</strong> {assistant.website_url}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          <strong>Content Length:</strong> {assistant.website_content?.length || 0} characters
                        </p>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="documents" className="mt-4">
                    {documentFiles.length === 0 ? (
                      <p className="text-muted-foreground text-center py-8">No documents uploaded</p>
                    ) : (
                      <div className="grid gap-3">
                        {documentFiles.map((file) => (
                          <div key={file.id} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center space-x-3">
                              <FileText className="h-5 w-5 text-blue-500" />
                              <div>
                                <p className="font-medium text-sm">{file.file_name}</p>
                                <p className="text-xs text-muted-foreground">
                                  {formatFileSize(file.file_size)} • {new Date(file.created_at).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => downloadFile(file)}
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="images" className="mt-4">
                    {imageFiles.length === 0 ? (
                      <p className="text-muted-foreground text-center py-8">No images uploaded</p>
                    ) : (
                      <div className="grid gap-3">
                        {imageFiles.map((file) => (
                          <div key={file.id} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center space-x-3">
                              <Image className="h-5 w-5 text-green-500" />
                              <div>
                                <p className="font-medium text-sm">{file.file_name}</p>
                                <p className="text-xs text-muted-foreground">
                                  {formatFileSize(file.file_size)} • {new Date(file.created_at).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => downloadFile(file)}
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="business-info" className="mt-4">
                    <div className="space-y-4">
                      <div className="border rounded-lg p-4">
                        <h4 className="font-medium mb-2 flex items-center">
                          <Building2 className="h-4 w-4 mr-2" />
                          Business Information
                        </h4>
                        {assistant.business_info ? (
                          <p className="text-sm whitespace-pre-wrap">{assistant.business_info}</p>
                        ) : (
                          <p className="text-muted-foreground text-sm">No business information provided</p>
                        )}
                      </div>
                      
                      {assistant.website_content && (
                        <div className="border rounded-lg p-4">
                          <h4 className="font-medium mb-2 flex items-center">
                            <Globe className="h-4 w-4 mr-2" />
                            Website Content (First 500 characters)
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {assistant.website_content.substring(0, 500)}
                            {assistant.website_content.length > 500 && '...'}
                          </p>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}