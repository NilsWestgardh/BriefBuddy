import { NextRequest, NextResponse } from "next/server";
import fetch from "node-fetch";

const openAiApiUrl = "https://api.openai.com/v1/completions";

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();

  try {
    const response = await fetch(openAiApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env["OPENAI_API_KEY"]}`,
      },
      body: JSON.stringify({
        model: "text-davinci-003",
        prompt,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      throw new Error(`API call failed: ${response.statusText}`);
    }

    const responseData = await response.json();

    return NextResponse.json(responseData);
  } catch (error) {
    console.error("Error generating ideas:", error);
    return new NextResponse(JSON.stringify({ error: "Error generating ideas" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};