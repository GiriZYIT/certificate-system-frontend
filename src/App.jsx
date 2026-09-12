import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import AddIntern from "./pages/AddIntern";
import InternList from "./pages/InternList";
import VerifyCertificate from "./pages/VerifyCertificate";


function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Dashboard */}
        <Route
          path="/"
          element={<Dashboard />}
        />

        {/* Create Certificate */}
        <Route
          path="/add"
          element={<AddIntern />}
        />

        {/* Edit Certificate */}
        <Route
          path="/edit/:certificate_id"
          element={<AddIntern />}
        />

        {/* All Certificates */}
        <Route
          path="/interns"
          element={<InternList />}
        />

        {/* Public Certificate Verification */}
        <Route
          path="/verify/:certificate_id"
          element={<VerifyCertificate />}
        />

        {/* Unknown URL */}
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;