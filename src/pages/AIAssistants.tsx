import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { 
  ArrowLeft, 
  MessageSquare, 
  Upload, 
  FileText, 
  Users, 
  DollarSign, 
  Megaphone,
  Settings,
  Scale,
  HeadphonesIcon,
  Loader2,
  Send,
  Plus
} from 'lucide-react';
import type { User } from '@supabase/supabase-js';

const AIAssistants = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [company, setCompany] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedAssistant, setSelectedAssistant] = useState('hr');
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<any[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [isChatting, setIsChatting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);

  const assistantTypes = {
    hr: {
      name: 'HR Assistant',
      icon: Users,
      description: 'Employee onboarding, policies, benefits, and HR questions',
      color: 'bg-blue-500'
    },
    finance: {
      name: 'Finance Assistant',
      icon: DollarSign,
      description: 'Budgeting, financial analysis, and expense management',
      color: 'bg-green-500'
    },
    marketing: {
      name: 'Marketing Assistant',
      icon: Megaphone,
      description: 'Campaign planning, content creation, and brand management',
      color: 'bg-purple-500'
    },
    operations: {
      name: 'Operations Assistant',
      icon: Settings,
      description: 'Process optimization and workflow management',
      color: 'bg-orange-500'
    },
    legal: {
      name: 'Legal Assistant',
      icon: Scale,
      description: 'Contract review, compliance, and legal documentation',
      color: 'bg-red-500'
    },
    customer_service: {
      name: 'Customer Service Assistant',
      icon: HeadphonesIcon,
      description: 'Customer inquiries and support processes',
      color: 'bg-teal-500'
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate('/auth');
        return;
      }

      setUser(session.user);
      await loadUserData(session.user.id);
    };

    checkAuth();
  }, [navigate]);

  const loadUserData = async (userId: string) => {
    try {
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*, companies(*)')
        .eq('user_id', userId)
        .single();

      if (profileError && profileError.code !== 'PGRST116') {
        console.error('Error loading profile:', profileError);
      } else if (profileData) {
        if (profileData.companies) {
          setCompany(profileData.companies);
        }
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const createAssistant = async (assistantType: string) => {
    if (!company) return;
    
    setIsCreating(true);
    try {
      const response = await supabase.functions.invoke('ai-assistant', {
        body: {
          action: 'create_assistant',
          companyId: company.id,
          assistantType: assistantType
        }
      });

      if (response.error) throw response.error;

      toast({
        title: "Assistant Created",
        description: `Your ${assistantTypes[assistantType as keyof typeof assistantTypes].name} is ready!`,
      });

      // Reload company data to get updated configuration
      await loadUserData(user!.id);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsCreating(false);
    }
  };

  const uploadDocuments = async (assistantType: string, files: FileList) => {
    if (!company || !files.length) return;
    
    setIsUploading(true);
    try {
      const documents = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const content = await file.text();
        documents.push({
          name: file.name,
          content: content,
          type: file.type
        });
      }

      const response = await supabase.functions.invoke('ai-assistant', {
        body: {
          action: 'upload_documents',
          companyId: company.id,
          assistantType: assistantType,
          documents: documents
        }
      });

      if (response.error) throw response.error;

      toast({
        title: "Documents Uploaded",
        description: `${files.length} document(s) uploaded successfully!`,
      });

      setUploadDialogOpen(false);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const chatWithAssistant = async (assistantType: string, message: string) => {
    if (!company || !message.trim()) return;
    
    setIsChatting(true);
    const userMessage = { role: 'user', content: message };
    setChatHistory(prev => [...prev, userMessage]);
    setChatMessage('');

    try {
      const response = await supabase.functions.invoke('ai-assistant', {
        body: {
          action: 'chat',
          companyId: company.id,
          assistantType: assistantType,
          message: message
        }
      });

      if (response.error) throw response.error;

      const assistantMessage = { 
        role: 'assistant', 
        content: response.data.response 
      };
      setChatHistory(prev => [...prev, assistantMessage]);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsChatting(false);
    }
  };

  const isAssistantCreated = (assistantType: string) => {
    return company?.gpt_configuration?.assistants?.[assistantType]?.assistant_id;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!company) {
    return (
      <div className="min-h-screen bg-background p-8">
        <div className="max-w-2xl mx-auto text-center">
          <Card>
            <CardHeader>
              <CardTitle>Company Setup Required</CardTitle>
              <CardDescription>
                Please complete your company setup before accessing AI assistants.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => navigate('/dashboard')}>
                Return to Dashboard
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              AI Assistants
            </h1>
            <p className="text-muted-foreground">
              Your personalized AI team for {company.name}
            </p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs value={selectedAssistant} onValueChange={setSelectedAssistant}>
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
            {Object.entries(assistantTypes).map(([key, config]) => {
              const Icon = config.icon;
              return (
                <TabsTrigger key={key} value={key} className="flex items-center gap-2">
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{config.name.split(' ')[0]}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {Object.entries(assistantTypes).map(([key, config]) => {
            const Icon = config.icon;
            const isCreated = isAssistantCreated(key);

            return (
              <TabsContent key={key} value={key} className="space-y-6 mt-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${config.color} text-white`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <CardTitle>{config.name}</CardTitle>
                        <CardDescription>{config.description}</CardDescription>
                      </div>
                      <div className="ml-auto">
                        {isCreated ? (
                          <Badge variant="secondary">Active</Badge>
                        ) : (
                          <Badge variant="outline">Not Created</Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  
                  {!isCreated ? (
                    <CardContent>
                      <div className="text-center py-8 space-y-4">
                        <p className="text-muted-foreground">
                          Create your {config.name} to get started with AI-powered assistance for your {key} needs.
                        </p>
                        <Button 
                          onClick={() => createAssistant(key)}
                          disabled={isCreating}
                        >
                          {isCreating ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          ) : (
                            <Plus className="mr-2 h-4 w-4" />
                          )}
                          Create {config.name}
                        </Button>
                      </div>
                    </CardContent>
                  ) : (
                    <CardContent className="space-y-6">
                      {/* Upload Documents Section */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold">Documents & Training</h4>
                          <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                <Upload className="mr-2 h-4 w-4" />
                                Upload Documents
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Upload Documents for {config.name}</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4">
                                <p className="text-sm text-muted-foreground">
                                  Upload relevant documents to train your assistant. Supported formats: PDF, TXT, DOC, DOCX
                                </p>
                                <Input
                                  type="file"
                                  multiple
                                  accept=".pdf,.txt,.doc,.docx"
                                  onChange={(e) => {
                                    if (e.target.files) {
                                      uploadDocuments(key, e.target.files);
                                    }
                                  }}
                                  disabled={isUploading}
                                />
                                {isUploading && (
                                  <div className="flex items-center gap-2">
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    <span className="text-sm">Uploading documents...</span>
                                  </div>
                                )}
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Upload company documents, policies, and procedures to make your assistant more helpful and accurate.
                        </p>
                      </div>

                      {/* Chat Interface */}
                      <div className="space-y-4">
                        <h4 className="font-semibold">Chat with {config.name}</h4>
                        
                        {/* Chat History */}
                        <div className="border rounded-lg p-4 h-64 overflow-y-auto space-y-3">
                          {chatHistory.length === 0 ? (
                            <div className="text-center text-muted-foreground py-8">
                              <MessageSquare className="h-8 w-8 mx-auto mb-2 opacity-50" />
                              <p>Start a conversation with your {config.name}</p>
                            </div>
                          ) : (
                            chatHistory.map((msg, idx) => (
                              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] p-3 rounded-lg ${
                                  msg.role === 'user' 
                                    ? 'bg-primary text-primary-foreground' 
                                    : 'bg-secondary'
                                }`}>
                                  <p className="text-sm">{msg.content}</p>
                                </div>
                              </div>
                            ))
                          )}
                          {isChatting && (
                            <div className="flex justify-start">
                              <div className="bg-secondary p-3 rounded-lg">
                                <Loader2 className="h-4 w-4 animate-spin" />
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Chat Input */}
                        <div className="flex gap-2">
                          <Input
                            placeholder={`Ask your ${config.name} anything...`}
                            value={chatMessage}
                            onChange={(e) => setChatMessage(e.target.value)}
                            onKeyPress={(e) => {
                              if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                chatWithAssistant(key, chatMessage);
                              }
                            }}
                            disabled={isChatting}
                          />
                          <Button 
                            onClick={() => chatWithAssistant(key, chatMessage)}
                            disabled={isChatting || !chatMessage.trim()}
                          >
                            <Send className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  )}
                </Card>
              </TabsContent>
            );
          })}
        </Tabs>
      </main>
    </div>
  );
};

export default AIAssistants;