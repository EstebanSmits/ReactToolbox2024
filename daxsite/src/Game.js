import React, { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
const Game = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [player, setPlayer] = useState(null);
  const [gameId, setGameId] = useState(null);
  const [isWsOpen, setIsWsOpen] = useState(false); // WebSocket connection state
  const ws = useRef(null);
  const location = useLocation();
  const reconnectInterval = useRef(null);

  const connectWebSocket = () => {
    if (ws.current) {
      if (ws.current.readyState === WebSocket.OPEN ) {
        ws.current.close();
      }
    }

    ws.current = new WebSocket('ws://localhost:3001');

    ws.current.onopen = () => {
      setIsWsOpen(true);
      clearInterval(reconnectInterval.current);
    };

    ws.current.onclose = () => {
      setIsWsOpen(false);
      reconnect();
    };

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'created') {
        setGameId(data.gameId);
        setPlayer(data.playerId);
      } else if (data.type === 'joined') {
        setGameId(data.gameId);
        setPlayer(data.playerId);
      } else if (data.type === 'update') {
        setBoard(data.board);
      }
    };
  };

  const copyLinkToClipboard = () => {
    const link = `${window.location.origin}/?gameId=${gameId}`;
    navigator.clipboard.writeText(link).then(() => {
        toast.success('Link copied to clipboard');
    }, () => {
        toast.error('Failed to copy the link');
    });
  };

  const reconnect = () => {
    if (!reconnectInterval.current) {
      reconnectInterval.current = setInterval(() => {
        if (ws.current.readyState !== WebSocket.OPEN) {
          connectWebSocket();
        } else {
          clearInterval(reconnectInterval.current);
          reconnectInterval.current = null;
        }
      }, 5000);
    }
  };

  useEffect(() => {
    connectWebSocket();

    const params = new URLSearchParams(location.search);
    const gameIdFromUrl = params.get('gameId');
    if (gameIdFromUrl) {
      joinGame(gameIdFromUrl);
    }

    return () => {
      if (reconnectInterval.current) {
        clearInterval(reconnectInterval.current);
      }
      if (ws.current && ws.current.readyState === WebSocket.OPEN) {
        ws.current.close();
      }
    };
  }, [location]);

  const createGame = () => {
    if (isWsOpen) {
      ws.current.send(JSON.stringify({ type: 'create' }));
    }
  };

  const joinGame = (gameId) => {
    if (isWsOpen) {
      ws.current.send(JSON.stringify({ type: 'join', gameId }));
    }
  };

  const makeMove = (index) => {
    if (!board[index] && player && isWsOpen) {
      ws.current.send(JSON.stringify({ type: 'move', index, player }));
    }
  };

  const renderSquare = (i) => {
    return (
      <button onClick={() => makeMove(i)} disabled={!isWsOpen || !player || board[i]}>
        {board[i]}
      </button>
    );
  };

  return (
    <div>
      {!isWsOpen && <div className="alert alert-danger">WebSocket is down. Please try again later.</div>}
      <div>
        {player ? (
          <div>Player: {player}</div>
        ) : (
          <div>
            <button onClick={createGame} disabled={!isWsOpen}>Create Game</button>
            <input type="text" placeholder="Game ID" onBlur={(e) => joinGame(e.target.value)} disabled={!isWsOpen} />
          </div>
        )}
      </div>
      {gameId && (
        <div>
          <div>Share this link with another player to join:</div>
          <div>
            <a href={`${window.location.origin}/?gameId=${gameId}`} target="_blank" rel="noopener noreferrer">
              {`${window.location.origin}/?gameId=${gameId}`}
            </a>
            <button onClick={copyLinkToClipboard}>Copy Link</button>
          </div>
        </div>
      )}
      <div>
        <div>
          {renderSquare(0)} {renderSquare(1)} {renderSquare(2)}
        </div>
        <div>
          {renderSquare(3)} {renderSquare(4)} {renderSquare(5)}
        </div>
        <div>
          {renderSquare(6)} {renderSquare(7)} {renderSquare(8)}
        </div>
      </div>
    </div>
  );
};

export default Game;
