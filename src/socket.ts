import { io, Socket } from 'socket.io-client';
import { getOrCreateSessionId } from './utils/session';

// Replace with your backend URL
const SERVER_URL = 'http://localhost:8080';

// Socket connection to backend
// Connect to the backend socket with the persisted socket_id
const socket = io(SERVER_URL, {
  auth: { session_id: getOrCreateSessionId() },
});

socket.on('connect', () => {
  console.log('Connected to server:', socket.id);
});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});

export default socket;
