import {Server, Socket} from "socket.io";
import {randomUUID} from "node:crypto";
const io = new Server(3000, {
	cors: {
		origin: ["http://127.0.0.1:5173", "http://localhost:5173"]
	}
});

const messagesDB = []; 
io.on("connection", (socket) => {
	// io.emit("message-receive", messagesDB);
	socket.on("writing", (nick) => {
		socket.broadcast.emit("writing-receive", nick);
	});
	socket.on("stop-writing", (nick) => {
		socket.broadcast.emit("stop-writing-receive", nick);

	});
	socket.on("getMessages",() => {
		socket.broadcast.emit("message-receive", messagesDB);
	});
  
	socket.on("messages", (message) => {
		messagesDB.push(message);
		io.emit("message-receive", messagesDB);
	});
	

});
