import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const { data, error } = await supabaseServer
      .from('messages')
      .select('*')
      .limit(10)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return NextResponse.json({
      success: true,
      count: data?.length || 0,
      messages: data || [],
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
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

    return NextResponse.json(
      {
        success: true,
        message: data?.[0],
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 400 }
    );
  }
}
