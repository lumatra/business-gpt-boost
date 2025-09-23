import React, { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Upload, Shield, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface OnboardingSession {
  id: string;
  client_name: string;
  client_email: string;
  expires_at: string;
  status: string;
  steps_completed: any; // JSON type from database
}

const ONBOARDING_STEPS = [
  { id: 'company_info', title: 'Company Information', description: 'Basic company details, location, and key personnel' },
  { id: 'technical_requirements', title: 'Technical Requirements', description: 'System specifications and integration needs' },
  { id: 'access_credentials', title: 'Access & Credentials', description: 'API keys and system access information' },
  { id: 'documentation', title: 'Documentation Upload', description: 'Upload relevant documents and files' },
];

export default function OnboardingPortal() {
  const { token } = useParams();
  const { toast } = useToast();
  const [session, setSession] = useState<OnboardingSession | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isExpired, setIsExpired] = useState(false);

  // Form data
  const [companyData, setCompanyData] = useState({
    company_name: '',
    company_address: '',
    industry: '',
    company_size: '',
    primary_contact: '',
    phone: '',
    website: '',
    business_description: '',
    key_employees: '',
    location_details: '',
    marketing_strapline: '',
    target_market: '',
    unique_selling_points: ''
  });

  const [technicalData, setTechnicalData] = useState({
    current_systems: '',
    integration_requirements: '',
    data_volume: '',
    performance_requirements: '',
    compliance_requirements: ''
  });

  const [credentialsData, setCredentialsData] = useState({
    api_endpoints: '',
    authentication_method: '',
    database_details: '',
    security_requirements: '',
    network_restrictions: ''
  });

  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  useEffect(() => {
    if (token) {
      fetchSession();
    }
  }, [token]);

  const fetchSession = async () => {
    try {
      const { data, error } = await supabase
        .from('onboarding_sessions')
        .select('*')
        .eq('access_token', token)
        .single();

      if (error) {
        toast({
          title: "Invalid Link",
          description: "This onboarding link is invalid or has expired.",
          variant: "destructive",
        });
        return;
      }

      if (new Date(data.expires_at) < new Date()) {
        setIsExpired(true);
        return;
      }

      setSession(data);
      
      // Set current step based on completed steps
      const completedSteps = Array.isArray(data.steps_completed) ? data.steps_completed : [];
      setCurrentStep(completedSteps.length);
      
    } catch (error) {
      console.error('Error fetching session:', error);
      toast({
        title: "Error",
        description: "Failed to load onboarding session.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const saveStepData = async (stepId: string, data: any) => {
    if (!session) return;

    setSubmitting(true);
    try {
      // Save the step data
      const { error: dataError } = await supabase
        .from('onboarding_data')
        .insert({
          session_id: session.id,
          data_type: stepId,
          data_content: data
        });

      if (dataError) throw dataError;

      // Update session with completed step
      const completedSteps = Array.isArray(session.steps_completed) ? session.steps_completed : [];
      const updatedSteps = [...completedSteps, stepId];

      const { error: sessionError } = await supabase
        .from('onboarding_sessions')
        .update({ 
          steps_completed: updatedSteps,
          status: updatedSteps.length === ONBOARDING_STEPS.length ? 'completed' : 'in_progress'
        })
        .eq('id', session.id);

      if (sessionError) throw sessionError;

      setSession({ ...session, steps_completed: updatedSteps });
      setCurrentStep(currentStep + 1);

      toast({
        title: "Step Completed",
        description: "Your information has been securely saved.",
      });

    } catch (error) {
      console.error('Error saving step data:', error);
      toast({
        title: "Error",
        description: "Failed to save information. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleFileUpload = async (files: FileList) => {
    if (!session) return;

    const maxSize = 10 * 1024 * 1024; // 10MB limit
    const validFiles = Array.from(files).filter(file => file.size <= maxSize);
    
    if (validFiles.length !== files.length) {
      toast({
        title: "File Size Limit",
        description: "Some files exceed the 10MB limit and were not uploaded.",
        variant: "destructive",
      });
    }

    for (const file of validFiles) {
      try {
        const fileName = `${session.id}/${Date.now()}-${file.name}`;
        
        const { error: uploadError } = await supabase.storage
          .from('onboarding-files')
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        // Save file record
        const { error: recordError } = await supabase
          .from('onboarding_files')
          .insert({
            session_id: session.id,
            file_name: file.name,
            file_path: fileName,
            file_type: file.type,
            file_size: file.size,
            description: 'Client uploaded document'
          });

        if (recordError) throw recordError;

      } catch (error) {
        console.error('Error uploading file:', error);
        toast({
          title: "Upload Error",
          description: `Failed to upload ${file.name}`,
          variant: "destructive",
        });
      }
    }

    setUploadedFiles(prev => [...prev, ...validFiles]);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/404" replace />;
  }

  if (isExpired) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardHeader className="text-center">
            <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
            <CardTitle className="text-destructive">Link Expired</CardTitle>
            <CardDescription>
              This onboarding link has expired. Please contact us for a new link.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  const completedSteps = Array.isArray(session.steps_completed) ? session.steps_completed : [];
  const progress = (completedSteps.length / ONBOARDING_STEPS.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Shield className="h-8 w-8 text-primary mr-2" />
            <h1 className="text-3xl font-bold">Secure Onboarding Portal</h1>
          </div>
          <p className="text-muted-foreground">
            Welcome {session.client_name}. Complete the steps below to securely share your information.
          </p>
          <div className="flex items-center justify-center mt-4 text-sm text-muted-foreground">
            <Clock className="h-4 w-4 mr-1" />
            Expires: {new Date(session.expires_at).toLocaleDateString()}
          </div>
        </div>

        {/* Progress */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
              Progress: {completedSteps.length} of {ONBOARDING_STEPS.length} completed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={progress} className="w-full" />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
              {ONBOARDING_STEPS.map((step, index) => (
                <div key={step.id} className={`p-3 rounded-lg border ${
                  completedSteps.includes(step.id) 
                    ? 'bg-green-50 border-green-200' 
                    : index === currentStep 
                    ? 'bg-primary/5 border-primary/20' 
                    : 'bg-muted/30 border-muted'
                }`}>
                  <div className="flex items-center mb-2">
                    {completedSteps.includes(step.id) ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <div className={`h-5 w-5 rounded-full border-2 ${
                        index === currentStep ? 'border-primary bg-primary/20' : 'border-muted-foreground'
                      }`} />
                    )}
                    <span className="ml-2 font-medium text-sm">{step.title}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Current Step Form */}
        {currentStep < ONBOARDING_STEPS.length && (
          <Card>
            <CardHeader>
              <CardTitle>{ONBOARDING_STEPS[currentStep].title}</CardTitle>
              <CardDescription>{ONBOARDING_STEPS[currentStep].description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Company Information Step */}
              {currentStep === 0 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="company_name">Company Name *</Label>
                      <Input
                        id="company_name"
                        value={companyData.company_name}
                        onChange={(e) => setCompanyData(prev => ({ ...prev, company_name: e.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="industry">Industry</Label>
                      <Input
                        id="industry"
                        value={companyData.industry}
                        onChange={(e) => setCompanyData(prev => ({ ...prev, industry: e.target.value }))}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="company_address">Company Address & Location Details</Label>
                    <Textarea
                      id="company_address"
                      value={companyData.company_address}
                      onChange={(e) => setCompanyData(prev => ({ ...prev, company_address: e.target.value }))}
                      placeholder="Full address, city, country, nearby landmarks..."
                    />
                  </div>
                  <div>
                    <Label htmlFor="business_description">Business Description</Label>
                    <Textarea
                      id="business_description"
                      value={companyData.business_description}
                      onChange={(e) => setCompanyData(prev => ({ ...prev, business_description: e.target.value }))}
                      placeholder="What does your company do? Products, services, mission..."
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="marketing_strapline">Marketing Strapline / Tagline</Label>
                    <Input
                      id="marketing_strapline"
                      value={companyData.marketing_strapline}
                      onChange={(e) => setCompanyData(prev => ({ ...prev, marketing_strapline: e.target.value }))}
                      placeholder="Your company's main marketing message or tagline"
                    />
                  </div>
                  <div>
                    <Label htmlFor="key_employees">Key Employees & Team</Label>
                    <Textarea
                      id="key_employees"
                      value={companyData.key_employees}
                      onChange={(e) => setCompanyData(prev => ({ ...prev, key_employees: e.target.value }))}
                      placeholder="CEO, CTO, department heads, key personnel and their roles..."
                      rows={3}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="target_market">Target Market</Label>
                      <Textarea
                        id="target_market"
                        value={companyData.target_market}
                        onChange={(e) => setCompanyData(prev => ({ ...prev, target_market: e.target.value }))}
                        placeholder="Who are your customers? Demographics, industries..."
                        rows={2}
                      />
                    </div>
                    <div>
                      <Label htmlFor="unique_selling_points">Unique Selling Points</Label>
                      <Textarea
                        id="unique_selling_points"
                        value={companyData.unique_selling_points}
                        onChange={(e) => setCompanyData(prev => ({ ...prev, unique_selling_points: e.target.value }))}
                        placeholder="What makes you different from competitors?"
                        rows={2}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="company_size">Company Size</Label>
                      <Input
                        id="company_size"
                        value={companyData.company_size}
                        onChange={(e) => setCompanyData(prev => ({ ...prev, company_size: e.target.value }))}
                        placeholder="e.g., 50-100 employees"
                      />
                    </div>
                    <div>
                      <Label htmlFor="primary_contact">Primary Contact</Label>
                      <Input
                        id="primary_contact"
                        value={companyData.primary_contact}
                        onChange={(e) => setCompanyData(prev => ({ ...prev, primary_contact: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="website">Website</Label>
                      <Input
                        id="website"
                        value={companyData.website}
                        onChange={(e) => setCompanyData(prev => ({ ...prev, website: e.target.value }))}
                        placeholder="https://..."
                      />
                    </div>
                  </div>
                  <Button 
                    onClick={() => saveStepData('company_info', companyData)}
                    disabled={submitting || !companyData.company_name}
                    className="w-full"
                  >
                    {submitting ? 'Saving...' : 'Save & Continue'}
                  </Button>
                </div>
              )}

              {/* Technical Requirements Step */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="current_systems">Current Systems & Technologies</Label>
                    <Textarea
                      id="current_systems"
                      value={technicalData.current_systems}
                      onChange={(e) => setTechnicalData(prev => ({ ...prev, current_systems: e.target.value }))}
                      placeholder="Describe your current tech stack, databases, APIs..."
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="integration_requirements">Integration Requirements</Label>
                    <Textarea
                      id="integration_requirements"
                      value={technicalData.integration_requirements}
                      onChange={(e) => setTechnicalData(prev => ({ ...prev, integration_requirements: e.target.value }))}
                      placeholder="What systems need to be integrated? API requirements?"
                      rows={3}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="data_volume">Expected Data Volume</Label>
                      <Input
                        id="data_volume"
                        value={technicalData.data_volume}
                        onChange={(e) => setTechnicalData(prev => ({ ...prev, data_volume: e.target.value }))}
                        placeholder="e.g., 10GB/month, 1M records/day"
                      />
                    </div>
                    <div>
                      <Label htmlFor="performance_requirements">Performance Requirements</Label>
                      <Input
                        id="performance_requirements"
                        value={technicalData.performance_requirements}
                        onChange={(e) => setTechnicalData(prev => ({ ...prev, performance_requirements: e.target.value }))}
                        placeholder="Response time, throughput requirements"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="compliance_requirements">Compliance & Security Requirements</Label>
                    <Textarea
                      id="compliance_requirements"
                      value={technicalData.compliance_requirements}
                      onChange={(e) => setTechnicalData(prev => ({ ...prev, compliance_requirements: e.target.value }))}
                      placeholder="GDPR, HIPAA, SOC2, etc."
                    />
                  </div>
                  <Button 
                    onClick={() => saveStepData('technical_requirements', technicalData)}
                    disabled={submitting}
                    className="w-full"
                  >
                    {submitting ? 'Saving...' : 'Save & Continue'}
                  </Button>
                </div>
              )}

              {/* Access & Credentials Step */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                    <div className="flex items-center">
                      <Shield className="h-5 w-5 text-yellow-600 mr-2" />
                      <p className="text-sm text-yellow-800">
                        <strong>Security Note:</strong> All sensitive information is encrypted and securely stored.
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="api_endpoints">API Endpoints & URLs</Label>
                    <Textarea
                      id="api_endpoints"
                      value={credentialsData.api_endpoints}
                      onChange={(e) => setCredentialsData(prev => ({ ...prev, api_endpoints: e.target.value }))}
                      placeholder="List relevant API endpoints, staging/production URLs..."
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="authentication_method">Authentication Methods</Label>
                    <Textarea
                      id="authentication_method"
                      value={credentialsData.authentication_method}
                      onChange={(e) => setCredentialsData(prev => ({ ...prev, authentication_method: e.target.value }))}
                      placeholder="OAuth, API keys, JWT tokens, etc."
                    />
                  </div>
                  <div>
                    <Label htmlFor="database_details">Database Connection Details</Label>
                    <Textarea
                      id="database_details"
                      value={credentialsData.database_details}
                      onChange={(e) => setCredentialsData(prev => ({ ...prev, database_details: e.target.value }))}
                      placeholder="Database type, connection strings (without passwords), schemas..."
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="security_requirements">Security & Access Requirements</Label>
                    <Textarea
                      id="security_requirements"
                      value={credentialsData.security_requirements}
                      onChange={(e) => setCredentialsData(prev => ({ ...prev, security_requirements: e.target.value }))}
                      placeholder="IP whitelisting, VPN requirements, access controls..."
                    />
                  </div>
                  <div>
                    <Label htmlFor="network_restrictions">Network & Firewall Information</Label>
                    <Textarea
                      id="network_restrictions"
                      value={credentialsData.network_restrictions}
                      onChange={(e) => setCredentialsData(prev => ({ ...prev, network_restrictions: e.target.value }))}
                      placeholder="Firewall rules, network topology, restrictions..."
                    />
                  </div>
                  <Button 
                    onClick={() => saveStepData('access_credentials', credentialsData)}
                    disabled={submitting}
                    className="w-full"
                  >
                    {submitting ? 'Saving...' : 'Save & Continue'}
                  </Button>
                </div>
              )}

              {/* Documentation Upload Step */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <div>
                    <Label>Upload Documentation & Files</Label>
                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                      <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-sm text-muted-foreground mb-4">
                        Drag and drop files here, or click to select files
                      </p>
                      <input
                        type="file"
                        multiple
                        className="hidden"
                        id="file-upload"
                        onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
                      />
                      <Button 
                        variant="outline" 
                        onClick={() => document.getElementById('file-upload')?.click()}
                      >
                        Select Files
                      </Button>
                      <p className="text-xs text-muted-foreground mt-2">
                        Max file size: 10MB. Supported formats: PDF, DOC, DOCX, TXT, PNG, JPG
                      </p>
                    </div>
                  </div>

                  {uploadedFiles.length > 0 && (
                    <div>
                      <Label>Uploaded Files</Label>
                      <div className="space-y-2">
                        {uploadedFiles.map((file, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                            <span className="text-sm">{file.name}</span>
                            <span className="text-xs text-muted-foreground">
                              {(file.size / 1024 / 1024).toFixed(2)} MB
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <Button 
                    onClick={() => saveStepData('documentation', { files_uploaded: uploadedFiles.length })}
                    disabled={submitting}
                    className="w-full"
                  >
                    {submitting ? 'Completing...' : 'Complete Onboarding'}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Completion Message */}
        {currentStep >= ONBOARDING_STEPS.length && (
          <Card>
            <CardHeader className="text-center">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <CardTitle className="text-green-600">Onboarding Complete!</CardTitle>
              <CardDescription>
                Thank you for securely providing your information. Our team will review your details and contact you within 24-48 hours to discuss the next steps.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm text-muted-foreground">
                All your information has been encrypted and securely stored. You can close this window.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}