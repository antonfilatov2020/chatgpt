/*
Run this model in Javascript

> npm install openai
*/
import OpenAI from "openai";

// To authenticate with the model you will need to generate a personal access token (PAT) in your GitHub settings. 
// Create your PAT token by following instructions here: https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens
const token = process.env["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"];

export async function main() {

  const client = new OpenAI({
    baseURL: "https://api.openai.com/v1/models",
    apiKey: "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"
  });

  const response = await client.chat.completions.create({
    messages: [
      { role:"system", content: "" },
      { role:"user", content: "What is the capital of France?" }
    ],
    model: "gpt-4",
    temperature: 1,
    max_tokens: 4096,
    top_p: 1
  });

  console.log(response.choices[0].message.content);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
