import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `You are an elite direct-response copywriter who writes high-converting sales pages.
Write punchy, benefit-driven, persuasive copy in clear English.
Avoid hype words like "revolutionary" or "game-changer". Be specific, concrete, and emotional.
Always return content via the provided tool. Never return raw text.`;

function buildUserPrompt(input: any, section?: string) {
  return `Product: ${input.product_name}
Description: ${input.product_description || "n/a"}
Key features: ${input.features || "n/a"}
Target audience: ${input.target_audience || "general"}
Price: ${input.price || "n/a"}
USP: ${input.unique_selling_point || "n/a"}

${section ? `Regenerate ONLY the "${section}" section. Keep all other fields with sensible placeholders.` : "Generate the COMPLETE sales page."}

Call the generate_sales_page tool with the structured content.`;
}

const TOOL = {
  type: "function",
  function: {
    name: "generate_sales_page",
    description: "Return a fully structured sales page.",
    parameters: {
      type: "object",
      properties: {
        headline: { type: "string" },
        subheadline: { type: "string" },
        description: { type: "string" },
        benefits: {
          type: "array",
          items: {
            type: "object",
            properties: {
              title: { type: "string" },
              description: { type: "string" },
            },
            required: ["title", "description"],
            additionalProperties: false,
          },
        },
        features: {
          type: "array",
          items: {
            type: "object",
            properties: {
              title: { type: "string" },
              description: { type: "string" },
            },
            required: ["title", "description"],
            additionalProperties: false,
          },
        },
        socialProof: {
          type: "array",
          items: {
            type: "object",
            properties: {
              quote: { type: "string" },
              author: { type: "string" },
              role: { type: "string" },
            },
            required: ["quote", "author", "role"],
            additionalProperties: false,
          },
        },
        pricing: {
          type: "object",
          properties: {
            title: { type: "string" },
            price: { type: "string" },
            description: { type: "string" },
            features: { type: "array", items: { type: "string" } },
          },
          required: ["title", "price", "description", "features"],
          additionalProperties: false,
        },
        cta: {
          type: "object",
          properties: {
            primary: { type: "string" },
            secondary: { type: "string" },
          },
          required: ["primary", "secondary"],
          additionalProperties: false,
        },
      },
      required: ["headline", "subheadline", "description", "benefits", "features", "socialProof", "pricing", "cta"],
      additionalProperties: false,
    },
  },
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { input, section } = await req.json();

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: buildUserPrompt(input, section) },
        ],
        tools: [TOOL],
        tool_choice: { type: "function", function: { name: "generate_sales_page" } },
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("AI gateway error:", response.status, errText);
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limits exceeded, please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Add funds in Settings → Workspace → Usage." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }
      return new Response(
        JSON.stringify({ error: "AI gateway error", detail: errText }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const data = await response.json();
    const toolCall = data?.choices?.[0]?.message?.tool_calls?.[0];
    const argsStr = toolCall?.function?.arguments;
    if (!argsStr) {
      console.error("No tool call in response:", JSON.stringify(data));
      throw new Error("Model did not return structured content");
    }

    let content;
    try {
      content = JSON.parse(argsStr);
    } catch (e) {
      console.error("Invalid JSON in tool args:", argsStr);
      throw new Error("Model returned invalid JSON");
    }

    return new Response(JSON.stringify({ content }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("generate-sales-page error", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});