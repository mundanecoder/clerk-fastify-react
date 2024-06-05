import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";

const clerkFrontendApi = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || "";

// console.log(clerkFrontendApi);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ClerkProvider publishableKey={clerkFrontendApi}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ClerkProvider>
);
