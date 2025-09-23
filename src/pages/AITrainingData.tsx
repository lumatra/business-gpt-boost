import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, ArrowLeft, Upload, FileText, Trash2, Download, Plus, Edit, Save, X, Globe, Building, Bot } from 'lucide-react';
import type { User } from '@supabase/supabase-js';

const AITrainingData = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [aiAssistantData, setAiAssistantData] = useState<any>(null);
  const [aiAssistantFiles, setAiAssistantFiles] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  
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
  }, [navigate]);

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
        
        if (profileData.companies) {
          await loadAIAssistantData(profileData.companies.id);
        }
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadAIAssistantData = async (companyId: string) => {
    try {
      // Load AI assistant data
      const { data: assistantData, error: assistantError } = await supabase
        .from('ai_assistant_data')
        .select('*')
        .eq('company_id', companyId)
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
        // No AI assistant data exists, initialize empty form
        setFormData({
          assistant_type: 'business',
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
    if (!profile?.companies?.id) return;

    setSaving(true);
    try {
      if (aiAssistantData) {
        // Update existing data
        const { error } = await supabase
          .from('ai_assistant_data')
          .update({
            assistant_type: formData.assistant_type,
            website_url: formData.website_url,
            website_content: formData.website_content,
            business_info: formData.business_info
          })
          .eq('id', aiAssistantData.id);

        if (error) throw error;
      } else {
        // Create new data
        const { data: newData, error } = await supabase
          .from('ai_assistant_data')
          .insert({
            company_id: profile.companies.id,
            assistant_type: formData.assistant_type,
            website_url: formData.website_url,
            website_content: formData.website_content,
            business_info: formData.business_info
          })
          .select()
          .single();

        if (error) throw error;
        setAiAssistantData(newData);
      }

      toast({
        title: "Success",
        description: "AI training data updated successfully.",
      });

      setIsEditing(false);
      await loadAIAssistantData(profile.companies.id); // Reload data
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
    const file = event.target.files?.[0];
    if (!file || !aiAssistantData?.id) return;

    try {
      // Upload file to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `ai-assistant-files/${aiAssistantData.id}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('ai-assistant-files')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Save file record to database
      const { error: dbError } = await supabase
        .from('ai_assistant_files')
        .insert({
          assistant_data_id: aiAssistantData.id,
          file_name: file.name,
          file_path: filePath,
          file_type: file.type,
          file_size: file.size,
          is_image: file.type.startsWith('image/')
        });

      if (dbError) throw dbError;

      toast({
        title: "Success",
        description: "File uploaded successfully.",
      });

      // Reload files
      await loadAIAssistantData(profile!.companies.id);
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
        {/* AI Assistant Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5" />
              AI Assistant Configuration
            </CardTitle>
            <CardDescription>
              Configure the basic information that will help train your AI assistants
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="assistant_type">Assistant Type</Label>
                {isEditing ? (
                  <select
                    id="assistant_type"
                    value={formData.assistant_type}
                    onChange={(e) => setFormData({ ...formData, assistant_type: e.target.value })}
                    className="w-full px-3 py-2 border border-input bg-background rounded-md"
                  >
                    <option value="business">Business Assistant</option>
                    <option value="social_media">Social Media Assistant</option>
                    <option value="hr">HR Assistant</option>
                    <option value="marketing">Marketing Assistant</option>
                    <option value="custom">Custom Assistant</option>
                  </select>
                ) : (
                  <p className="text-sm py-2 px-3 bg-secondary/20 rounded capitalize">{formData.assistant_type || 'Not set'}</p>
                )}
              </div>

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
                Business Information
              </Label>
              {isEditing ? (
                <Textarea
                  id="business_info"
                  value={formData.business_info}
                  onChange={(e) => setFormData({ ...formData, business_info: e.target.value })}
                  placeholder="Detailed information about your business, services, policies, etc. This will help the AI understand your business context."
                  rows={8}
                />
              ) : (
                <div className="text-sm py-2 px-3 bg-secondary/20 rounded min-h-[120px] whitespace-pre-wrap">
                  {formData.business_info || 'Not set'}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="website_content">Website Content</Label>
              {isEditing ? (
                <Textarea
                  id="website_content"
                  value={formData.website_content}
                  onChange={(e) => setFormData({ ...formData, website_content: e.target.value })}
                  placeholder="Key content from your website, services offered, company values, etc."
                  rows={6}
                />
              ) : (
                <div className="text-sm py-2 px-3 bg-secondary/20 rounded min-h-[100px] whitespace-pre-wrap">
                  {formData.website_content || 'Not set'}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* File Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Training Documents & Files
              </span>
              {aiAssistantData && (
                <div className="flex gap-2">
                  <Button 
                    onClick={() => document.getElementById('file-upload')?.click()}
                    size="sm"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload File
                  </Button>
                  <input
                    id="file-upload"
                    type="file"
                    accept=".pdf,.doc,.docx,.txt,.md,.jpg,.jpeg,.png,.gif"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div>
              )}
            </CardTitle>
            <CardDescription>
              Upload documents, images, and files that will help train your AI assistants about your business
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!aiAssistantData ? (
              <div className="text-center py-8 text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Please save your AI assistant configuration first before uploading files.</p>
              </div>
            ) : aiAssistantFiles.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No training files uploaded yet.</p>
                <p className="text-sm mt-2">Upload documents, images, and other files to help train your AI assistants.</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {aiAssistantFiles.map((file) => (
                    <div key={file.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{getFileIcon(file.file_type)}</span>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm truncate">{file.file_name}</p>
                            <p className="text-xs text-muted-foreground">{formatFileSize(file.file_size)}</p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteFile(file.id, file.file_path)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Uploaded {new Date(file.created_at).toLocaleDateString()}</span>
                        {file.is_image && <span className="bg-primary/10 text-primary px-2 py-1 rounded">Image</span>}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Summary Stats */}
                <div className="border-t pt-4">
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{aiAssistantFiles.length} files uploaded</span>
                    <span>
                      Total size: {formatFileSize(aiAssistantFiles.reduce((sum, file) => sum + file.file_size, 0))}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Usage Guidelines */}
        <Card>
          <CardHeader>
            <CardTitle>Training Data Guidelines</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-2">Recommended File Types</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Business documents (PDF, Word)</li>
                  <li>• Product catalogs and menus</li>
                  <li>• Company policies and procedures</li>
                  <li>• Staff training materials</li>
                  <li>• Customer service scripts</li>
                  <li>• Marketing materials and brochures</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Best Practices</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Keep information current and accurate</li>
                  <li>• Include detailed business context</li>
                  <li>• Upload high-quality, clear documents</li>
                  <li>• Organize files by category or purpose</li>
                  <li>• Regular update training data as needed</li>
                  <li>• Remove outdated or irrelevant files</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AITrainingData;