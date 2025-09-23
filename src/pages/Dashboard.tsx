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
            {/* Quick Actions Bar */}
            <div className="flex flex-wrap gap-4">
              <Button 
                onClick={() => navigate('/ai-assistants')}
                className="flex-1 md:flex-none"
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                Launch AI Assistant
              </Button>
              <Button variant="outline" className="flex-1 md:flex-none">
                <Settings className="mr-2 h-4 w-4" />
                Account Settings
              </Button>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Project Status</CardTitle>
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
                  <CardTitle className="text-sm font-medium">AI Sessions</CardTitle>
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24</div>
                  <p className="text-xs text-muted-foreground">
                    This month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Documents</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">
                    Processed
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Usage</CardTitle>
                  <Settings className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">78%</div>
                  <p className="text-xs text-muted-foreground">
                    Monthly quota
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* AI Assistant Panel */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5" />
                      Your AI Assistant
                    </CardTitle>
                    <CardDescription>
                      Custom-trained AI assistant ready for your business needs
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg border">
                        <h4 className="font-semibold mb-2 text-primary">Specialized Knowledge</h4>
                        <p className="text-sm text-muted-foreground">
                          Trained on your industry data, company documents, and business processes
                        </p>
                      </div>
                      <div className="p-4 bg-gradient-to-br from-secondary/10 to-primary/10 rounded-lg border">
                        <h4 className="font-semibold mb-2">24/7 Availability</h4>
                        <p className="text-sm text-muted-foreground">
                          Always available to help with customer inquiries and internal tasks
                        </p>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-secondary/20 rounded-lg border-l-4 border-primary">
                      <h4 className="font-semibold mb-2">Recent Activity</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between items-center">
                          <span>Customer support queries handled</span>
                          <span className="font-medium">18 today</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Document analysis completed</span>
                          <span className="font-medium">3 this week</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Average response time</span>
                          <span className="font-medium">1.2 seconds</span>
                        </div>
                      </div>
                    </div>
                    
                    <Button 
                      size="lg"
                      className="w-full"
                      onClick={() => navigate('/ai-assistants')}
                    >
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Start New Conversation
                    </Button>
                  </CardContent>
                </Card>

                {/* Recent Conversations */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Conversations</CardTitle>
                    <CardDescription>
                      Your latest AI assistant interactions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { title: "Customer onboarding process", time: "2 hours ago", type: "Support" },
                        { title: "Market analysis for Q4", time: "1 day ago", type: "Analysis" },
                        { title: "Product documentation review", time: "2 days ago", type: "Review" },
                      ].map((convo, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                          <div>
                            <h5 className="font-medium">{convo.title}</h5>
                            <p className="text-sm text-muted-foreground">{convo.time}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                              {convo.type}
                            </span>
                            <Button variant="ghost" size="sm">
                              Continue
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Side Panel */}
              <div className="space-y-6">
                {/* Account Info */}
                <Card>
                  <CardHeader>
                    <CardTitle>Account Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Company:</span>
                        <span className="font-medium">{company.name}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Plan:</span>
                        <span className="font-medium capitalize">{company.subscription_tier || 'Professional'}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Status:</span>
                        <span className="font-medium capitalize text-green-600">{company.status}</span>
                      </div>
                    </div>
                    
                    <div className="pt-2 border-t">
                      <div className="flex justify-between text-sm mb-2">
                        <span>Monthly Usage</span>
                        <span>78%</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: '78%' }}></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <Users className="mr-2 h-4 w-4" />
                      Manage Team Access
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Settings className="mr-2 h-4 w-4" />
                      AI Configuration
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <BarChart3 className="mr-2 h-4 w-4" />
                      Usage Analytics
                    </Button>
                  </CardContent>
                </Card>

                {/* Support */}
                <Card>
                  <CardHeader>
                    <CardTitle>Need Help?</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="text-sm text-muted-foreground">
                      Our support team is here to help you get the most out of your AI assistant.
                    </div>
                    <Button variant="outline" className="w-full">
                      Contact Support
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;