import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import AddIntern from "./pages/AddIntern";
import InternList from "./pages/InternList";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Dashboard */}
        <Route
          path="/"
          element={<Dashboard />}
        />

        {/* Add Certificate */}
        <Route
          path="/add"
          element={<AddIntern />}
        />

        {/* Edit Certificate */}
        <Route
          path="/edit/:certificate_id"
          element={<AddIntern />}
        />

        {/* Intern List */}
        <Route
          path="/interns"
          element={<InternList />}
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