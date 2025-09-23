import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, LogOut, MessageSquare, Settings, Users, BarChart3 } from 'lucide-react';
import type { User } from '@supabase/supabase-js';

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const [company, setCompany] = useState<any>(null);
  const [loading, setLoading] = useState(true);

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

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT' || !session) {
        navigate('/auth');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const loadUserData = async (userId: string) => {
    try {
      // Load user profile
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
          setCompany(profileData.companies);
        }
      }
    } catch (error) {
      console.error('Error loading user data:', error);
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
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              AI Dashboard
            </h1>
            {profile && (
              <p className="text-muted-foreground">
                Welcome back, {profile.first_name}!
              </p>
            )}
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {!company ? (
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Welcome to Business AI Solutions!</CardTitle>
                <CardDescription>
                  Your account has been created successfully. We're currently setting up your custom AI solution.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-6 bg-secondary/50 rounded-lg">
                  <h3 className="font-semibold mb-2">What happens next?</h3>
                  <ul className="text-sm text-muted-foreground space-y-2 text-left">
                    <li>• Our team will contact you within 24 hours</li>
                    <li>• We'll discuss your specific business needs</li>
                    <li>• We'll configure your custom AI solution</li>
                    <li>• You'll receive access to your personalized AI assistant</li>
                  </ul>
                </div>
                <p className="text-sm text-muted-foreground">
                  Questions? Contact our support team at support@businessai.com
                </p>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Company Status</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold capitalize">{company.status}</div>
                  <p className="text-xs text-muted-foreground">
                    {company.subscription_tier} plan
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">AI Assistant</CardTitle>
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {company.gpt_configuration ? 'Active' : 'Pending'}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Custom configuration
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Team Members</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1</div>
                  <p className="text-xs text-muted-foreground">
                    Active users
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Settings</CardTitle>
                  <Settings className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <Button variant="outline" size="sm" className="w-full">
                    Manage
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Your Custom AI Assistant</CardTitle>
                <CardDescription>
                   {company.gpt_configuration 
                     ? "Your AI assistant is ready to use!" 
                     : "Your AI assistant is being configured by our team."
                   }
                </CardDescription>
              </CardHeader>
              <CardContent>
                {company.gpt_configuration ? (
                  <div className="space-y-4">
                    <div className="p-4 bg-secondary/50 rounded-lg">
                      <h4 className="font-semibold mb-2">AI Assistant Features:</h4>
                      <ul className="text-sm space-y-1">
                        <li>• Trained on your business data</li>
                        <li>• Customized for your industry</li>
                        <li>• Secure and private conversations</li>
                        <li>• Integration with your workflows</li>
                      </ul>
                    </div>
                    <Button className="w-full md:w-auto">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Launch AI Assistant
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      Our team is configuring your custom AI solution...
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;