import { EventHandler, FormEvent, useEffect, useState } from "react";
import { Socket } from "socket.io";
import {io} from "socket.io-client";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import "./App.css";
import { Home } from "./components/Home";
import { WebChat } from "./components/WebChat";


function App() {
	
	const [username, setUsername] = useState<string | undefined>(undefined);
	useEffect(() => {
		const getUserName = localStorage.getItem("@devgui-webchat:nickname");
		if(getUserName) {
			setUsername(getUserName);
		}
	}, []);
	return (
		<div className="App">
			<div className="container">
				{username ? <WebChat username={username}/> : <Home submitCb={(event, name) => { setUsername(name);}}/>
						
					
				}
			</div>

		</div>
	);
}

export default App;
