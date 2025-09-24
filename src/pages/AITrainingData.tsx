import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, ArrowLeft, Upload, FileText, Trash2, Download, Plus, Edit, Save, X, Globe, Building, Bot, Share2, Users, TrendingUp, Calculator } from 'lucide-react';
import type { User } from '@supabase/supabase-js';

const AITrainingData = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams, setSearchParams] = useSearchParams();
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [aiAssistantData, setAiAssistantData] = useState<any>(null);
  const [aiAssistantFiles, setAiAssistantFiles] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [selectedAssistantType, setSelectedAssistantType] = useState<string>('');
  
  // Available assistant types
  const assistantTypes = [
    { value: 'social_media', label: 'Social Media Assistant', icon: Share2, description: 'Content creation, scheduling, engagement' },
    { value: 'hr_assistant', label: 'HR Assistant', icon: Users, description: 'Staff management, scheduling, communication' },
    { value: 'marketing', label: 'Marketing Assistant', icon: TrendingUp, description: 'Campaigns, analytics, customer outreach' },
    { value: 'finance', label: 'Finance Assistant', icon: Calculator, description: 'Accounting, reports, financial analysis' },
    { value: 'customer_service', label: 'Customer Service', icon: Bot, description: 'Support tickets, chat responses, FAQ' }
  ];
  
  // Form data for AI assistant information
  const [formData, setFormData] = useState({
    assistant_type: '',
    website_url: '',
    website_content: '',
    business_info: ''
  });

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

    // Get assistant type from URL params
    const typeParam = searchParams.get('type');
    if (typeParam) {
      setSelectedAssistantType(typeParam);
    } else {
      setSelectedAssistantType('social_media'); // Default to social media
    }
  }, [navigate, searchParams]);

  // Load data when assistant type changes
  useEffect(() => {
    if (profile?.companies?.id && selectedAssistantType) {
      loadAIAssistantData(profile.companies.id, selectedAssistantType);
    }
  }, [selectedAssistantType, profile?.companies?.id]);

  const handleAssistantTypeChange = (newType: string) => {
    setSelectedAssistantType(newType);
    setSearchParams({ type: newType });
    setIsEditing(false);
    setAiAssistantData(null);
    setAiAssistantFiles([]);
  };

  const loadUserData = async (userId: string) => {
    try {
      // Load user profile and company
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*, companies(*)')
        .eq('user_id', userId)
        .single();

      if (profileError && profileError.code !== 'PGRST116') {
        console.error('Error loading profile:', profileError);
      } else if (profileData) {
        setProfile(profileData);
        
        if (profileData.companies && selectedAssistantType) {
          await loadAIAssistantData(profileData.companies.id, selectedAssistantType);
        }
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadAIAssistantData = async (companyId: string, assistantType: string = selectedAssistantType) => {
    if (!assistantType) return;

    try {
      // Load AI assistant data for specific type
      const { data: assistantData, error: assistantError } = await supabase
        .from('ai_assistant_data')
        .select('*')
        .eq('company_id', companyId)
        .eq('assistant_type', assistantType)
        .maybeSingle();

      if (assistantError) {
        console.error('Error loading AI assistant data:', assistantError);
      } else if (assistantData) {
        setAiAssistantData(assistantData);
        setFormData({
          assistant_type: assistantData.assistant_type || '',
          website_url: assistantData.website_url || '',
          website_content: assistantData.website_content || '',
          business_info: assistantData.business_info || ''
        });

        // Load associated files
        const { data: filesData, error: filesError } = await supabase
          .from('ai_assistant_files')
          .select('*')
          .eq('assistant_data_id', assistantData.id)
          .order('created_at', { ascending: false });

        if (filesError) {
          console.error('Error loading AI assistant files:', filesError);
        } else {
          setAiAssistantFiles(filesData || []);
        }
      } else {
        // No data for this assistant type yet
        setAiAssistantData(null);
        setAiAssistantFiles([]);
        setFormData({
          assistant_type: assistantType,
          website_url: '',
          website_content: '',
          business_info: ''
        });
      }
    } catch (error) {
      console.error('Error loading AI assistant data:', error);
    }
  };

  const handleSave = async () => {
    if (!profile?.companies?.id || !selectedAssistantType) {
      toast({
        title: "Error",
        description: "Company information not found",
        variant: "destructive",
      });
      return;
    }

    setSaving(true);
    
    try {
      const dataToSave = {
        ...formData,
        assistant_type: selectedAssistantType,
        company_id: profile.companies.id
      };

      if (aiAssistantData) {
        // Update existing record
        const { error } = await supabase
          .from('ai_assistant_data')
          .update(dataToSave)
          .eq('id', aiAssistantData.id);

        if (error) throw error;
      } else {
        // Create new record
        const { data, error } = await supabase
          .from('ai_assistant_data')
          .insert([dataToSave])
          .select()
          .single();

        if (error) throw error;
        setAiAssistantData(data);
      }
      
      toast({
        title: "Success",
        description: "AI training data saved successfully.",
      });
      
      setIsEditing(false);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    if (!aiAssistantData) {
      toast({
        title: "Error",
        description: "Please save the assistant configuration first before uploading files.",
        variant: "destructive",
      });
      return;
    }

    try {
      for (const file of Array.from(files)) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}_${file.name}`;
        const filePath = `${aiAssistantData.id}/${fileName}`;

        // Upload to Supabase Storage
        const { error: uploadError } = await supabase.storage
          .from('ai-assistant-files')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        // Save file info to database
        const { error: dbError } = await supabase
          .from('ai_assistant_files')
          .insert([{
            assistant_data_id: aiAssistantData.id,
            file_name: file.name,
            file_path: filePath,
            file_type: file.type,
            file_size: file.size,
            is_image: file.type.startsWith('image/')
          }]);

        if (dbError) throw dbError;
      }

      toast({
        title: "Success",
        description: `${files.length} file(s) uploaded successfully.`,
      });

      // Reload files
      await loadAIAssistantData(profile.companies.id, selectedAssistantType);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleDeleteFile = async (fileId: string, filePath: string) => {
    try {
      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from('ai-assistant-files')
        .remove([filePath]);

      if (storageError) throw storageError;

      // Delete from database
      const { error: dbError } = await supabase
        .from('ai_assistant_files')
        .delete()
        .eq('id', fileId);

      if (dbError) throw dbError;

      toast({
        title: "Success",
        description: "File deleted successfully.",
      });

      // Reload files
      setAiAssistantFiles(aiAssistantFiles.filter(f => f.id !== fileId));
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
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

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith('image/')) return '🖼️';
    if (fileType.includes('pdf')) return '📄';
    if (fileType.includes('document') || fileType.includes('word')) return '📝';
    if (fileType.includes('spreadsheet') || fileType.includes('excel')) return '📊';
    return '📁';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <header className="border-b bg-card/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => navigate('/dashboard')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                AI Training Data
              </h1>
              <p className="text-muted-foreground">Manage documents and information for your AI assistants</p>
            </div>
          </div>
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
                <Button onClick={handleSave} disabled={saving}>
                  {saving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
                  Save Changes
                </Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)}>
                <Edit className="h-4 w-4 mr-2" />
                Edit Training Data
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Assistant Type Selector */}
        <Card>
          <CardHeader>
            <CardTitle>Select AI Assistant Type</CardTitle>
            <CardDescription>
              Choose which AI assistant you want to configure training data for
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {assistantTypes.map((type) => {
                const IconComponent = type.icon;
                return (
                  <Card 
                    key={type.value}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      selectedAssistantType === type.value 
                        ? 'ring-2 ring-primary bg-primary/5' 
                        : 'hover:bg-secondary/20'
                    }`}
                    onClick={() => handleAssistantTypeChange(type.value)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <IconComponent className="h-5 w-5 text-primary" />
                        <h3 className="font-medium">{type.label}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">{type.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {selectedAssistantType && (
          <>
            {/* Current Assistant Info */}
            <div className="flex items-center gap-3 p-4 bg-primary/10 rounded-lg border border-primary/20">
              {(() => {
                const currentType = assistantTypes.find(t => t.value === selectedAssistantType);
                const IconComponent = currentType?.icon || Bot;
                return (
                  <>
                    <IconComponent className="h-6 w-6 text-primary" />
                    <div>
                      <h3 className="font-semibold text-primary">{currentType?.label}</h3>
                      <p className="text-sm text-muted-foreground">{currentType?.description}</p>
                    </div>
                  </>
                );
              })()}
            </div>

            {/* AI Assistant Configuration */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="h-5 w-5" />
                  {assistantTypes.find(t => t.value === selectedAssistantType)?.label} Configuration
                </CardTitle>
                <CardDescription>
                  Configure the specific information and files for this AI assistant
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="website_url" className="flex items-center gap-2">
                      <Globe className="h-4 w-4" />
                      Website URL
                    </Label>
                    {isEditing ? (
                      <Input
                        id="website_url"
                        type="url"
                        value={formData.website_url}
                        onChange={(e) => setFormData({ ...formData, website_url: e.target.value })}
                        placeholder="https://yourwebsite.com"
                      />
                    ) : (
                      <p className="text-sm py-2 px-3 bg-secondary/20 rounded">
                        {formData.website_url ? (
                          <a href={formData.website_url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                            {formData.website_url}
                          </a>
                        ) : 'Not set'}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="business_info" className="flex items-center gap-2">
                    <Building className="h-4 w-4" />
                    {selectedAssistantType === 'social_media' ? 'Social Media Strategy & Brand Voice' : 
                     selectedAssistantType === 'hr_assistant' ? 'HR Policies & Company Culture' :
                     selectedAssistantType === 'marketing' ? 'Marketing Strategy & Target Audience' :
                     selectedAssistantType === 'finance' ? 'Financial Processes & Accounting Info' :
                     'Business Information'}
                  </Label>
                  {isEditing ? (
                    <Textarea
                      id="business_info"
                      value={formData.business_info}
                      onChange={(e) => setFormData({ ...formData, business_info: e.target.value })}
                      placeholder={
                        selectedAssistantType === 'social_media' ? 'Describe your brand voice, target audience, content themes, posting schedule preferences...' :
                        selectedAssistantType === 'hr_assistant' ? 'Company policies, culture, team structure, common HR processes...' :
                        selectedAssistantType === 'marketing' ? 'Marketing goals, target demographics, current campaigns, brand guidelines...' :
                        selectedAssistantType === 'finance' ? 'Accounting processes, financial goals, reporting requirements, key metrics...' :
                        'Describe your business, services, target audience, and key information...'
                      }
                      rows={6}
                    />
                  ) : (
                    <div className="text-sm py-2 px-3 bg-secondary/20 rounded">
                      {formData.business_info ? (
                        <pre className="whitespace-pre-wrap">{formData.business_info}</pre>
                      ) : 'Not set'}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website_content" className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Additional Context & Instructions
                  </Label>
                  {isEditing ? (
                    <Textarea
                      id="website_content"
                      value={formData.website_content}
                      onChange={(e) => setFormData({ ...formData, website_content: e.target.value })}
                      placeholder={
                        selectedAssistantType === 'social_media' ? 'Past successful posts, content guidelines, hashtag strategies, competitor analysis...' :
                        selectedAssistantType === 'hr_assistant' ? 'Employee handbook excerpts, common questions, company benefits, onboarding processes...' :
                        selectedAssistantType === 'marketing' ? 'Sales copy examples, customer testimonials, marketing materials, campaign performance data...' :
                        selectedAssistantType === 'finance' ? 'Financial templates, reporting formats, common calculations, regulatory requirements...' :
                        'Any additional context, instructions, or information that will help the AI assistant...'
                      }
                      rows={6}
                    />
                  ) : (
                    <div className="text-sm py-2 px-3 bg-secondary/20 rounded">
                      {formData.website_content ? (
                        <pre className="whitespace-pre-wrap">{formData.website_content}</pre>
                      ) : 'Not set'}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* File Upload and Management */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Training Files for {assistantTypes.find(t => t.value === selectedAssistantType)?.label}
                </CardTitle>
                <CardDescription>
                  Upload documents, images, and other files specific to this assistant type.
                  {selectedAssistantType === 'social_media' && ' Examples: Brand guidelines, previous posts, logo files, product photos'}
                  {selectedAssistantType === 'hr_assistant' && ' Examples: Employee handbook, policies, org charts, forms'}
                  {selectedAssistantType === 'marketing' && ' Examples: Campaign materials, customer data, brand assets, analytics reports'}
                  {selectedAssistantType === 'finance' && ' Examples: Financial statements, accounting templates, tax documents, budget files'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                  <input
                    type="file"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                    accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.webp,.xls,.xlsx,.csv"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-medium mb-2">Upload Training Files</h3>
                    <p className="text-muted-foreground mb-4">
                      {selectedAssistantType === 'social_media' ? 'Upload brand assets, content examples, and social media guidelines' :
                       selectedAssistantType === 'hr_assistant' ? 'Upload HR policies, employee documents, and process guides' :
                       selectedAssistantType === 'marketing' ? 'Upload marketing materials, customer data, and campaign assets' :
                       selectedAssistantType === 'finance' ? 'Upload financial documents, templates, and accounting data' :
                       'Upload relevant documents and files for this assistant'}
                    </p>
                    <Button type="button">
                      <Plus className="h-4 w-4 mr-2" />
                      Choose Files
                    </Button>
                  </label>
                </div>

                {/* Uploaded Files List */}
                {aiAssistantFiles.length > 0 && (
                  <div>
                    <h3 className="text-lg font-medium mb-4">Uploaded Files ({aiAssistantFiles.length})</h3>
                    <div className="space-y-3">
                      {aiAssistantFiles.map((file) => (
                        <div key={file.id} className="flex items-center justify-between p-3 bg-secondary/20 rounded-lg">
                          <div className="flex items-center gap-3">
                            <span className="text-lg">{getFileIcon(file.file_type)}</span>
                            <div>
                              <p className="font-medium">{file.file_name}</p>
                              <p className="text-sm text-muted-foreground">
                                {formatFileSize(file.file_size)} • {new Date(file.created_at).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleDeleteFile(file.id, file.file_path)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </>
        )}
      </main>
    </div>
  );
};

export default AITrainingData;