// import { NextRequest } from "next/server";
// import fetch from "node-fetch";

// export const maxDuration = 45;
// // TODO: Update
// const openAiApiUrl = "https://api.openai.com/v1/images/generations";

// export async function POST(req: NextRequest) {
//     if (req.method === 'POST') {
//         const { prompt } = await req.json();
        
//         try {
//             // Generate image
//             const response = await fetch(openAiApiUrl, {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                     "Authorization": `Bearer ${process.env["OPENAI_API_KEY"]}`
//                 },
//                 body: JSON.stringify(
//                   // TODO: define header
//                 )
//             });

//             if (!response.ok) {
//                 throw new Error(`API call failed: ${response.statusText}`);
//             }

//             const responseData = await response.json();

//             // return new Response(JSON.stringify({ imageUrl: openAiImageUrl }), {
//             //     status: 200,
//             //     headers: { 'Content-Type': 'application/json' },
//             // });

//         } catch (error) {
//             console.error('Error generating ideas:', error);
//             return new Response(JSON.stringify({ error: 'Error generating ideas' }), {
//                 status: 500,
//                 headers: { 'Content-Type': 'application/json' },
//             });
//         }
//     } else {
//         return new Response(null, { status: 405 });
//     }
// }