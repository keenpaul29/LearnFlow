import { NextResponse } from 'next/server';
import { getGeminiResponse } from '@/lib/gemini';

export async function POST(req: Request) {
  try {
    console.log('Received study assistant request');
    const { message, context } = await req.json();
    
    const systemContext = "You are a helpful AI study assistant. You help students understand concepts, create study plans, and provide learning strategies.";
    const contextHistory = context
      .map((msg: any) => `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`)
      .join('\n');
    
    const fullContext = `${systemContext}\n\nConversation history:\n${contextHistory}`;
    
    console.log('Requesting Gemini response for study assistant');
    const response = await getGeminiResponse(message, fullContext);
    console.log('Received Gemini response for study assistant');

    return NextResponse.json({
      response: response,
    });
  } catch (error: any) {
    console.error('Study Assistant Error:', {
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
