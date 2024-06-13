import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/app/utils/supabase/server';
import { cookies } from 'next/headers';
import { generateIdeas } from '@/app/actions/generateIdeas';

export const maxDuration = 15;

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
    // Generate ideas
    const ideas = await generateIdeas(
      prompt, 
      ideas_quantity, 
      project_id, 
      brief_id
    );

    // Insert ideas
    const { 
      data: ideasData, 
      error: ideasError 
    } = await supabase
      .from('ideas')
      .insert(ideas)
      .select();

    if (ideasError) {
      console.error(
        `Error inserting ideas: ${JSON.stringify(ideas)}`, 
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
      const currentIdeasCount = ideas_count ?? 0;
      // Update project ideas count
      const newIdeasCount: number = currentIdeasCount + ideas_quantity;
      const { 
        data: projectData, 
        error: projectError 
      } = await supabase
        .from("projects")
        .update({ 
          ideas_count: newIdeasCount 
        })
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
      } else if (
        ideasData && 
        projectData
      ) {
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
    return new NextResponse(JSON.stringify({ 
      error: 'Error inserting ideas: ${ideas}' 
    }), {
      status: 500,
      headers: { 
        'Content-Type': 'application/json' 
      },
    });
  };
};