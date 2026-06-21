import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CategoryPage from "./app/CategoryPage";
import RoadmapPage from "./app/RoadmapPage";
import App from "./app/App";
import Admin from "./app/Admin";

import NotePage from "./app/NotePage";

import "./styles/index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/admin" element={<Admin />} />
      
      <Route
        path="/category/:name"
        element={<CategoryPage />}
      />
      <Route
        path="/roadmap/:id"
        element={<RoadmapPage />}
      />

      <Route
  path="/roadmap/:id"
  element={<RoadmapPage />}
/>

<Route
  path="/note/:id"
  element={<NotePage />}
/>
    </Routes>
  </BrowserRouter>
);