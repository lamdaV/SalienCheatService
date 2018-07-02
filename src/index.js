import React from "react";
import ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";

import MessageStore from "./stores/MessageStore";
import CredentialStore from "./stores/CredentialStore";
import WorkerService from "./services/WorkerService"
import ServicePage from "./pages/ServicePage";

const credentialStore = new CredentialStore();

const DEFAULT_MESSAGE_LIMIT = parseInt(process.env.REACT_APP_DEFAULT_MESSAGE_LIMIT, 10);
const messageStore = new MessageStore(DEFAULT_MESSAGE_LIMIT);

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const workerService = new WorkerService(BACKEND_URL);

ReactDOM.render(<ServicePage credentialStore={credentialStore}
                             messageStore={messageStore}
                             workerService={workerService}/>,
                document.getElementById("root"));
registerServiceWorker();
