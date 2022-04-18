import { Navbar, Container, Nav } from "react-bootstrap";
import { Routes, Route, Link } from "react-router-dom";

// Components
import DivisionIndex from "./pages/divisions/Index";
import CreateDivision from "./pages/divisions/Create";
import EditDivision from "./pages/divisions/Edit";
import CreateJobTitles from "./pages/job-titles/Create";
import JobTitleDetail from "./pages/job-titles/Get";
import EditJobTitle from "./pages/job-titles/Edit";
import EmployeeIndex from "./pages/employees/Index";
import CreateEmployee from "./pages/employees/Create";
import EmployeeDetail from "./pages/employees/Get";
import EditEmployee from "./pages/employees/Edit";
import SettingIndex from "./pages/settings/Index";
import EditSetting from "./pages/settings/Edit";

function App() {
  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
        <Container>
          <Navbar.Brand to="/">WFH ABSENCE PLATFORMS</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav ">
            <Nav className="me-auto ">
              <Nav.Link as={Link} to="/" className="nav-link">
                HOME
              </Nav.Link>
              <Nav.Link as={Link} to="/divisions" className="nav-link">
                DIVISIONS
              </Nav.Link>
              <Nav.Link as={Link} to="/employees" className="nav-link">
                EMPLOYEES
              </Nav.Link>
              <Nav.Link as={Link} to="/settings" className="nav-link">
                SETTINGS
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Routes>
        {/* <Route exact path="/" component={Home} /> */}
        <Route path="/divisions" element={<DivisionIndex />} />
        <Route path="/divisions/create" element={<CreateDivision />} />
        <Route path="/divisions/edit/:id" element={<EditDivision />} />
        <Route path="/job-titles/create" element={<CreateJobTitles />} />
        <Route path="/job-titles/:id" element={<JobTitleDetail />} />
        <Route path="/job-titles/edit/:id" element={<EditJobTitle />} />
        <Route path="/employees" element={<EmployeeIndex />} />
        <Route path="/employees/create" element={<CreateEmployee />} />
        <Route path="/employees/:id" element={<EmployeeDetail />} />
        <Route path="/employees/edit/:id" element={<EditEmployee />} />
        <Route path="/settings" element={<SettingIndex />} />
        <Route path="/settings/edit/:id" element={<EditSetting />} />
      </Routes>
    </div>
  );
}

export default App;
