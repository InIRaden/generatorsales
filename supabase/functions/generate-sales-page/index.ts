import "https://deno.land/x/xhr@0.1.0/mod.ts";
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
  const base = `Product: ${input.product_name}
Description: ${input.product_description || "n/a"}
Key features: ${input.features || "n/a"}
Target audience: ${input.target_audience || "general"}
Price: ${input.price || "n/a"}
Unique selling point: ${input.unique_selling_point || "n/a"}`;
  if (section) {
    return `${base}\n\nRegenerate ONLY the "${section}" section of the sales page. Keep it consistent with the rest. Return the FULL sales page object but you may keep other sections similar.`;
  }
  return `${base}\n\nGenerate a complete, conversion-focused sales page.`;
}

const SCHEMA = {
  type: "object",
  properties: {
    headline: { type: "string", description: "Bold benefit-driven headline, max 12 words" },
    subheadline: { type: "string", description: "Supporting line, 1-2 sentences" },
    description: {
      type: "string",
      description: "2-3 short paragraphs explaining what it is and why it matters",
    },
    benefits: {
      type: "array",
      minItems: 3,
      maxItems: 6,
      items: {
        type: "object",
        properties: { title: { type: "string" }, description: { type: "string" } },
        required: ["title", "description"],
        additionalProperties: false,
      },
    },
    features: {
      type: "array",
      minItems: 3,
      maxItems: 6,
      items: {
        type: "object",
        properties: { title: { type: "string" }, description: { type: "string" } },
        required: ["title", "description"],
        additionalProperties: false,
      },
    },
    socialProof: {
      type: "array",
      minItems: 2,
      maxItems: 4,
      items: {
        type: "object",
        properties: {
          quote: { type: "string", description: "Realistic placeholder testimonial" },
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
        features: { type: "array", items: { type: "string" }, minItems: 3, maxItems: 8 },
      },
      required: ["title", "price", "description", "features"],
      additionalProperties: false,
    },
    cta: {
      type: "object",
      properties: {
        primary: { type: "string", description: "Action-oriented button text" },
        secondary: { type: "string" },
      },
      required: ["primary", "secondary"],
      additionalProperties: false,
    },
    faq: {
      type: "array",
      minItems: 3,
      maxItems: 5,
      items: {
        type: "object",
        properties: { question: { type: "string" }, answer: { type: "string" } },
        required: ["question", "answer"],
        additionalProperties: false,
      },
    },
  },
  required: [
    "headline",
    "subheadline",
    "description",
    "benefits",
    "features",
    "socialProof",
    "pricing",
    "cta",
  ],
  additionalProperties: false,
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { input, section } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    const LOVABLE_URL = Deno.env.get("LOVABLE_URL");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");
    if (!LOVABLE_URL) throw new Error("LOVABLE_URL not configured");

    const response = await fetch(LOVABLE_URL, {
      method: "POST",
      headers: { Authorization: `Bearer ${LOVABLE_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "google/gemini-1.5-flash",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: buildUserPrompt(input, section) },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "build_sales_page",
              description: "Return the structured sales page content",
              parameters: SCHEMA,
            },
          },
        ],
        tool_choice: "auto",
      }),
    });

    if (response.status === 429) {
      return new Response(
        JSON.stringify({ error: "Rate limit exceeded. Please try again shortly." }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }
    if (response.status === 402) {
      return new Response(
        JSON.stringify({
          error: "AI credits exhausted. Please add funds in Settings → Workspace → Usage.",
        }),
        { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }
    if (!response.ok) {
      const t = await response.text();

      return new Response(
        JSON.stringify({
          gateway_status: response.status,
          gateway_error: t,
        }),
        {
          status: 500,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        },
      );
    }

    const data = await response.json();
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall) {
      return new Response(JSON.stringify({ error: "No structured output returned" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    let content;

    try {
      content = JSON.parse(toolCall.function.arguments);
    } catch {
      return new Response(JSON.stringify({ error: "Invalid tool response JSON" }), {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      });
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
