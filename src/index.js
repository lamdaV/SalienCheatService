import React from "react";
import ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";

import TokenPage from "./pages/TokenPage";

ReactDOM.render(<TokenPage />, document.getElementById("root"));
registerServiceWorker();
