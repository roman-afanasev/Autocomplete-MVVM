import App from "./views/App";
import {Container, createRoot} from "react-dom/client";

const rootElement = createRoot(document.getElementById("root") as Container);
rootElement.render(<App/>)
