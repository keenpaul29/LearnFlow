import { NextResponse } from 'next/server';
import { getGeminiResponse } from '@/lib/gemini';

const PROMPTS = {
  notes: "Create detailed study notes from the following content:",
  summary: "Create a concise summary of the following content:",
  quiz: "Generate practice questions with answers from the following content:",
  flashcards: "Create study flashcards (question on one side, answer on the other) from the following content:",
};

export async function POST(req: Request) {
  try {
    console.log('Received content generation request');
    const { content, type } = await req.json();
    const prompt = PROMPTS[type as keyof typeof PROMPTS];
    
    if (!prompt) {
      throw new Error(`Invalid content type: ${type}`);
    }
    
    const systemContext = "You are an AI specialized in creating educational content. Format your responses in a clear, structured manner using markdown.";
    const fullPrompt = `${systemContext}\n\n${prompt}\n\n${content}`;
    
    console.log('Requesting Gemini response for content generation');
    const response = await getGeminiResponse(fullPrompt);
    console.log('Received Gemini response for content generation');

    return NextResponse.json({
      content: response,
    });
  } catch (error: any) {
    console.error('Content Generator Error:', {
      message: error.message,
      stack: error.stack,
      details: error
    });
    return NextResponse.json(
      { error: `Failed to process request: ${error.message}` },
      { status: 500 }
    );
  }
}
