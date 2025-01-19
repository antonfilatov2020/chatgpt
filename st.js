/*
Run this model in Javascript

> npm install openai
*/
import OpenAI from "openai";

import { component$ } from "@builder.io/qwik";
import { routeAction$, Form } from "@builder.io/qwik-city";

// To authenticate with the model you will need to generate a personal access token (PAT) in your GitHub settings. 
// Create your PAT token by following instructions here: https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens
const token = process.env["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"];


export const usePromptAction = routeAction$(async (formData, requestEvent) => {


  const client = new OpenAI({
    baseURL: "https://api.openai.com/v1/models",
    apiKey: token
  });

  const prompt = formData.prompt
  const body = {
    model: 'gpt-4',
    messages: [{ role: 'user', content: prompt }]
  }
  
  const response = await client.v1.models.create({
    messages: [
      { role:"system", content: body },
      { role:"user", content: "What is the capital of France?" }
    ],
    model: "gpt-4",
    temperature: 1,
    max_tokens: 4096,
    top_p: 1
  });


  return response.choices[0].message.content;
});

export default component$(() => {
  const action = usePromptAction()

  return (
    <main class="max-w-4xl mx-auto p-4">
      <h1 class="text-4xl">Hi 👋</h1>

      <Form action={action} class="grid gap-4">
        <div>
          <label for="prompt">Prompt</label>
          <textarea name="prompt" id="prompt">
            Tell me a joke
          </textarea>
        </div>

        <div>
          <button type="submit" aria-disabled={action.isRunning}>
            {action.isRunning ? 'One sec...' : 'Tell me'}
          </button>
        </div>
      </Form>

      {action.value && (
        <article class="mt-4 border border-2 rounded-lg p-4 bg-[canvas]">
          <p>{action.value}</p>
        </article>
      )}
    </main>
  );
});
