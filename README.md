# WebRTC Chat

This project provides a minimal WebRTC text and voice chat using React and Node.js. It can be run locally using Docker Compose.

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
2. Open `http://localhost:4000` in two browser windows.
3. Use the text input to send messages. Press **Join Voice Channel** to enable microphone and talk.

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
