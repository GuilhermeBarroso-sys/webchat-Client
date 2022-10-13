import { FormEvent } from "react";
import { socket } from "../../services/socket";

interface IInputMessage {
	handleSubmit: (event: FormEvent<HTMLFormElement>) => void
	username: string | undefined
	onChangeCallBack: (value: string) => void
}
export function InputMessage({handleSubmit,onChangeCallBack,username} : IInputMessage) {
	return (
		<form onSubmit={handleSubmit}>
			<div className="input">
				<input 
					onChange={(event) => {
						onChangeCallBack(event.target.value);
						if(event.target.value) {
							socket.emit("writing", username);
						} else {
							socket.emit("stop-writing");
						}
					}} 
					onBlur={() => {
						socket.emit("stop-writing");
					}}
            
					type = "text"  
					className="inputText"/>
				<div>
					<button className="inputButton">Send</button>
				</div>
			</div>
		</form>
	);
}