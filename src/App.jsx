import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import AddIntern from "./pages/AddIntern";
import InternList from "./pages/InternList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
       <Route path="/add" element={<AddIntern />} />
       <Route path="/edit/:certificate_id" element={<AddIntern />} />
        <Route path="/interns" element={<InternList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;