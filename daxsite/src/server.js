const express = require('express');
const { WebSocketServer } = require('ws');
const http = require('http');
const { v4: uuidv4 } = require('uuid');

const app = express();
const fs = require('fs');
const path = require('path');


const server = http.createServer(app);
app.get('/api/last-modified', (req, res) => {
  const filePath = path.join(__dirname, req.query.file);
  fs.stat(filePath, (err, stats) => {
    if (err) {
      return res.status(500).json({ error: 'File not found' });
    }
    res.json({ lastModified: stats.mtime });
  });
});

const games = {};
const wss = new WebSocketServer({ server });
wss.on('connection', (ws) => {
  let gameId, playerId;

  ws.on('message', (message) => {
    const data = JSON.parse(message);

    if (data.type === 'create') {
      gameId = uuidv4();
      playerId = 'player1';
      games[gameId] = { players: { player1: ws, player2: null }, board: Array(9).fill(null) };
      ws.send(JSON.stringify({ type: 'created', gameId, playerId }));
    } else if (data.type === 'join') {
      gameId = data.gameId;
      if (games[gameId] && !games[gameId].players.player2) {
        playerId = 'player2';
        games[gameId].players.player2 = ws;
        ws.send(JSON.stringify({ type: 'joined', gameId, playerId }));
        games[gameId].players.player1.send(JSON.stringify({ type: 'player2Joined' }));
      } else {
        ws.send(JSON.stringify({ type: 'error', message: 'Invalid game ID or game full' }));
      }
    } else if (data.type === 'move') {
      const { index, player } = data;
      if (games[gameId] && games[gameId].board[index] === null) {
        games[gameId].board[index] = player;
        const update = JSON.stringify({ type: 'update', board: games[gameId].board });
        games[gameId].players.player1.send(update);
        games[gameId].players.player2.send(update);
      }
    }
  });
  ws.on('close', () => {
    if (gameId && games[gameId]) {
      delete games[gameId];
    }
  });
});

server.listen(3001, () => {
  console.log('Server is listening on port 3001');
});
