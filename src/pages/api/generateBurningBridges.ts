import type { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

if (!process.env.OPENAI_API_KEY) {
    throw new Error('Missing env var from OpenAI');
}

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY // This is also the default, can be omitted
});

function constructPrompt(prompt: string, numCards: string) {
    return `
I want you to generate ${numCards} cards for me, for the game called burning bridges. The game aims to break relationships between participants who play the game, thus the questions must be tough and question their relationship. Here's the prompt:

\`\`\`
${prompt}
\`\`\`;

Start each card with a "who" or "which among you" question. Ensure that each question is no longer than 200 characters.
Return the cards as an array of JSON objects, with the following structure:

\`\`\`
[
    {
        \"question\": \"Who do you think deserves to be removed from your group?\"
    },
    {
        \"question\": \"Who do you think has the tendency to steal your girlfriend?\"
    }
]
\`\`\`
`;
}

// NOTE: app directory API routes require a different syntax.
export const config = {
    maxDuration: 10,
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    console.log("Hellow")
    const { prompt, numCards } = req.query;

    console.log(prompt, numCards)

    if (!prompt) {
        res.status(400).json("Prompt is required")
    }

    const gptPrompt = constructPrompt(String(prompt), String(numCards))

    const completion = await openai.chat.completions.create(
        {
            max_tokens: 2048,
            messages: [
                {
                    content: gptPrompt,
                    role: 'user',
                },
            ],
            model: 'gpt-3.5-turbo',
        },
        {
            timeout: 120000,
        },
    );

    const contents = completion?.choices[0]?.message?.content ?? '';

    console.log(contents);

    res.status(200).json({
        contents: JSON.parse(
            contents?.replaceAll('```json', '').replaceAll('```', ''),
        ),
    });
}