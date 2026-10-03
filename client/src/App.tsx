import { Routes, Route, BrowserRouter } from "react-router-dom";
import { LoginPage } from "./pages/auth/LoginPage";
import { RegisterPage } from "./pages/auth/RegisterPage";
import { MainPage } from "./pages/main/MainPage";
import { LoadingScreen } from "./components/loaders/LoadingScreen";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<MainPage />} />
        <Route path="/loading" element={<LoadingScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
