import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UserProfilePage from "./pages/UserProfilePage";
import EnergyMarketPage from "./pages/EnergyMarketPage";
import RegisterEnergyPage from "./pages/RegisterEnergyPage";
import "./styles/common.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth/signin" element={<LoginPage />} />
        <Route path="/auth/signup" element={<RegisterPage />} />
        <Route path="/users/:userid" element={<UserProfilePage />} />
        <Route path="/energy/market" element={<EnergyMarketPage />} />
        <Route path="/energy/register" element={<RegisterEnergyPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
