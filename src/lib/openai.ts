import OpenAI from 'openai';

const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

if (!apiKey) {
  throw new Error('OpenAI API key is not configured. Please check your .env file.');
}

const openai = new OpenAI({
  apiKey,
  dangerouslyAllowBrowser: true // Note: In production, API calls should be made through a backend
});

export const createChatCompletion = async (
  messages: Array<{ role: 'system' | 'user' | 'assistant', content: string }>,
  model: string = 'gpt-3.5-turbo'
) => {
  try {
    const completion = await openai.chat.completions.create({
      messages,
      model,
      temperature: 0.7,
      max_tokens: 1000,
    });

    return completion.choices[0].message;
  } catch (error: any) {
    console.error('OpenAI API Error:', error);
    throw new Error(error.message);
  }
};

export const validateApiKey = async () => {
  try {
    const response = await openai.models.list();
    return response.data.length > 0;
  } catch (error) {
    return false;
  }
};