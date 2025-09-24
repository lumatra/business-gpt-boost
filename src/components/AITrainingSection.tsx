import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { FileText, Upload, Edit3, Trash2, Globe, Building2, Save, X } from 'lucide-react';

interface AITrainingSectionProps {
  assistantType: 'social_media' | 'hr' | 'marketing' | 'finance' | 'customer_service';
  companyId: string;
  aiAssistantData: any;
  aiAssistantFiles: any[];
  onDataUpdate: () => void;
}

export const AITrainingSection: React.FC<AITrainingSectionProps> = ({
  assistantType,
  companyId,
  aiAssistantData,
  aiAssistantFiles,
  onDataUpdate
}) => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [businessInfo, setBusinessInfo] = useState(aiAssistantData?.business_info || '');
  const [websiteUrl, setWebsiteUrl] = useState(aiAssistantData?.website_url || '');
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const assistantTypeData = {
    social_media: {
      title: 'Social Media Training Data',
      description: 'Brand voice, content examples, and social media guidelines',
      placeholder: 'Add your brand voice guidelines, content examples, target audience info, posting schedules, hashtag strategies...'
    },
    hr: {
      title: 'HR Training Data',
      description: 'Staff policies, procedures, and HR documentation',
      placeholder: 'Add staff handbooks, HR policies, shift schedules, employee procedures, communication templates...'
    },
    marketing: {
      title: 'Marketing Training Data',
      description: 'Campaign strategies, customer data, and marketing materials',
      placeholder: 'Add marketing strategies, customer personas, campaign examples, promotional materials, pricing info...'
    },
    finance: {
      title: 'Finance Training Data',
      description: 'Financial reports, accounting procedures, and business metrics',
      placeholder: 'Add financial procedures, account structures, reporting formats, budget templates...'
    },
    customer_service: {
      title: 'Customer Service Training Data',
      description: 'Service scripts, FAQ, and customer interaction guidelines',
      placeholder: 'Add customer service scripts, FAQ content, complaint handling procedures, service standards...'
    }
  };

  const currentData = assistantTypeData[assistantType];
  
  // Filter files for this assistant type
  const relevantFiles = aiAssistantFiles.filter(file => 
    aiAssistantData?.assistant_type === assistantType
  );

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('ai_assistant_data')
        .upsert({
          id: aiAssistantData?.id,
          company_id: companyId,
          assistant_type: assistantType,
          business_info: businessInfo,
          website_url: websiteUrl || null
        });

      if (error) throw error;

      toast({
        title: "Training data updated",
        description: "Your AI assistant training data has been saved.",
      });

      setIsEditing(false);
      onDataUpdate();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    try {
      // First ensure we have AI assistant data
      let assistantDataId = aiAssistantData?.id;
      
      if (!assistantDataId) {
        const { data: newAssistantData, error: createError } = await supabase
          .from('ai_assistant_data')
          .insert({
            company_id: companyId,
            assistant_type: assistantType,
            business_info: businessInfo || null,
            website_url: websiteUrl || null
          })
          .select()
          .single();

        if (createError) throw createError;
        assistantDataId = newAssistantData.id;
      }

      // Upload files to storage and create records
      for (const file of files) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}_${file.name}`;
        const filePath = `${companyId}/${assistantType}/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('ai-assistant-files')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        // Create file record
        const { error: fileError } = await supabase
          .from('ai_assistant_files')
          .insert({
            assistant_data_id: assistantDataId,
            file_name: file.name,
            file_path: filePath,
            file_type: file.type,
            file_size: file.size,
            is_image: file.type.startsWith('image/')
          });

        if (fileError) throw fileError;
      }

      toast({
        title: "Files uploaded",
        description: `${files.length} file(s) uploaded successfully.`,
      });

      onDataUpdate();
    } catch (error: any) {
      toast({
        title: "Upload failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      // Clear the input
      event.target.value = '';
    }
  };

  const handleDeleteFile = async (fileId: string, filePath: string) => {
    try {
      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from('ai-assistant-files')
        .remove([filePath]);

      if (storageError) throw storageError;

      // Delete record
      const { error: dbError } = await supabase
        .from('ai_assistant_files')
        .delete()
        .eq('id', fileId);

      if (dbError) throw dbError;

      toast({
        title: "File deleted",
        description: "File has been removed from training data.",
      });

      onDataUpdate();
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

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              {currentData.title}
            </CardTitle>
            <CardDescription>
              {currentData.description}
            </CardDescription>
          </div>
          {!isEditing && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setIsEditing(true)}
            >
              <Edit3 className="h-4 w-4 mr-2" />
              Edit
            </Button>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Business Information Section */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="website">Website URL</Label>
            {isEditing ? (
              <div className="flex gap-2 mt-1">
                <Input
                  id="website"
                  placeholder="https://your-website.com"
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                />
              </div>
            ) : (
              <div className="mt-1">
                {websiteUrl ? (
                  <a 
                    href={websiteUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline flex items-center gap-2"
                  >
                    <Globe className="h-4 w-4" />
                    {websiteUrl}
                  </a>
                ) : (
                  <p className="text-muted-foreground text-sm">No website URL set</p>
                )}
              </div>
            )}
          </div>

          <div>
            <Label htmlFor="business-info">Business Information</Label>
            {isEditing ? (
              <Textarea
                id="business-info"
                placeholder={currentData.placeholder}
                value={businessInfo}
                onChange={(e) => setBusinessInfo(e.target.value)}
                rows={6}
                className="mt-1"
              />
            ) : (
              <div className="mt-1 p-3 bg-secondary/50 rounded-md">
                {businessInfo ? (
                  <p className="text-sm whitespace-pre-wrap">{businessInfo}</p>
                ) : (
                  <p className="text-muted-foreground text-sm">No business information added yet</p>
                )}
              </div>
            )}
          </div>

          {isEditing && (
            <div className="flex gap-2">
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? (
                  <>
                    <Save className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </>
                )}
              </Button>
              <Button 
                variant="outline" 
                onClick={() => {
                  setIsEditing(false);
                  setBusinessInfo(aiAssistantData?.business_info || '');
                  setWebsiteUrl(aiAssistantData?.website_url || '');
                }}
              >
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </div>
          )}
        </div>

        {/* File Upload Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">Training Files</h4>
            <div>
              <input
                type="file"
                id={`file-upload-${assistantType}`}
                multiple
                accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg,.gif"
                onChange={handleFileUpload}
                className="hidden"
              />
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => document.getElementById(`file-upload-${assistantType}`)?.click()}
                disabled={isUploading}
              >
                {isUploading ? (
                  <>
                    <Upload className="h-4 w-4 mr-2 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Files
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Files List */}
          {relevantFiles.length > 0 ? (
            <div className="space-y-2">
              {relevantFiles.map((file) => (
                <div key={file.id} className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded flex items-center justify-center ${
                      file.is_image 
                        ? 'bg-green-100 text-green-600' 
                        : 'bg-blue-100 text-blue-600'
                    }`}>
                      <span className="text-xs font-medium">
                        {file.is_image ? 'IMG' : 'DOC'}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-sm">{file.file_name}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatFileSize(file.file_size)}
                      </p>
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
              ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-secondary/20 rounded-lg border-2 border-dashed">
              <Building2 className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                No training files uploaded yet. Add documents, images, or other files to help train your AI assistant.
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};