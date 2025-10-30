import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UserProfilePage from "./pages/UserProfilePage";
import EnergyMarketPage from "./pages/EnergyMarketPage";
import RegisterEnergyPage from "./pages/RegisterEnergyPage";
import ProtectedRoute from "./components/ProtectedRoute";
import "./styles/common.css";

function App() {
  const [userId, setUserId] = useState(localStorage.getItem("userId"));

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/auth/signin"
          element={<LoginPage setUserId={setUserId} />}
        />
        <Route
          path="/auth/signup"
          element={<RegisterPage setUserId={setUserId} />}
        />
        <Route
          path="/users/:userid"
          element={
            <ProtectedRoute userId={userId}>
              <UserProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/energy/market"
          element={
            <ProtectedRoute userId={userId}>
              <EnergyMarketPage userId={userId} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/energy/register"
          element={
            <ProtectedRoute userId={userId}>
              <RegisterEnergyPage userId={userId} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
