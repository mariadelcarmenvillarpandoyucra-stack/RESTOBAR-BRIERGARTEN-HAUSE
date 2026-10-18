import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DuenoPanel from "./pages/dueno/DuenoPanel";
import MeseroPanel from "./pages/mesero/MeseroPanel";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { StoreProvider } from "./store/StoreContext";

export default function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/dueno"
            element={
              <ProtectedRoute role="dueno">
                <DuenoPanel />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mesero"
            element={
              <ProtectedRoute role="mesero">
                <MeseroPanel />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </StoreProvider>
  );
}
