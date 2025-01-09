# Pacific Science Center Real-Time Kiosk (Dinosaur Exhibit)


This project demonstrates a client-side “tool calling” setup with OpenAI’s WebRTC Realtime API, tailored for a museum kiosk in the Dinosaur Exhibit at the Pacific Science Center. The kiosk only answers logistics questions (directions, show times, etc.)


This project is a [Cloudflare Workers](https://developers.cloudflare.com) app using [Hono](https://honojs.dev) to relay the [OpenAI Realtime API](https://platform.openai.com/docs/api-reference/realtime) over WebRTC. The main files are just [static assets](https://developers.cloudflare.com/workers/static-assets/).

[<img src="https://img.youtube.com/vi/TcOytsfva0o/0.jpg">](https://youtu.be/TcOytsfva0o "Client Side Tool Calling with the OpenAI WebRTC Realtime API")

(Note: the video explains the original approach. Our project has been customized for the Pacific Science Center kiosk scenario.)

## Project Overview
### script.js:

Defines local “functions” (e.g., locateBathroom, getShowScheduleForIMAX) that the AI can call.
Sets up a WebRTC PeerConnection and DataChannel to receive function-call requests from OpenAI’s Realtime API and respond with the corresponding output (directions, schedules, etc.).
Captures the user’s microphone and sends it to the AI in real time, while also playing inbound audio from the AI.
### index.ts:

A Cloudflare Worker route (POST /rtc-connect) that relays the SDP offer from the client to the OpenAI Realtime API.
Injects special instructions (DEFAULT_INSTRUCTIONS) telling the AI it’s a Dinosaur Exhibit kiosk that only answers logistics questions.

## How It Works
When the browser loads script.js, it creates a WebRTC connection.
The user’s microphone audio is streamed to OpenAI; the AI’s audio is streamed back.
The DataChannel allows the AI to request local “function calls,” such as locateBathroom or getShowScheduleForIMAX.
These function calls are executed client-side in script.js, and the results are sent back to OpenAI.
The entire conversation is guided by the rules/instructions set in index.ts.

## File Highlights

### script.js
A sample excerpt of the custom museum logic:

``` bash
// 1. Define the new functions
const fns = {
  locateBathroom: async () => {
    return "The nearest bathroom is located ...";
  },
  // Show Schedules ...
  // Directions ...
};

// 2. Create the WebRTC Peer Connection
const peerConnection = new RTCPeerConnection();

// 3. Handle inbound audio ...
// 4. Create a Data Channel ...
// 5. Advertise the new tools ...
// 6. Listen for incoming messages ...
// 7. Capture microphone and finalize WebRTC ...
```


### index.ts
A snippet of the Worker code injecting the kiosk instructions:

``` bash
const DEFAULT_INSTRUCTIONS = \`
  You are a museum kiosk stationed in the Dinosaur Exhibit ...
  Only answer logistics questions (show/event times, directions, etc.).
  If asked about dinosaurs or science, politely refuse ...
  ...
\`;

app.post('/rtc-connect', async (c) => {
  // Relay to OpenAI Realtime API
  const body = await c.req.text();
  const url = new URL('https://api.openai.com/v1/realtime');
  url.searchParams.set('model', 'gpt-4o-realtime-preview-2024-12-17');
  url.searchParams.set('instructions', DEFAULT_INSTRUCTIONS);
  url.searchParams.set('voice', 'coral');

  // Send the POST ...
});
```
## Develop

Copy [.dev.vars.example](./.dev.vars.example) to `.dev.vars` and fill out your OpenAI API Key.

Install your dependencies

```bash
npm install
```

Run local server

```bash
npm run dev
```

## Deploy

Upload your secret

```bash
npx wrangler secret put OPENAI_API_KEY
```

```bash
npm run deploy
```
## Contributing
Feel free to open an issue or pull request if you find bugs or have suggestions. This project aims to demonstrate how WebRTC + OpenAI Realtime + local “tool calls” can be integrated into an interactive kiosk scenario, so we’re always open to improvements or new ideas!