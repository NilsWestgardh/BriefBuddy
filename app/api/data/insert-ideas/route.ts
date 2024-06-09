import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/app/utils/supabase/server';
import { cookies } from 'next/headers';
import { generateIdeas } from '@/app/actions/generateIdeas';

export async function POST(
  req: NextRequest
) {
  const { 
    prompt, 
    ideas_quantity, 
    project_id, 
    brief_id 
  } = await req.json();
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  try {
    const ideas = await generateIdeas(
      prompt, 
      ideas_quantity, 
      project_id, 
      brief_id
    );

    console.log('Generated ideas:', ideas);

    const { 
      data, 
      error 
    } = await supabase
      .from('ideas')
      .insert(ideas)
      .select();

    if (error) {
      console.error(
        'Error inserting ideas:', 
        error
      );
      return new NextResponse(
        JSON.stringify({ 
          error: error.message 
        }), {
        status: 500,
        headers: { 
          'Content-Type': 'application/json' 
        },
      });
    }

    return new NextResponse(JSON.stringify({ 
      ideas: data 
    }), {
      status: 200,
      headers: { 
        'Content-Type': 'application/json' 
      },
    });

  } catch (error) {
    console.error(
      'Error inserting ideas:', 
      error
    );
    return new NextResponse(JSON.stringify({ 
      error: 'Error inserting ideas' 
    }), {
      status: 500,
      headers: { 
        'Content-Type': 'application/json' 
      },
    });
  };
};