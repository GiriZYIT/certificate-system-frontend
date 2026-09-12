import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import AddIntern from "./pages/AddIntern";
import InternList from "./pages/InternList";
import Login from "./pages/login";

function ProtectedRoute({ children }) {
  const isLoggedIn = localStorage.getItem("adminLoggedIn");

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Login */}
        <Route path="/login" element={<Login />} />

        {/* Protected Dashboard */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Protected Add */}
        <Route
          path="/add"
          element={
            <ProtectedRoute>
              <AddIntern />
            </ProtectedRoute>
          }
        />

        {/* Protected Edit */}
        <Route
          path="/edit/:certificate_id"
          element={
            <ProtectedRoute>
              <AddIntern />
            </ProtectedRoute>
          }
        />

        {/* Protected Intern List */}
        <Route
          path="/interns"
          element={
            <ProtectedRoute>
              <InternList />
            </ProtectedRoute>
          }
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