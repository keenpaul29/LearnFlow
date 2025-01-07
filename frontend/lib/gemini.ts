import { GoogleGenerativeAI } from '@google/generative-ai';

if (!process.env.GEMINI_API_KEY) {
  throw new Error('GEMINI_API_KEY is not defined in environment variables');
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const getGeminiResponse = async (
  prompt: string,
  context: string = ''
): Promise<string> => {
  try {
    console.log('Initializing Gemini model...');
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    const fullPrompt = context ? `${context}\n\n${prompt}` : prompt;
    console.log('Sending request to Gemini API...');
    
    const result = await model.generateContent(fullPrompt);
    console.log('Received response from Gemini API');
    
    const response = await result.response;
    return response.text();
  } catch (error: any) {
    console.error('Detailed Gemini API Error:', {
      message: error.message,
      stack: error.stack,
      details: error
    });
    throw new Error(`Failed to get Gemini response: ${error.message}`);
  }
};
