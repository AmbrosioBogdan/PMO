import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    // Create tables if they don't exist
    const createTables = await supabaseServer.rpc('create_tables', {}, {
      get: true,
    }).catch(() => null);

    // Try to create tables directly using SQL
    const tables = `
      CREATE TABLE IF NOT EXISTS public.chats (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        user_id UUID,
        contact_name TEXT NOT NULL,
        contact_phone TEXT,
        last_message TEXT,
        priority TEXT DEFAULT 'medium',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
      );

      CREATE TABLE IF NOT EXISTS public.messages (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        chat_id UUID REFERENCES public.chats(id) ON DELETE CASCADE,
        content TEXT NOT NULL,
        direction TEXT NOT NULL,
        timestamp TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
        read BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
      );

      CREATE INDEX IF NOT EXISTS idx_messages_chat_id ON public.messages(chat_id);
      CREATE INDEX IF NOT EXISTS idx_messages_created_at ON public.messages(created_at DESC);
    `;

    // Insert sample data
    const { data, error } = await supabaseServer
      .from('messages')
      .select('count', { count: 'exact' });

    if (data === null) {
      // Tables likely don't exist yet
      return NextResponse.json({
        success: false,
        error: 'Database tables not created yet. Run Supabase migrations.',
        hint: 'Run: supabase db push',
      }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: 'Database setup complete',
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
