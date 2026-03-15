# n8n workflows

This folder will contain n8n workflows for `utn-utnito`.

## Current workflow

- `utnito/utnito_chatgpt_message_response.json`

## What this workflow does

- Exposes `POST /webhook/utnito-prompt-processing`.
- Receives a body with:
  - `prompt`
  - `userMessage`
- Calls OpenAI from n8n.
- Returns a normalized JSON response to backend:
  - success:
    - `action: "chatGPT_message_response"`
    - `error: false`
    - `data.assistantMessage`
    - `origin: "n8n"`
  - error:
    - `action: "chatGPT_message_response"`
    - `error: true`
    - `data.errorMessage`, `data.errorDetails`, trace fields
    - `origin: "n8n"`

## Setup notes

1. Import the workflow in n8n.
2. Configure OpenAI credentials in n8n.
3. Ensure backend env points to:
   - local: `AI_N8N_WEBHOOK_URL=http://localhost:5690/webhook/utnito-prompt-processing`
   - docker: `AI_N8N_WEBHOOK_URL=http://chat-n8n:5678/webhook/utnito-prompt-processing`
