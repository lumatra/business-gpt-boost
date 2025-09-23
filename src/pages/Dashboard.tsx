import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, LogOut, MessageSquare, Settings, Users, BarChart3, Calendar, Heart, Share2, Hash, TrendingUp, Clock, Plus } from 'lucide-react';
import type { User } from '@supabase/supabase-js';

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const [company, setCompany] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedAssistant, setSelectedAssistant] = useState<'overview' | 'social' | 'hr' | 'marketing'>('overview');
  const [aiAssistantData, setAiAssistantData] = useState<any>(null);
  const [aiAssistantFiles, setAiAssistantFiles] = useState<any[]>([]);

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

        // Load associated files
        const { data: filesData, error: filesError } = await supabase
          .from('ai_assistant_files')
          .select('*')
          .eq('assistant_data_id', assistantData.id);

        if (filesError) {
          console.error('Error loading AI assistant files:', filesError);
        } else {
          setAiAssistantFiles(filesData || []);
        }
      }
    } catch (error) {
      console.error('Error loading AI assistant data:', error);
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
            {/* AI Assistants Navigation */}
            <div className="flex flex-wrap gap-2 p-1 bg-secondary/20 rounded-lg">
              <Button
                variant={selectedAssistant === 'overview' ? 'default' : 'ghost'}
                onClick={() => setSelectedAssistant('overview')}
                className="flex items-center gap-2"
              >
                <BarChart3 className="h-4 w-4" />
                Overview
              </Button>
              <Button
                variant={selectedAssistant === 'social' ? 'default' : 'ghost'}
                onClick={() => setSelectedAssistant('social')}
                className="flex items-center gap-2"
              >
                <Share2 className="h-4 w-4" />
                Social Media
              </Button>
              <Button
                variant={selectedAssistant === 'hr' ? 'default' : 'ghost'}
                onClick={() => setSelectedAssistant('hr')}
                className="flex items-center gap-2"
              >
                <Users className="h-4 w-4" />
                HR Assistant
              </Button>
              <Button
                variant={selectedAssistant === 'marketing' ? 'default' : 'ghost'}
                onClick={() => setSelectedAssistant('marketing')}
                className="flex items-center gap-2"
              >
                <TrendingUp className="h-4 w-4" />
                Marketing
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate('/ai-assistants')}
                className="flex items-center gap-2 ml-2 border-dashed"
              >
                <Plus className="h-4 w-4" />
                Add Assistant
              </Button>
            </div>

            {/* Dynamic Content Based on Selection */}
            {selectedAssistant === 'overview' && (
              <>
                {/* Stats Overview - Combined from 3 AI Assistants */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">AI Tasks Completed</CardTitle>
                      <BarChart3 className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">324</div>
                      <p className="text-xs text-muted-foreground">
                        Across all 3 assistants
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Time Saved</CardTitle>
                      <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">47h</div>
                      <p className="text-xs text-muted-foreground">
                        This month
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Content Created</CardTitle>
                      <Share2 className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">156</div>
                      <p className="text-xs text-muted-foreground">
                        Posts, emails & reports
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Business Growth</CardTitle>
                      <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">+28%</div>
                      <p className="text-xs text-muted-foreground">
                        Overall efficiency gain
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Combined Activity Summary */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <Card>
                      <CardHeader>
                        <CardTitle>Today's AI Activity Summary</CardTitle>
                        <CardDescription>
                          Combined activity from all 3 AI assistants
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center p-3 bg-primary/5 rounded-lg border-l-4 border-primary">
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-primary/10 rounded">
                                <Share2 className="h-4 w-4 text-primary" />
                              </div>
                              <div>
                                <h4 className="font-medium">Social Media Assistant</h4>
                                <p className="text-sm text-muted-foreground">8 posts created & scheduled</p>
                              </div>
                            </div>
                            <Button variant="outline" size="sm">View</Button>
                          </div>
                          
                          <div className="flex justify-between items-center p-3 bg-accent/5 rounded-lg border-l-4 border-accent">
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-accent/10 rounded">
                                <Users className="h-4 w-4 text-accent" />
                              </div>
                              <div>
                                <h4 className="font-medium">HR Assistant</h4>
                                <p className="text-sm text-muted-foreground">6 shifts scheduled, 18 client responses</p>
                              </div>
                            </div>
                            <Button variant="outline" size="sm">View</Button>
                          </div>
                          
                          <div className="flex justify-between items-center p-3 bg-secondary/5 rounded-lg border-l-4 border-secondary">
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-secondary/10 rounded">
                                <TrendingUp className="h-4 w-4 text-secondary-foreground" />
                              </div>
                              <div>
                                <h4 className="font-medium">Marketing Assistant</h4>
                                <p className="text-sm text-muted-foreground">3 campaigns launched, +35% bookings</p>
                              </div>
                            </div>
                            <Button variant="outline" size="sm">View</Button>
                          </div>
                        </div>
                        
                        <Button 
                          size="lg"
                          className="w-full mt-6"
                          onClick={() => navigate('/ai-assistants')}
                        >
                          <MessageSquare className="mr-2 h-4 w-4" />
                          Launch AI Assistant Hub
                        </Button>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Side Panel */}
                  <div className="space-y-6">
                    {/* Account Info */}
                    <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate('/company-profile')}>
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          Company Profile
                          <Button variant="outline" size="sm">
                            View Full Profile
                          </Button>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Company:</span>
                            <span className="font-medium">{company.name}</span>
                          </div>
                          
                          {company.email && (
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Email:</span>
                              <span className="font-medium">{company.email}</span>
                            </div>
                          )}
                          
                          {company.phone && (
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Phone:</span>
                              <span className="font-medium">{company.phone}</span>
                            </div>
                          )}
                          
                          {aiAssistantData?.website_url && (
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Website:</span>
                              <a 
                                href={aiAssistantData.website_url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="font-medium text-primary hover:underline"
                              >
                                Visit Site
                              </a>
                            </div>
                          )}
                          
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Plan:</span>
                            <span className="font-medium capitalize">{company.subscription_tier || 'Professional'}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Status:</span>
                            <span className="font-medium capitalize text-green-600">{company.status}</span>
                          </div>
                        </div>
                        
                        {aiAssistantData?.business_info && (
                          <div className="pt-3 border-t">
                            <h4 className="font-medium text-sm mb-2">Business Details</h4>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                              {aiAssistantData.business_info}
                            </p>
                          </div>
                        )}
                        
                        <div className="pt-3 border-t">
                          <div className="flex justify-between text-sm mb-2">
                            <span>Monthly Usage</span>
                            <span>78%</span>
                          </div>
                          <div className="w-full bg-secondary rounded-full h-2">
                            <div className="bg-primary h-2 rounded-full" style={{ width: '78%' }}></div>
                          </div>
                        </div>

                        {aiAssistantFiles.length > 0 && (
                          <div className="pt-3 border-t">
                            <h4 className="font-medium text-sm mb-2">Training Files</h4>
                            <div className="space-y-1">
                              {aiAssistantFiles.slice(0, 3).map((file, index) => (
                                <div key={file.id || index} className="flex items-center gap-2 text-xs">
                                  {file.is_image ? (
                                    <div className="w-4 h-4 bg-green-100 rounded flex items-center justify-center">
                                      <span className="text-[10px] text-green-600">IMG</span>
                                    </div>
                                  ) : (
                                    <div className="w-4 h-4 bg-blue-100 rounded flex items-center justify-center">
                                      <span className="text-[10px] text-blue-600">DOC</span>
                                    </div>
                                  )}
                                  <span className="text-muted-foreground truncate">{file.file_name}</span>
                                </div>
                              ))}
                              {aiAssistantFiles.length > 3 && (
                                <div className="text-xs text-muted-foreground">
                                  +{aiAssistantFiles.length - 3} more files
                                </div>
                              )}
                            </div>
                          </div>
                        )}
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

                    {/* AI Assistant Data Section */}
                    {aiAssistantData && (
                      <Card>
                        <CardHeader>
                          <CardTitle>AI Assistant Training Data</CardTitle>
                          <CardDescription>
                            Uploaded company information and files
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-3">
                            <div>
                              <h4 className="font-medium text-sm">Assistant Type</h4>
                              <p className="text-sm text-muted-foreground">{aiAssistantData.assistant_type}</p>
                            </div>
                            
                            {aiAssistantData.website_url && (
                              <div>
                                <h4 className="font-medium text-sm">Website</h4>
                                <a 
                                  href={aiAssistantData.website_url} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-sm text-primary hover:underline"
                                >
                                  {aiAssistantData.website_url}
                                </a>
                              </div>
                            )}

                            {aiAssistantData.business_info && (
                              <div>
                                <h4 className="font-medium text-sm">Business Information</h4>
                                <p className="text-sm text-muted-foreground line-clamp-3">
                                  {aiAssistantData.business_info}
                                </p>
                              </div>
                            )}

                            {aiAssistantFiles.length > 0 && (
                              <div>
                                <h4 className="font-medium text-sm mb-2">Uploaded Files ({aiAssistantFiles.length})</h4>
                                <div className="space-y-2">
                                  {aiAssistantFiles.map((file, index) => (
                                    <div key={file.id || index} className="flex items-center justify-between p-2 bg-secondary/50 rounded text-sm">
                                      <div className="flex items-center gap-2">
                                        {file.is_image ? (
                                          <div className="w-6 h-6 bg-green-100 rounded flex items-center justify-center">
                                            <span className="text-xs text-green-600">IMG</span>
                                          </div>
                                        ) : (
                                          <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center">
                                            <span className="text-xs text-blue-600">DOC</span>
                                          </div>
                                        )}
                                        <span className="font-medium">{file.file_name}</span>
                                      </div>
                                      <span className="text-muted-foreground">
                                        {(file.file_size / 1024).toFixed(1)}KB
                                      </span>
                                    </div>
                                  ))}
                                </div>
                                <div className="pt-2 border-t text-xs text-muted-foreground">
                                  Total size: {((aiAssistantData.total_file_size || 0) / 1024 / 1024).toFixed(2)}MB
                                </div>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </div>
              </>
            )}

            {selectedAssistant === 'social' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Share2 className="h-5 w-5" />
                        Social Media AI Assistant
                      </CardTitle>
                      <CardDescription>
                        AI-powered social media management for MJ Hairdressers
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg border">
                          <h4 className="font-semibold mb-2 text-primary flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            47 Posts Scheduled
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            Content posted at optimal times across all platforms
                          </p>
                        </div>
                        <div className="p-4 bg-gradient-to-br from-secondary/10 to-primary/10 rounded-lg border">
                          <h4 className="font-semibold mb-2 flex items-center gap-2">
                            <Heart className="h-4 w-4" />
                            8.4% Engagement
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            AI learns your salon's unique brand voice
                          </p>
                        </div>
                      </div>
                      
                      <Button 
                        size="lg"
                        className="w-full"
                        onClick={() => navigate('/ai-assistants')}
                      >
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Create Social Media Content
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Social Media Content</CardTitle>
                      <CardDescription>
                        Your latest AI-generated posts and content ideas
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          { title: "Weekend styling tips for summer hair", time: "2 hours ago", type: "Instagram", platform: "📸" },
                          { title: "Client transformation spotlight", time: "5 hours ago", type: "Facebook", platform: "👤" },
                          { title: "Hair care routine thread", time: "1 day ago", type: "Twitter", platform: "🐦" },
                          { title: "Behind-the-scenes salon tour", time: "2 days ago", type: "TikTok", platform: "🎵" },
                        ].map((content, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                            <div>
                              <h5 className="font-medium flex items-center gap-2">
                                <span>{content.platform}</span>
                                {content.title}
                              </h5>
                              <p className="text-sm text-muted-foreground">{content.time}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                                {content.type}
                              </span>
                              <Button variant="ghost" size="sm">
                                View
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Social Media Stats</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Posts This Month:</span>
                          <span className="font-medium">47</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Engagement Rate:</span>
                          <span className="font-medium">8.4%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Followers Gained:</span>
                          <span className="font-medium">+235</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {selectedAssistant === 'hr' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5" />
                        HR AI Assistant
                      </CardTitle>
                      <CardDescription>
                        Streamline staff management and client communication
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-gradient-to-br from-accent/10 to-primary/10 rounded-lg border">
                          <h4 className="font-semibold mb-2 text-accent flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            24 Shifts Scheduled
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            Automated staff scheduling and shift management
                          </p>
                        </div>
                        <div className="p-4 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg border">
                          <h4 className="font-semibold mb-2 flex items-center gap-2">
                            <MessageSquare className="h-4 w-4" />
                            18 Client Responses
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            Automated booking confirmations and follow-ups
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>HR Stats</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Staff Members:</span>
                          <span className="font-medium">8</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Shifts This Week:</span>
                          <span className="font-medium">24</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Client Responses:</span>
                          <span className="font-medium">18</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {selectedAssistant === 'marketing' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5" />
                        Marketing AI Assistant
                      </CardTitle>
                      <CardDescription>
                        Drive growth with AI-powered marketing campaigns
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-gradient-to-br from-secondary/10 to-accent/10 rounded-lg border">
                          <h4 className="font-semibold mb-2 text-secondary-foreground flex items-center gap-2">
                            <BarChart3 className="h-4 w-4" />
                            12 Campaigns Active
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            Email campaigns and promotional offers
                          </p>
                        </div>
                        <div className="p-4 bg-gradient-to-br from-accent/10 to-secondary/10 rounded-lg border">
                          <h4 className="font-semibold mb-2 flex items-center gap-2">
                            <Hash className="h-4 w-4" />
                            +35% New Bookings
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            AI-optimized customer acquisition strategies
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Marketing Stats</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Active Campaigns:</span>
                          <span className="font-medium">12</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">New Bookings:</span>
                          <span className="font-medium">+35%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Email Open Rate:</span>
                          <span className="font-medium">68%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
