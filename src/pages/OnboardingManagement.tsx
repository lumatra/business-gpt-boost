import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Plus, 
  Link as LinkIcon, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Eye, 
  Copy,
  Download,
  Trash2
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';

interface OnboardingSession {
  id: string;
  client_name: string;
  client_email: string;
  expires_at: string;
  status: string;
  access_token: string;
  created_at: string;
  steps_completed: any; // JSON type from database
  company_id: string;
}

interface OnboardingData {
  id: string;
  data_type: string;
  data_content: any;
  created_at: string;
}

interface OnboardingFile {
  id: string;
  file_name: string;
  file_path: string;
  file_type: string;
  file_size: number;
  description: string;
  created_at: string;
}

export default function OnboardingManagement() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [sessions, setSessions] = useState<OnboardingSession[]>([]);
  const [selectedSession, setSelectedSession] = useState<OnboardingSession | null>(null);
  const [sessionData, setSessionData] = useState<OnboardingData[]>([]);
  const [sessionFiles, setSessionFiles] = useState<OnboardingFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);

  // Create session form
  const [newSession, setNewSession] = useState({
    client_name: '',
    client_email: '',
    expires_in_days: 7,
    company_id: ''
  });

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      const { data, error } = await supabase
        .from('onboarding_sessions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSessions(data || []);
    } catch (error) {
      console.error('Error fetching sessions:', error);
      toast({
        title: "Error",
        description: "Failed to load onboarding sessions.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createSession = async () => {
    if (!user || !newSession.client_name || !newSession.client_email) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Generate secure token
      const { data: tokenData, error: tokenError } = await supabase
        .rpc('generate_onboarding_token');

      if (tokenError) throw tokenError;

      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + newSession.expires_in_days);

      const { error } = await supabase
        .from('onboarding_sessions')
        .insert({
          client_name: newSession.client_name,
          client_email: newSession.client_email,
          access_token: tokenData,
          expires_at: expiresAt.toISOString(),
          created_by: user.id,
          company_id: newSession.company_id || null
        });

      if (error) throw error;

      toast({
        title: "Session Created",
        description: `Secure onboarding link created for ${newSession.client_name}`,
      });

      setShowCreateDialog(false);
      setNewSession({ client_name: '', client_email: '', expires_in_days: 7, company_id: '' });
      fetchSessions();

    } catch (error) {
      console.error('Error creating session:', error);
      toast({
        title: "Error",
        description: "Failed to create onboarding session.",
        variant: "destructive",
      });
    }
  };

  const viewSessionDetails = async (session: OnboardingSession) => {
    setSelectedSession(session);
    
    try {
      // Fetch session data
      const { data: dataResult, error: dataError } = await supabase
        .from('onboarding_data')
        .select('*')
        .eq('session_id', session.id)
        .order('created_at', { ascending: true });

      if (dataError) throw dataError;
      setSessionData(dataResult || []);

      // Fetch session files
      const { data: filesResult, error: filesError } = await supabase
        .from('onboarding_files')
        .select('*')
        .eq('session_id', session.id)
        .order('created_at', { ascending: true });

      if (filesError) throw filesError;
      setSessionFiles(filesResult || []);

      setShowDetailsDialog(true);

    } catch (error) {
      console.error('Error fetching session details:', error);
      toast({
        title: "Error",
        description: "Failed to load session details.",
        variant: "destructive",
      });
    }
  };

  const copyOnboardingLink = (token: string) => {
    const link = `${window.location.origin}/onboarding/${token}`;
    navigator.clipboard.writeText(link);
    toast({
      title: "Link Copied",
      description: "Onboarding link copied to clipboard.",
    });
  };

  const downloadFile = async (file: OnboardingFile) => {
    try {
      const { data, error } = await supabase.storage
        .from('onboarding-files')
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

  const deleteSession = async (sessionId: string) => {
    if (!confirm('Are you sure you want to delete this onboarding session? This action cannot be undone.')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('onboarding_sessions')
        .delete()
        .eq('id', sessionId);

      if (error) throw error;

      toast({
        title: "Session Deleted",
        description: "Onboarding session and all related data have been deleted.",
      });

      fetchSessions();
    } catch (error) {
      console.error('Error deleting session:', error);
      toast({
        title: "Error",
        description: "Failed to delete onboarding session.",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (session: OnboardingSession) => {
    const isExpired = new Date(session.expires_at) < new Date();
    const completedSteps = Array.isArray(session.steps_completed) ? session.steps_completed.length : 0;
    
    if (isExpired && session.status !== 'completed') {
      return <Badge variant="destructive">Expired</Badge>;
    }
    
    switch (session.status) {
      case 'completed':
        return <Badge variant="default" className="bg-green-500">Completed</Badge>;
      case 'in_progress':
        return <Badge variant="secondary">In Progress ({completedSteps}/4)</Badge>;
      default:
        return <Badge variant="outline">Pending</Badge>;
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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Onboarding Management</h1>
          <p className="text-muted-foreground">Manage secure client onboarding sessions</p>
        </div>
        
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Onboarding Link
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Secure Onboarding Link</DialogTitle>
              <DialogDescription>
                Generate a time-limited, secure link for client data collection.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="client_name">Client Name *</Label>
                <Input
                  id="client_name"
                  value={newSession.client_name}
                  onChange={(e) => setNewSession(prev => ({ ...prev, client_name: e.target.value }))}
                  placeholder="Enter client name"
                />
              </div>
              <div>
                <Label htmlFor="client_email">Client Email *</Label>
                <Input
                  id="client_email"
                  type="email"
                  value={newSession.client_email}
                  onChange={(e) => setNewSession(prev => ({ ...prev, client_email: e.target.value }))}
                  placeholder="Enter client email"
                />
              </div>
              <div>
                <Label htmlFor="expires_in_days">Expires in (days)</Label>
                <Input
                  id="expires_in_days"
                  type="number"
                  min="1"
                  max="30"
                  value={newSession.expires_in_days}
                  onChange={(e) => setNewSession(prev => ({ ...prev, expires_in_days: parseInt(e.target.value) || 7 }))}
                />
              </div>
              <div>
                <Label htmlFor="company_id">Company ID (optional)</Label>
                <Input
                  id="company_id"
                  value={newSession.company_id}
                  onChange={(e) => setNewSession(prev => ({ ...prev, company_id: e.target.value }))}
                  placeholder="Link to existing company"
                />
              </div>
              <Button onClick={createSession} className="w-full">
                Create Secure Link
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Sessions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Onboarding Sessions</CardTitle>
          <CardDescription>
            Manage and monitor secure client onboarding processes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Expires</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sessions.map((session) => (
                <TableRow key={session.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{session.client_name}</div>
                      <div className="text-sm text-muted-foreground">{session.client_email}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(session)}
                  </TableCell>
                  <TableCell>
                    {new Date(session.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {new Date(session.expires_at).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    {Array.isArray(session.steps_completed) ? session.steps_completed.length : 0}/4 steps
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => viewSessionDetails(session)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyOnboardingLink(session.access_token)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteSession(session.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {sessions.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    <div className="text-muted-foreground">
                      No onboarding sessions found. Create your first secure onboarding link.
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Session Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              Onboarding Details - {selectedSession?.client_name}
            </DialogTitle>
            <DialogDescription>
              Review all collected information and uploaded files
            </DialogDescription>
          </DialogHeader>
          
          {selectedSession && (
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="data">Collected Data</TabsTrigger>
                <TabsTrigger value="files">Files</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Client Name</Label>
                    <p className="text-sm font-medium">{selectedSession.client_name}</p>
                  </div>
                  <div>
                    <Label>Email</Label>
                    <p className="text-sm font-medium">{selectedSession.client_email}</p>
                  </div>
                  <div>
                    <Label>Status</Label>
                    <div className="mt-1">{getStatusBadge(selectedSession)}</div>
                  </div>
                  <div>
                    <Label>Progress</Label>
                    <p className="text-sm font-medium">
                      {Array.isArray(selectedSession.steps_completed) ? selectedSession.steps_completed.length : 0}/4 steps completed
                    </p>
                  </div>
                  <div>
                    <Label>Created</Label>
                    <p className="text-sm font-medium">{new Date(selectedSession.created_at).toLocaleString()}</p>
                  </div>
                  <div>
                    <Label>Expires</Label>
                    <p className="text-sm font-medium">{new Date(selectedSession.expires_at).toLocaleString()}</p>
                  </div>
                </div>
                
                <div>
                  <Label>Onboarding Link</Label>
                  <div className="flex items-center space-x-2 mt-1">
                    <Input
                      value={`${window.location.origin}/onboarding/${selectedSession.access_token}`}
                      readOnly
                      className="font-mono text-xs"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyOnboardingLink(selectedSession.access_token)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="data" className="space-y-4">
                {sessionData.map((data) => (
                  <Card key={data.id}>
                    <CardHeader>
                      <CardTitle className="text-lg capitalize">
                        {data.data_type.replace('_', ' ')}
                      </CardTitle>
                      <CardDescription>
                        Submitted: {new Date(data.created_at).toLocaleString()}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto whitespace-pre-wrap">
                        {JSON.stringify(data.data_content, null, 2)}
                      </pre>
                    </CardContent>
                  </Card>
                ))}
                {sessionData.length === 0 && (
                  <p className="text-center text-muted-foreground py-8">
                    No data collected yet.
                  </p>
                )}
              </TabsContent>
              
              <TabsContent value="files" className="space-y-4">
                {sessionFiles.map((file) => (
                  <Card key={file.id}>
                    <CardContent className="flex items-center justify-between p-4">
                      <div>
                        <p className="font-medium">{file.file_name}</p>
                        <p className="text-sm text-muted-foreground">
                          {(file.file_size / 1024 / 1024).toFixed(2)} MB • {file.file_type}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Uploaded: {new Date(file.created_at).toLocaleString()}
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => downloadFile(file)}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
                {sessionFiles.length === 0 && (
                  <p className="text-center text-muted-foreground py-8">
                    No files uploaded yet.
                  </p>
                )}
              </TabsContent>
            </Tabs>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}