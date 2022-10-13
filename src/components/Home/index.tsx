import { useRef } from "react";
import "./style.css";
interface IHomeProps {
	submitCb: (event : React.FormEvent<HTMLFormElement>, username : string | undefined) => void
}
export function Home({submitCb} : IHomeProps) {
	const ref  = useRef<HTMLInputElement>(null);
	return (
		<div>
			<form onSubmit={(event) => {
				event.preventDefault();
				const nickname = ref?.current?.value;
				localStorage.setItem("@devgui-webchat:nickname", nickname);
				submitCb(event, nickname);
			}}>

				<h1>Choose a nickname</h1>
				<input name="nickname" ref={ref} className="nicknameInput" type={"text"} />
				<button>Go</button>
			</form>
		</div>
	);
}