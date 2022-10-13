
import { EventHandler, FormEvent, useEffect, useState } from "react";
import { Socket } from "socket.io";
import {io} from "socket.io-client";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { socket } from "../../services/socket";
import { Chat } from "../Chat";
import { InputMessage } from "../InputMessage";
interface IMessage {
	id: string
	message: string
	username?: string 
}

interface IWebChatProps {
	username: string | undefined
}

export function WebChat({username} : IWebChatProps) {
	const [connected,setConnected] = useState(false);
	const [messages, setMessages] = useState<IMessage[]>([]);
	const [inputMessage, setInputMessage] = useState("");
	const [isWriting, setIsWriting] = useState(false);

	useEffect(() => {
		socket.on("connect", () => {
			setConnected(true);

		});
		
		socket.emit("getMessages");

		socket.on("message-receive", (messages : IMessage[]) => {
			setMessages(messages);
		});

		socket.on("writing-receive", () => {
			setTimeout(() => {
				setIsWriting(true);
			}, 500);
		});

		socket.on("stop-writing-receive", () => {
			setTimeout(() => {
				setIsWriting(false);

			}, 500);
		});
		return () => {
			socket.off("connect");
			socket.off("message-receive");
			socket.off("writing-receive");
			socket.off("stop-writing-receive");


		};
	}, []);
	function addMessage(message : IMessage) {
		socket.emit("messages", message);
	} 
	function handleSubmit(event : FormEvent<HTMLFormElement>){
		event.preventDefault();
		inputMessage && addMessage({
			id: crypto.randomUUID(),
			message: inputMessage,
			username
		});
		setInputMessage("");
		socket.emit("stop-writing");
	}

	return (
		<>
			<Chat
				connected={connected} 
				isWriting={isWriting} 
				messages = {messages} 
				username={username} 
			/>
			<InputMessage
				handleSubmit={handleSubmit} 
				username={username} 
				onChangeCallBack = {(value : string) => {
					setInputMessage(value);
				}}
			/>
		</>
	);
}