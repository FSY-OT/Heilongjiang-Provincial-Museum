import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AppWrapper } from "./components/common/PageMeta.tsx";
import { DataProvider } from "./contexts/DataContext";

createRoot(document.getElementById("root")!).render(
  <DataProvider>
    <AppWrapper>
      <App />
    </AppWrapper>
  </DataProvider>
);
