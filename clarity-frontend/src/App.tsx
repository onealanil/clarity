import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/landing/Landing";
import Login from "./pages/login/Login";
import Register from "./pages/signup/Signup";
import Onboarding from "./pages/onboarding/OnBoarding";
import Dashboard from "./pages/dashboard/Dashboard";
import { useBootstrapAuth } from "./hooks/useBootstrapAuth";
import ProtectedRoute from "../src/utils/ProtectedRoute";
import Loader from "./components/loader/Loader";

function App() {
  const loading = useBootstrapAuth();

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    );

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />

        <Route
          path="/onboarding"
          element={
            <ProtectedRoute>
              <Onboarding />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
