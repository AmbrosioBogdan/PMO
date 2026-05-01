import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase';

// Enable CORS for all origins
function addCorsHeaders(response: NextResponse) {
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
  return response;
}

export async function OPTIONS(request: NextRequest) {
  return addCorsHeaders(new NextResponse(null, { status: 200 }));
}

export async function GET(request: NextRequest) {
  try {
    // First try to fetch messages from the messages table
    const { data, error } = await supabaseServer
      .from('messages')
      .select('*')
      .limit(10)
      .order('created_at', { ascending: false });

    // If there's an error (table doesn't exist), return empty array
    if (error) {
      console.error('Error fetching messages:', error);
      return addCorsHeaders(NextResponse.json({
        success: true,
        count: 0,
        messages: [],
        warning: 'Database tables not initialized. Run supabase db push',
      }));
    }

    return addCorsHeaders(NextResponse.json({
      success: true,
      count: data?.length || 0,
      messages: data || [],
    }));
  } catch (error) {
    return addCorsHeaders(NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    ));
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { chat_id, content, direction } = body;

    const { data, error } = await supabaseServer
      .from('messages')
      .insert([
        {
          chat_id,
          content,
          direction: direction || 'outgoing',
          timestamp: new Date().toISOString(),
        },
      ])
      .select();

    if (error) throw error;

    return addCorsHeaders(NextResponse.json(
      {
        success: true,
        message: data?.[0],
      },
      { status: 201 }
    ));
  } catch (error) {
    return addCorsHeaders(NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 400 }
    ));
  }
}
