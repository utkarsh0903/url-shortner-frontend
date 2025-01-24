import "./App.css";
import Register from "./Pages/register.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Register />} />
      {/* <Route path="*" element={<NoPage />} /> */}
    </Routes>
    </BrowserRouter>
  );
}

export default App;
