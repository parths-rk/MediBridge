import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css"
import App from "./App.jsx"
import { AuthProvider,  AuthContext } from "./context/AuthContext.jsx";
import ErrorBoundary from "./components/ErrorBoundary";


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
 <ErrorBoundary>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ErrorBoundary>
  </BrowserRouter>
);
