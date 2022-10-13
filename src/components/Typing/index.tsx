
interface ITypingProps {
	username: string | undefined;
}

export function Typing({username} : ITypingProps){
	
	return (

		<div className = "messages">
			<h4>{username}</h4>
			<p>typing...</p>
		</div>
		
	);
}