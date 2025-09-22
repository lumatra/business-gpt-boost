import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, Send } from 'lucide-react';

const ContactForm = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    company_name: '',
    contact_name: '',
    email: '',
    phone: '',
    message: '',
    use_case: '',
    company_size: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.from('inquiries').insert([
        {
          company_name: formData.company_name,
          contact_name: formData.contact_name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          use_case: formData.use_case,
          company_size: formData.company_size,
        }
      ]);

      if (error) throw error;

      toast({
        title: "Inquiry Submitted!",
        description: "We'll get back to you within 24 hours to discuss your custom GPT solution.",
      });

      setFormData({
        company_name: '',
        contact_name: '',
        email: '',
        phone: '',
        message: '',
        use_case: '',
        company_size: ''
      });
    } catch (error) {
      console.error('Error submitting inquiry:', error);
      toast({
        title: "Error",
        description: "Failed to submit inquiry. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Get Your Custom GPT Solution
        </CardTitle>
        <CardDescription>
          Tell us about your business needs and we'll create a tailored GPT solution for your team.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="company_name" className="text-sm font-medium">
                Company Name *
              </label>
              <Input
                id="company_name"
                required
                value={formData.company_name}
                onChange={(e) => handleChange('company_name', e.target.value)}
                placeholder="Enter your company name"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="contact_name" className="text-sm font-medium">
                Your Name *
              </label>
              <Input
                id="contact_name"
                required
                value={formData.contact_name}
                onChange={(e) => handleChange('contact_name', e.target.value)}
                placeholder="Enter your full name"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email *
              </label>
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="Enter your business email"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium">
                Phone
              </label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                placeholder="Enter your phone number"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="company_size" className="text-sm font-medium">
              Company Size
            </label>
            <Select value={formData.company_size} onValueChange={(value) => handleChange('company_size', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select company size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1-10">1-10 employees</SelectItem>
                <SelectItem value="11-50">11-50 employees</SelectItem>
                <SelectItem value="51-200">51-200 employees</SelectItem>
                <SelectItem value="201-1000">201-1000 employees</SelectItem>
                <SelectItem value="1000+">1000+ employees</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label htmlFor="use_case" className="text-sm font-medium">
              Primary Use Case
            </label>
            <Select value={formData.use_case} onValueChange={(value) => handleChange('use_case', value)}>
              <SelectTrigger>
                <SelectValue placeholder="What will you use GPT for?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sales">Sales & Lead Generation</SelectItem>
                <SelectItem value="support">Customer Support</SelectItem>
                <SelectItem value="marketing">Marketing & Content</SelectItem>
                <SelectItem value="operations">Operations & Process</SelectItem>
                <SelectItem value="hr">Human Resources</SelectItem>
                <SelectItem value="compliance">Compliance & Legal</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium">
              Tell us about your needs
            </label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => handleChange('message', e.target.value)}
              placeholder="Describe your specific requirements, challenges, or goals..."
              rows={4}
            />
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Get Custom Quote
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ContactForm;