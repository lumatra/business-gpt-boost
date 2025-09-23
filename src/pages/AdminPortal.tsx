import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { 
  Loader2, 
  LogOut, 
  Building2, 
  MessageSquare, 
  Users, 
  FileText,
  Calendar,
  Mail,
  Phone,
  Globe,
  Settings
} from 'lucide-react';

interface Company {
  id: string;
  name: string;
  email: string;
  phone?: string;
  website?: string;
  status: string;
  subscription_tier?: string;
  created_at: string;
  updated_at: string;
}

interface Inquiry {
  id: string;
  contact_name: string;
  company_name: string;
  email: string;
  phone?: string;
  message?: string;
  status?: string;
  created_at: string;
}

interface OnboardingSession {
  id: string;
  client_name: string;
  client_email: string;
  status: string;
  created_at: string;
  expires_at: string;
  completed_at?: string;
}

const AdminPortal = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [onboardingSessions, setOnboardingSessions] = useState<OnboardingSession[]>([]);

  useEffect(() => {
    const checkAdminAccess = async () => {
      if (authLoading) return;
      
      if (!user) {
        navigate('/auth');
        return;
      }

      try {
        // Check if user has admin role
        const { data: hasAdminRole, error } = await supabase
          .rpc('has_role', { _user_id: user.id, _role: 'admin' });

        if (error) {
          console.error('Error checking admin role:', error);
          toast({
            title: "Access Denied",
            description: "Unable to verify admin permissions.",
            variant: "destructive",
          });
          navigate('/dashboard');
          return;
        }

        if (!hasAdminRole) {
          toast({
            title: "Access Denied",
            description: "You don't have admin permissions to access this page.",
            variant: "destructive",
          });
          navigate('/dashboard');
          return;
        }

        setIsAdmin(true);
        await loadAdminData();
      } catch (error) {
        console.error('Error checking admin access:', error);
        navigate('/dashboard');
      }
    };

    checkAdminAccess();
  }, [user, authLoading, navigate, toast]);

  const loadAdminData = async () => {
    try {
      setLoading(true);

      // Load companies
      const { data: companiesData, error: companiesError } = await supabase
        .from('companies')
        .select('*')
        .order('created_at', { ascending: false });

      if (companiesError) {
        console.error('Error loading companies:', companiesError);
      } else {
        setCompanies(companiesData || []);
      }

      // Load inquiries
      const { data: inquiriesData, error: inquiriesError } = await supabase
        .from('inquiries')
        .select('*')
        .order('created_at', { ascending: false });

      if (inquiriesError) {
        console.error('Error loading inquiries:', inquiriesError);
      } else {
        setInquiries(inquiriesData || []);
      }

      // Load onboarding sessions
      const { data: onboardingData, error: onboardingError } = await supabase
        .from('onboarding_sessions')
        .select('*')
        .order('created_at', { ascending: false });

      if (onboardingError) {
        console.error('Error loading onboarding sessions:', onboardingError);
      } else {
        setOnboardingSessions(onboardingData || []);
      }
    } catch (error) {
      console.error('Error loading admin data:', error);
      toast({
        title: "Error",
        description: "Failed to load admin data.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      toast({
        title: "Logged out",
        description: "You've been successfully logged out.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    const statusColors: Record<string, string> = {
      'lead': 'bg-yellow-100 text-yellow-800',
      'active': 'bg-green-100 text-green-800',
      'inactive': 'bg-gray-100 text-gray-800',
      'pending': 'bg-blue-100 text-blue-800',
      'completed': 'bg-green-100 text-green-800',
      'expired': 'bg-red-100 text-red-800',
      'new': 'bg-blue-100 text-blue-800',
    };

    return (
      <Badge variant="secondary" className={statusColors[status] || 'bg-gray-100 text-gray-800'}>
        {status}
      </Badge>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!isAdmin) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <header className="border-b bg-card/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Admin Portal
            </h1>
            <p className="text-muted-foreground">
              Manage clients and business operations
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => navigate('/dashboard')}>
              <Settings className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Companies</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{companies.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">New Inquiries</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {inquiries.filter(i => i.status === 'new').length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Onboarding</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {onboardingSessions.filter(s => s.status === 'pending' || s.status === 'in_progress').length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed Sessions</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {onboardingSessions.filter(s => s.status === 'completed').length}
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="companies" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="companies">Companies</TabsTrigger>
            <TabsTrigger value="inquiries">Inquiries</TabsTrigger>
            <TabsTrigger value="onboarding">Onboarding</TabsTrigger>
          </TabsList>

          <TabsContent value="companies" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Client Companies</CardTitle>
                <CardDescription>
                  Manage your client companies and their subscription status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Company</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Plan</TableHead>
                      <TableHead>Created</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {companies.map((company) => (
                      <TableRow key={company.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <Building2 className="h-4 w-4" />
                            <div>
                              <div>{company.name}</div>
                              {company.website && (
                                <div className="text-xs text-muted-foreground flex items-center gap-1">
                                  <Globe className="h-3 w-3" />
                                  {company.website}
                                </div>
                              )}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {company.email}
                          </div>
                        </TableCell>
                        <TableCell>
                          {company.phone && (
                            <div className="flex items-center gap-1">
                              <Phone className="h-3 w-3" />
                              {company.phone}
                            </div>
                          )}
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(company.status)}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {company.subscription_tier || 'trial'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {formatDate(company.created_at)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="inquiries" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Client Inquiries</CardTitle>
                <CardDescription>
                  Review and manage incoming client inquiries
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Contact</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>Email/Phone</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Message</TableHead>
                      <TableHead>Received</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {inquiries.map((inquiry) => (
                      <TableRow key={inquiry.id}>
                        <TableCell className="font-medium">
                          {inquiry.contact_name}
                        </TableCell>
                        <TableCell>{inquiry.company_name}</TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center gap-1 text-sm">
                              <Mail className="h-3 w-3" />
                              {inquiry.email}
                            </div>
                            {inquiry.phone && (
                              <div className="flex items-center gap-1 text-sm">
                                <Phone className="h-3 w-3" />
                                {inquiry.phone}
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(inquiry.status || 'new')}
                        </TableCell>
                        <TableCell className="max-w-xs">
                          <div className="truncate text-sm text-muted-foreground">
                            {inquiry.message || 'No message'}
                          </div>
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {formatDate(inquiry.created_at)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="onboarding" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Onboarding Sessions</CardTitle>
                <CardDescription>
                  Monitor client onboarding progress and sessions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Client</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Expires</TableHead>
                      <TableHead>Completed</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {onboardingSessions.map((session) => (
                      <TableRow key={session.id}>
                        <TableCell className="font-medium">
                          {session.client_name}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {session.client_email}
                          </div>
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(session.status)}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {formatDate(session.created_at)}
                          </div>
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {formatDate(session.expires_at)}
                          </div>
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {session.completed_at ? (
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {formatDate(session.completed_at)}
                            </div>
                          ) : (
                            'Not completed'
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminPortal;