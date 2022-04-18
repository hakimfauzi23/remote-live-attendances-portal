import { Navbar, Container, Nav } from "react-bootstrap";

import { Routes, Route, Link } from "react-router-dom";

import Home from "./pages/Home";
import SearchSection from "./pages/check-attendance/SearchSection";
import AttendanceForm from "./pages/do-live-attendance/AttendanceForm";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/check-attendance" element={<SearchSection />} />
        <Route path="/do-live-attendance" element={<AttendanceForm />} />
      </Routes>
    </div>
  );
}

export default App;
