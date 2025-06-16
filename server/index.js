const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const cors = require('cors');
const { handleSignaling } = require('./signaling');

const app = express();
app.use(cors());
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

let nextId = 1;
const clients = new Map();

wss.on('connection', (ws) => {
  const id = nextId++;
  clients.set(id, ws);
  ws.send(JSON.stringify({ type: 'id', id }));

  ws.on('message', (message) => {
    let data = {};
    try {
      data = JSON.parse(message.toString());
    } catch (e) {
      return;
    }

    if (data.type === 'chat') {
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(
            JSON.stringify({
              type: 'chat',
              message: data.message,
              from: id,
            })
          );
        }
      });
    } else {
      handleSignaling(data, id, clients);
    }
  });

  ws.on('close', () => {
    clients.delete(id);
  });
});

app.get('/', (req, res) => {
  res.send('WebRTC Chat Server');
});

server.listen(4001, () => {
  console.log('Server listening on port 4001');
});
