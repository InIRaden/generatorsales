import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

function buildPrompt(input: any, section?: string) {
  return `
You are an elite direct-response copywriter.

Create a structured sales page in JSON.

Product: ${input.product_name}
Description: ${input.product_description || "n/a"}
Features: ${input.features || "n/a"}
Audience: ${input.target_audience || "general"}
Price: ${input.price || "n/a"}
USP: ${input.unique_selling_point || "n/a"}

${section ? `Regenerate only ${section}` : "Generate complete page"}

Return valid JSON only:
{
 "headline":"",
 "subheadline":"",
 "description":"",
 "benefits":[
   {
    "title":"",
    "description":""
   }
 ],
 "features":[
   {
    "title":"",
    "description":""
   }
 ],
 "socialProof":[
   {
    "quote":"",
    "author":"",
    "role":""
   }
 ],
 "pricing":{
   "title":"",
   "price":"",
   "description":"",
   "features":[]
 },
 "cta":{
   "primary":"",
   "secondary":""
 }
}
`;
}

serve(async(req)=>{

 if(req.method==="OPTIONS"){
   return new Response(null,{headers:corsHeaders});
 }

 try{

   const {input, section} = await req.json();

   const apiKey = Deno.env.get("GEMINI_API_KEY");

   if(!apiKey){
      throw new Error("GEMINI_API_KEY not configured");
   }

   const response = await fetch(
`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
{
 method:"POST",
 headers:{
   "Content-Type":"application/json"
 },
 body:JSON.stringify({
   contents:[
    {
      parts:[
       {
        text: buildPrompt(input, section)
       }
      ]
    }
   ]
 })
}
);

const data=await response.json();

if(!response.ok){
 return new Response(
   JSON.stringify(data),
   {
    status:500,
    headers:{
      ...corsHeaders,
      "Content-Type":"application/json"
    }
   }
 );
}

const raw =
data?.candidates?.[0]?.content?.parts?.[0]?.text;

if(!raw){
 throw new Error("No AI response");
}

let content;

try{
 content = JSON.parse(
   raw
   .replace(/```json/g,"")
   .replace(/```/g,"")
   .trim()
 );
}catch{
 throw new Error("Model returned invalid JSON");
}

return new Response(
 JSON.stringify({content}),
 {
  headers:{
   ...corsHeaders,
   "Content-Type":"application/json"
  }
 }
);

 }catch(e){

 return new Response(
   JSON.stringify({
    error:e instanceof Error ? e.message : "Unknown error"
   }),
   {
     status:500,
     headers:{
       ...corsHeaders,
       "Content-Type":"application/json"
     }
   }
 );
 }

});