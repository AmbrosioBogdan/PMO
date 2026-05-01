interface AIProvider {
  name: string;
  apiKey: string;
  endpoint?: string;
}

export async function getAIProvider(provider?: string): Promise<AIProvider> {
  const selectedProvider = provider || 'openrouter';

  switch (selectedProvider) {
    case 'openrouter':
      return {
        name: 'openrouter',
        apiKey: process.env.OPENROUTER_API_KEY || '',
        endpoint: 'https://openrouter.io/api/v1/chat/completions',
      };
    case 'groq':
      return {
        name: 'groq',
        apiKey: process.env.GROQ_API_KEY || '',
        endpoint: 'https://api.groq.com/openai/v1/chat/completions',
      };
    case 'huggingface':
      return {
        name: 'huggingface',
        apiKey: process.env.HUGGINGFACE_API_KEY || '',
      };
    default:
      throw new Error(`Unknown AI provider: ${selectedProvider}`);
  }
}

export async function callAI(
  prompt: string,
  provider?: string,
  model?: string
): Promise<string> {
  const aiProvider = await getAIProvider(provider);

  try {
    const response = await fetch(aiProvider.endpoint || 'https://api.openrouter.io/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${aiProvider.apiKey}`,
      },
      body: JSON.stringify({
        model: model || 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant for WhatsApp messaging. Provide concise, friendly responses.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        max_tokens: 150,
      }),
    });

    if (!response.ok) {
      throw new Error(`AI provider error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || 'Unable to generate response';
  } catch (error) {
    console.error('AI call failed:', error);
    throw error;
  }
}
