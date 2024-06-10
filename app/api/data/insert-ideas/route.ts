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
    ideas_count,
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

    const { 
      data: ideasData, 
      error: ideasError 
    } = await supabase
      .from('ideas')
      .insert(ideas)
      .select();

    if (ideasError) {
      console.error(
        'Error inserting ideas:', 
        ideasError
      );
      return new NextResponse(
        JSON.stringify({ 
          error: ideasError.message 
        }), {
        status: 500,
        headers: { 
          'Content-Type': 'application/json' 
        },
      });
    } else {
      const { 
        data: projectData, 
        error: projectError 
      } = await supabase
        .from("projects")
        .insert(
          "ideas_count", 
          ideas_count
        )
        .eq(
          "id", 
          project_id
        )
      
      if (projectError) {
        console.error(
          'Error updating project ideas count:', 
          projectError
        );
        return new NextResponse(
          JSON.stringify({ 
            error: projectError.message 
          }), {
          status: 500,
          headers: { 
            'Content-Type': 'application/json' 
          },
        });
      } else if (ideasData && projectData) {
        return new NextResponse(JSON.stringify({ 
          ideas: ideasData 
        }), {
          status: 200,
          headers: { 
            'Content-Type': 'application/json' 
          },
        });
      };
    };

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