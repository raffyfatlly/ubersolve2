import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qnjcatbjkpjwjukjjhne.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFuamNhdGJqa3Bqd2p1a2pqaG5lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIxOTc1MjYsImV4cCI6MjA0Nzc3MzUyNn0.W0wLsR2OL-JMc9GXjrhjHnYEUnqaMsXYK6G6YHwn5vY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce'
  },
  global: {
    headers: {
      'X-Client-Info': 'supabase-js-web'
    }
  }
});

// Auth functions
export const signInWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
      redirectTo: `${window.location.origin}/studio`
    }
  });
  return { data, error };
};

export const signInWithEmail = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
};

export const signUpWithEmail = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${window.location.origin}/studio`,
      data: {
        first_login: true
      }
    }
  });
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
};

// User settings and chat persistence
interface UserSettings {
  system_prompt: string;
  selected_model: string;
}

interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export const saveUserSettings = async (settings: UserSettings) => {
  const user = await getCurrentUser();
  if (!user) throw new Error('No user logged in');

  // First check if settings exist
  const { data: existingSettings } = await supabase
    .from('user_settings')
    .select('id')
    .eq('user_id', user.id)
    .single();

  if (existingSettings) {
    // Update existing settings
    const { error } = await supabase
      .from('user_settings')
      .update({
        system_prompt: settings.system_prompt,
        selected_model: settings.selected_model,
        updated_at: new Date().toISOString()
      })
      .eq('user_id', user.id);

    if (error) throw error;
  } else {
    // Insert new settings
    const { error } = await supabase
      .from('user_settings')
      .insert({
        user_id: user.id,
        system_prompt: settings.system_prompt,
        selected_model: settings.selected_model,
        updated_at: new Date().toISOString()
      });

    if (error) throw error;
  }
};

export const getUserSettings = async (): Promise<UserSettings | null> => {
  const user = await getCurrentUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from('user_settings')
    .select('system_prompt, selected_model')
    .eq('user_id', user.id)
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error('Error fetching user settings:', error);
    throw error;
  }

  return data || {
    system_prompt: `You are an AI assistant for [Your Business Name].

Core Business Information:
- Business Type: [e.g., Restaurant, Real Estate, E-commerce]
- Main Products/Services: [List your key offerings]
- Target Audience: [Describe your typical customers]

Bot's Personality:
- Tone: [e.g., Professional, Friendly, Casual]
- Language Style: [e.g., Simple, Technical, Conversational]
- Languages to Support: [List languages your customers use]

Key Responsibilities:
1. Customer Service
   - Handle inquiries about products/services
   - Process basic orders/bookings
   - Provide pricing information
   - Answer FAQs

2. Business Rules
   - Operating hours: [Your business hours]
   - Service areas: [Geographic coverage]
   - Payment methods: [Accepted payment options]
   - Delivery/Service policies: [Your policies]

3. Special Instructions
   - Promotions: [Current offers]
   - Seasonal variations: [Special timing/offerings]
   - Priority items: [Key products to promote]

4. Response Guidelines:
   - Keep responses concise but informative
   - Always be polite and professional
   - Escalate to human support when needed
   - Confirm understanding before providing solutions

5. Do Not:
   - Share confidential business information
   - Make promises outside business policies
   - Handle complex complaints
   - Process sensitive payment information

Remember to:
- Ask clarifying questions when needed
- Provide relevant suggestions
- Share accurate pricing
- Guide customers through processes step-by-step
- Maintain conversation context

Note: Replace all [bracketed text] with your specific business information. Add or modify sections based on your unique business needs.`,
    selected_model: 'gpt-4'
  };
};

export const saveChatHistory = async (messages: ChatMessage[]) => {
  const user = await getCurrentUser();
  if (!user) throw new Error('No user logged in');

  // First check if chat history exists
  const { data: existingHistory } = await supabase
    .from('chat_history')
    .select('id')
    .eq('user_id', user.id)
    .single();

  if (existingHistory) {
    // Update existing chat history
    const { error } = await supabase
      .from('chat_history')
      .update({
        messages,
        updated_at: new Date().toISOString()
      })
      .eq('user_id', user.id);

    if (error) throw error;
  } else {
    // Insert new chat history
    const { error } = await supabase
      .from('chat_history')
      .insert({
        user_id: user.id,
        messages,
        updated_at: new Date().toISOString()
      });

    if (error) throw error;
  }
};

export const getChatHistory = async (): Promise<ChatMessage[]> => {
  const user = await getCurrentUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from('chat_history')
    .select('messages')
    .eq('user_id', user.id)
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error('Error fetching chat history:', error);
    throw error;
  }

  return data?.messages || [];
};