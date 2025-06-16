# WebRTC Chat

This project provides a simple chat interface styled with Tailwind CSS. It includes mock channels and messages plus a button to toggle voice status. The app runs locally using Node.js and Docker Compose.

## Structure

```
client/ - React frontend with Tailwind CSS
server/ - Express + WebSocket backend for chat and signaling
```

## Quick start

1. **Build and start containers**
   ```bash
   docker-compose up --build
   ```
2. Open `http://localhost:4000` in your browser.
3. Use the input at the bottom to send messages. The **Join Voice** button toggles a mock voice status indicator.

The frontend connects to the backend WebSocket on port `4001`.

## Development

- Frontend commands:
  ```bash
  cd client
  npm install
  npm run dev
  ```
- Backend commands:
  ```bash
  cd server
  npm install
  npm start
  ```

Tailwind configuration is minimal and can be extended as needed.
