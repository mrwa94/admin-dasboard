import { Server } from 'socket.io';

export default function handler(req:Request, res) {
  if (res.socket.server.io) {
    console.log('Socket is already running');
  } else {
    console.log('Socket is initializing');
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on('connection', (socket) => {
      console.log('New client connected');
    });
  }
  res.end();
}
