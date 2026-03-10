# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Deploy on Netlify

1. Connect the repository in Netlify.
2. Netlify will use `netlify.toml` (`npm run build`, publish `dist`).
3. Set environment variable `GEMINI_API_KEY` in Netlify site settings.
4. Trigger deploy.
