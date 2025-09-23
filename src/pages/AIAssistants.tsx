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
  Calculator,
  TrendingUp,
  Headphones,
  Lightbulb,
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
  const [selectedAssistant, setSelectedAssistant] = useState('social');
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<any[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [isChatting, setIsChatting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [totalFileSize, setTotalFileSize] = useState(0);
  const [businessInfo, setBusinessInfo] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');

  const assistantTypes = {
    social: {
      name: 'Social Media AI Assistant',
      icon: MessageSquare,
      description: 'Daily post creation, brand voice learning, auto scheduling, and comment management',
      color: 'bg-primary text-white'
    },
    finance: {
      name: 'Financial AI Advisor',
      icon: Calculator,
      description: 'Cash flow forecasting, pricing optimization, tax planning, and profit analysis',
      color: 'bg-accent text-white'
    },
    sales: {
      name: 'Tender & Sales AI Expert',
      icon: FileText,
      description: 'Proposal writing, RFP analysis, quote generation, and competitor research',
      color: 'bg-primary text-white'
    },
    marketing: {
      name: 'Marketing AI Specialist',
      icon: TrendingUp,
      description: 'Campaign creation, email sequences, ad copywriting, and ROI tracking',
      color: 'bg-accent text-white'
    },
    customer: {
      name: 'Customer Service AI Assistant',
      icon: Headphones,
      description: '24/7 chat support, FAQ automation, ticket management, and sentiment analysis',
      color: 'bg-accent text-white'
    },
    custom: {
      name: 'Custom AI Solutions',
      icon: Lightbulb,
      description: 'CRM automation, process optimization, business case writing, and custom integrations',
      color: 'bg-primary text-white'
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
    
    // Check total file size (4MB limit)
    let totalSize = 0;
    for (let i = 0; i < files.length; i++) {
      totalSize += files[i].size;
    }
    
    if (totalSize > 4 * 1024 * 1024) { // 4MB
      toast({
        title: "Files too large",
        description: "Total file size must be under 4MB. Please select smaller files.",
        variant: "destructive",
      });
      return;
    }
    
    setIsUploading(true);
    try {
      const documents = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        // Handle images vs text files differently
        if (file.type.startsWith('image/')) {
          const base64 = await new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.readAsDataURL(file);
          });
          documents.push({
            name: file.name,
            content: base64,
            type: file.type,
            isImage: true
          });
        } else {
          const content = await file.text();
          documents.push({
            name: file.name,
            content: content,
            type: file.type,
            isImage: false
          });
        }
      }

      const response = await supabase.functions.invoke('ai-assistant', {
        body: {
          action: 'upload_documents',
          companyId: company.id,
          assistantType: assistantType,
          documents: documents,
          businessInfo: businessInfo || undefined,
          websiteUrl: websiteUrl || undefined
        }
      });

      if (response.error) throw response.error;

      toast({
        title: "Content Uploaded",
        description: `${files.length} file(s) uploaded successfully!`,
      });

      setUploadDialogOpen(false);
      setBusinessInfo('');
      setWebsiteUrl('');
      setTotalFileSize(0);
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

  const handleFileSelection = (files: FileList | null) => {
    if (!files) return;
    
    let totalSize = 0;
    for (let i = 0; i < files.length; i++) {
      totalSize += files[i].size;
    }
    setTotalFileSize(totalSize);
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
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 gap-1">
            {Object.entries(assistantTypes).map(([key, config]) => {
              const Icon = config.icon;
              return (
                <TabsTrigger key={key} value={key} className="flex items-center gap-2">
                  <Icon className="h-4 w-4" />
                  <span className="hidden md:inline text-xs">{config.name.split(' ')[0]}</span>
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
                            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle>Setup {config.name}</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-6">
                                
                                {/* Business Information */}
                                <div className="space-y-3">
                                  <h4 className="font-medium">Business Information</h4>
                                  <Textarea
                                    placeholder="Tell us about your business - what you do, your values, target customers, unique selling points..."
                                    value={businessInfo}
                                    onChange={(e) => setBusinessInfo(e.target.value)}
                                    className="min-h-[80px]"
                                  />
                                </div>

                                {/* Website URL */}
                                <div className="space-y-3">
                                  <h4 className="font-medium">Website (Optional)</h4>
                                  <Input
                                    placeholder="https://yourwebsite.com (we'll extract your about page content)"
                                    value={websiteUrl}
                                    onChange={(e) => setWebsiteUrl(e.target.value)}
                                  />
                                </div>
                                
                                {/* File Upload */}
                                <div className="space-y-3">
                                  <h4 className="font-medium">Upload Files & Images</h4>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground mb-3">
                                    <div>
                                      <h5 className="font-medium text-foreground">📄 Documents</h5>
                                      <ul className="space-y-1 text-xs">
                                        <li>• Company policies</li>
                                        <li>• Service descriptions</li>
                                        <li>• Price lists</li>
                                        <li>• FAQ documents</li>
                                        <li>• Process guides</li>
                                      </ul>
                                    </div>
                                    <div>
                                      <h5 className="font-medium text-foreground">🎨 Images</h5>
                                      <ul className="space-y-1 text-xs">
                                        <li>• Company logo</li>
                                        <li>• Location photos</li>
                                        <li>• Product images</li>
                                        <li>• Marketing materials</li>
                                        <li>• Team photos</li>
                                      </ul>
                                    </div>
                                  </div>
                                  
                                  <Input
                                    type="file"
                                    multiple
                                    accept=".pdf,.txt,.doc,.docx,.jpg,.jpeg,.png,.webp"
                                    onChange={(e) => {
                                      handleFileSelection(e.target.files);
                                    }}
                                    disabled={isUploading}
                                  />
                                  
                                  <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">
                                      Supported: PDF, DOC, TXT, JPG, PNG
                                    </span>
                                    <span className={`${totalFileSize > 4 * 1024 * 1024 ? 'text-destructive' : 'text-muted-foreground'}`}>
                                      {(totalFileSize / 1024 / 1024).toFixed(1)}MB / 4.0MB
                                    </span>
                                  </div>
                                </div>

                                {/* Upload Button */}
                                <div className="flex gap-2 pt-4">
                                  <Button 
                                    onClick={() => {
                                      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
                                      if (fileInput?.files) {
                                        uploadDocuments(key, fileInput.files);
                                      }
                                    }}
                                    disabled={isUploading || (!businessInfo && !websiteUrl && totalFileSize === 0)}
                                    className="flex-1"
                                  >
                                    {isUploading ? (
                                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    ) : (
                                      <Upload className="mr-2 h-4 w-4" />
                                    )}
                                    Setup Assistant
                                  </Button>
                                  <Button variant="outline" onClick={() => setUploadDialogOpen(false)}>
                                    Cancel
                                  </Button>
                                </div>
                                
                                {isUploading && (
                                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    <span>Setting up your assistant with the provided information...</span>
                                  </div>
                                )}
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                        <div className="bg-secondary/50 p-4 rounded-lg space-y-2">
                          <p className="text-sm font-medium">Setup Guide:</p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                            <div>
                              <p className="font-medium text-foreground mb-1">📝 Business Info</p>
                              <p className="text-xs">Share your story, values, and what makes you unique</p>
                            </div>
                            <div>
                              <p className="font-medium text-foreground mb-1">📄 Documents (4MB max)</p>
                              <p className="text-xs">Policies, services, prices, FAQs</p>
                            </div>
                            <div>
                              <p className="font-medium text-foreground mb-1">🎨 Visual Assets</p>
                              <p className="text-xs">Logo, location, products, marketing materials</p>
                            </div>
                            <div>
                              <p className="font-medium text-foreground mb-1">🌐 Website</p>
                              <p className="text-xs">We'll extract your about page content</p>
                            </div>
                          </div>
                        </div>
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