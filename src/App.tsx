import { Routes, Route } from "react-router-dom";

import { VideoScreen } from "./pages/VideoDetails";
import { Home } from "./pages/home";
import "./index.css";

export default function App() {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/video/:videoId" element={<VideoScreen />} />
    </Routes>
  );
}
