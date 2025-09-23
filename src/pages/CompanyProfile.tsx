import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, ArrowLeft, Edit, Save, X, Plus, Upload, MapPin, Phone, Mail, Globe, Building, Users, Info, Camera } from 'lucide-react';
import type { User } from '@supabase/supabase-js';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  photo?: string;
}

interface AdditionalInfo {
  id: string;
  title: string;
  description: string;
}

interface AdditionalPhoto {
  id: string;
  url: string;
  description: string;
}

const CompanyProfile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const [company, setCompany] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  // Form data
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    phone: '',
    email: '',
    website: '',
    about: '',
    logo: ''
  });

  // Dynamic sections
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [additionalInfo, setAdditionalInfo] = useState<AdditionalInfo[]>([]);
  const [additionalPhotos, setAdditionalPhotos] = useState<AdditionalPhoto[]>([]);

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
        setProfile(profileData);
        if (profileData.companies) {
          setCompany(profileData.companies);
          
          // Load additional data from company metadata
          const metadata = (profileData.companies.gpt_configuration as any) || {};
          
          // Set form data from company and metadata
          setFormData({
            name: profileData.companies.name || '',
            location: metadata.location || '',
            phone: profileData.companies.phone || '',
            email: profileData.companies.email || '',
            website: profileData.companies.website || '',
            about: metadata.about || '',
            logo: metadata.logo || ''
          });

          setTeamMembers(metadata.team_members || []);
          setAdditionalInfo(metadata.additional_info || []);
          setAdditionalPhotos(metadata.additional_photos || []);
        }
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!company?.id) return;

    // Validate required fields
    if (!formData.email || !formData.phone) {
      toast({
        title: "Validation Error",
        description: "Email and phone are required fields.",
        variant: "destructive",
      });
      return;
    }

    setSaving(true);
    try {
      // Prepare metadata with dynamic sections
      const metadata = {
        team_members: teamMembers,
        additional_info: additionalInfo,
        additional_photos: additionalPhotos
      };

      const { error } = await supabase
        .from('companies')
        .update({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          website: formData.website,
          gpt_configuration: {
            ...company.gpt_configuration,
            ...metadata,
            about: formData.about,
            location: formData.location,
            logo: formData.logo
          }
        })
        .eq('id', company.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Company profile updated successfully.",
      });

      setIsEditing(false);
      await loadUserData(user!.id); // Reload data
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

  const addTeamMember = () => {
    const newMember: TeamMember = {
      id: Date.now().toString(),
      name: '',
      role: '',
      bio: '',
      photo: ''
    };
    setTeamMembers([...teamMembers, newMember]);
  };

  const updateTeamMember = (id: string, field: keyof TeamMember, value: string) => {
    setTeamMembers(teamMembers.map(member => 
      member.id === id ? { ...member, [field]: value } : member
    ));
  };

  const removeTeamMember = (id: string) => {
    setTeamMembers(teamMembers.filter(member => member.id !== id));
  };

  const addAdditionalInfo = () => {
    const newInfo: AdditionalInfo = {
      id: Date.now().toString(),
      title: '',
      description: ''
    };
    setAdditionalInfo([...additionalInfo, newInfo]);
  };

  const updateAdditionalInfo = (id: string, field: keyof AdditionalInfo, value: string) => {
    setAdditionalInfo(additionalInfo.map(info => 
      info.id === id ? { ...info, [field]: value } : info
    ));
  };

  const removeAdditionalInfo = (id: string) => {
    setAdditionalInfo(additionalInfo.filter(info => info.id !== id));
  };

  const addAdditionalPhoto = () => {
    const newPhoto: AdditionalPhoto = {
      id: Date.now().toString(),
      url: '',
      description: ''
    };
    setAdditionalPhotos([...additionalPhotos, newPhoto]);
  };

  const updateAdditionalPhoto = (id: string, field: keyof AdditionalPhoto, value: string) => {
    setAdditionalPhotos(additionalPhotos.map(photo => 
      photo.id === id ? { ...photo, [field]: value } : photo
    ));
  };

  const removeAdditionalPhoto = (id: string) => {
    setAdditionalPhotos(additionalPhotos.filter(photo => photo.id !== id));
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
                Company Profile
              </h1>
              <p className="text-muted-foreground">Manage your business information</p>
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
                Edit Profile
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5" />
              Basic Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Company Name *</Label>
                {isEditing ? (
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your Company Name"
                  />
                ) : (
                  <p className="text-sm py-2 px-3 bg-secondary/20 rounded">{formData.name || 'Not set'}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="location" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Location
                </Label>
                {isEditing ? (
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="City, State/Country"
                  />
                ) : (
                  <p className="text-sm py-2 px-3 bg-secondary/20 rounded">{formData.location || 'Not set'}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Phone *
                </Label>
                {isEditing ? (
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 (555) 123-4567"
                    required
                  />
                ) : (
                  <p className="text-sm py-2 px-3 bg-secondary/20 rounded">{formData.phone || 'Not set'}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email *
                </Label>
                {isEditing ? (
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="contact@yourcompany.com"
                    required
                  />
                ) : (
                  <p className="text-sm py-2 px-3 bg-secondary/20 rounded">{formData.email || 'Not set'}</p>
                )}
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="website" className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  Website
                </Label>
                {isEditing ? (
                  <Input
                    id="website"
                    type="url"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    placeholder="https://yourcompany.com"
                  />
                ) : (
                  <p className="text-sm py-2 px-3 bg-secondary/20 rounded">
                    {formData.website ? (
                      <a href={formData.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                        {formData.website}
                      </a>
                    ) : 'Not set'}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="logo">Company Logo URL</Label>
              {isEditing ? (
                <Input
                  id="logo"
                  type="url"
                  value={formData.logo}
                  onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                  placeholder="https://yoursite.com/logo.png"
                />
              ) : (
                <div className="flex items-center gap-4">
                  {formData.logo && (
                    <img src={formData.logo} alt="Company Logo" className="h-12 w-12 object-cover rounded border" />
                  )}
                  <p className="text-sm py-2 px-3 bg-secondary/20 rounded flex-1">{formData.logo || 'Not set'}</p>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="about">About Your Business</Label>
              {isEditing ? (
                <Textarea
                  id="about"
                  value={formData.about}
                  onChange={(e) => setFormData({ ...formData, about: e.target.value })}
                  placeholder="Describe your business, services, mission, etc."
                  rows={4}
                />
              ) : (
                <p className="text-sm py-2 px-3 bg-secondary/20 rounded whitespace-pre-wrap">{formData.about || 'Not set'}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Meet the Team */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Meet the Team
              </span>
              {isEditing && (
                <Button onClick={addTeamMember} size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Team Member
                </Button>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {teamMembers.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No team members added yet.</p>
            ) : (
              <div className="space-y-6">
                {teamMembers.map((member) => (
                  <div key={member.id} className="p-4 border rounded-lg space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Team Member</h4>
                      {isEditing && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => removeTeamMember(member.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Name</Label>
                        {isEditing ? (
                          <Input
                            value={member.name}
                            onChange={(e) => updateTeamMember(member.id, 'name', e.target.value)}
                            placeholder="Full Name"
                          />
                        ) : (
                          <p className="text-sm py-2 px-3 bg-secondary/20 rounded">{member.name || 'Not set'}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label>Role/Position</Label>
                        {isEditing ? (
                          <Input
                            value={member.role}
                            onChange={(e) => updateTeamMember(member.id, 'role', e.target.value)}
                            placeholder="Job Title"
                          />
                        ) : (
                          <p className="text-sm py-2 px-3 bg-secondary/20 rounded">{member.role || 'Not set'}</p>
                        )}
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label>Bio</Label>
                        {isEditing ? (
                          <Textarea
                            value={member.bio}
                            onChange={(e) => updateTeamMember(member.id, 'bio', e.target.value)}
                            placeholder="Brief biography or description"
                            rows={3}
                          />
                        ) : (
                          <p className="text-sm py-2 px-3 bg-secondary/20 rounded whitespace-pre-wrap">{member.bio || 'Not set'}</p>
                        )}
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label>Photo URL</Label>
                        {isEditing ? (
                          <Input
                            value={member.photo || ''}
                            onChange={(e) => updateTeamMember(member.id, 'photo', e.target.value)}
                            placeholder="https://yoursite.com/photo.jpg"
                          />
                        ) : (
                          <div className="flex items-center gap-4">
                            {member.photo && (
                              <img src={member.photo} alt={member.name} className="h-12 w-12 object-cover rounded border" />
                            )}
                            <p className="text-sm py-2 px-3 bg-secondary/20 rounded flex-1">{member.photo || 'Not set'}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Additional Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Info className="h-5 w-5" />
                Additional Information
              </span>
              {isEditing && (
                <Button onClick={addAdditionalInfo} size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Info Section
                </Button>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {additionalInfo.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No additional information added yet.</p>
            ) : (
              <div className="space-y-6">
                {additionalInfo.map((info) => (
                  <div key={info.id} className="p-4 border rounded-lg space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Information Section</h4>
                      {isEditing && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => removeAdditionalInfo(info.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Title</Label>
                        {isEditing ? (
                          <Input
                            value={info.title}
                            onChange={(e) => updateAdditionalInfo(info.id, 'title', e.target.value)}
                            placeholder="Section Title"
                          />
                        ) : (
                          <h5 className="font-medium">{info.title || 'Untitled'}</h5>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label>Description</Label>
                        {isEditing ? (
                          <Textarea
                            value={info.description}
                            onChange={(e) => updateAdditionalInfo(info.id, 'description', e.target.value)}
                            placeholder="Detailed description"
                            rows={3}
                          />
                        ) : (
                          <p className="text-sm text-muted-foreground whitespace-pre-wrap">{info.description || 'No description'}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Additional Photos */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Camera className="h-5 w-5" />
                Additional Photos
              </span>
              {isEditing && (
                <Button onClick={addAdditionalPhoto} size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Photo
                </Button>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {additionalPhotos.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No additional photos added yet.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {additionalPhotos.map((photo) => (
                  <div key={photo.id} className="p-4 border rounded-lg space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-sm">Photo</h4>
                      {isEditing && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => removeAdditionalPhoto(photo.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    
                    {photo.url && (
                      <img src={photo.url} alt={photo.description} className="w-full h-32 object-cover rounded border" />
                    )}
                    
                    <div className="space-y-2">
                      <Label>Photo URL</Label>
                      {isEditing ? (
                        <Input
                          value={photo.url}
                          onChange={(e) => updateAdditionalPhoto(photo.id, 'url', e.target.value)}
                          placeholder="https://yoursite.com/photo.jpg"
                        />
                      ) : (
                        <p className="text-xs text-muted-foreground break-all">{photo.url || 'Not set'}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Description</Label>
                      {isEditing ? (
                        <Textarea
                          value={photo.description}
                          onChange={(e) => updateAdditionalPhoto(photo.id, 'description', e.target.value)}
                          placeholder="Describe this photo"
                          rows={2}
                        />
                      ) : (
                        <p className="text-sm text-muted-foreground">{photo.description || 'No description'}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default CompanyProfile;