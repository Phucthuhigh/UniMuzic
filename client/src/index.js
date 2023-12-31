import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import GlobalStyles from "./GlobalStyles";
import { AuthContextProvider, SongContextProvider } from "./contexts";
import { inject } from "@vercel/analytics";
inject();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <Router>
            <AuthContextProvider>
                <SongContextProvider>
                    <GlobalStyles>
                        <App />
                    </GlobalStyles>
                </SongContextProvider>
            </AuthContextProvider>
        </Router>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
