export interface IMessage {
	id: string
	message: string
	username?: string 
}
export function Message({ message, username} : IMessage) {
	return (
		<div  className = "messages">
			<h4>{username}</h4>
			<p>{message}</p>
		</div>
	);
}