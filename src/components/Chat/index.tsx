import { useEffect, useLayoutEffect, useRef } from "react";
import { IMessage, Message } from "../Message";
import { Typing } from "../Typing";

interface IChatProps {
	username: string | undefined;
	messages : Array<IMessage>
	isWriting: boolean;
	connected: boolean;
}

export function Chat({messages, isWriting, username, connected} : IChatProps) {
  
	const chatRef = useRef<HTMLDivElement>(null);
	useEffect(() => {
		
		chatRef.current.scrollTop = chatRef.current.scrollHeight;
		
		
	},[messages]);
	return (
		<>
    
			<h2>Chat</h2>
			<div className="chat" ref={chatRef}>
				<div className = "messages">
					{connected && (
						<h6>User {username} connected</h6>
					)}
				</div>
				{
					messages.map(({id,message,username}) => {
						return (
							<Message 
								key={id} 
								id={id} 
								message = {message} 
								username={username}
							/>
              
						);
					})
        
				}
				{isWriting && <Typing username={username} />}
			</div>
		</>
		
			
		
	);
}