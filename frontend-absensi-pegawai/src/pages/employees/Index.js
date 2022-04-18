import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Table,
  Button,
  Row,
  Col,
  Container,
  Card,
  Alert,
} from "react-bootstrap";
import axios from "axios";
const API_GATEWAY = process.env.REACT_APP_API_HOST;

function EmployeeIndex() {
  const location = useLocation();
  const [employees, setEmployees] = useState([]);
  const [jobTitle, setJobTitle] = useState("");
  const [message, setMessage] = useState(
    location.state ? location.state.msg : ""
  );

  useEffect(() => {
    fetchData();
  }, []);

  // To get all employees data
  const fetchData = async () => {
    const response = await axios.get(`${API_GATEWAY}/employees`);
    const data = await response.data.data;
    setEmployees(data);
  };

  const deleteEmployee = async (id) => {
    await axios.delete(`${API_GATEWAY}/employees/${id}`);
    setMessage(`Employee with ID: ${id} has been deleted`);
    fetchData();
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col md="{12}">
          <Card className="rounded shadow">
            <Card.Body>
              <Button
                as={Link}
                to="/employees/create"
                variant="success"
                className="mb-3"
              >
                ADD EMPLOYEE
              </Button>
              {message && (
                <Alert
                  variant="success"
                  onClose={() => setMessage("")}
                  dismissible
                >{`${message}`}</Alert>
              )}
              <Table striped bordered hover className="mb-1">
                <thead>
                  <tr>
                    <th>NO.</th>
                    <th>NAME</th>
                    <th>JOB TITLE</th>
                    <th>EMAIL</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((employee, index) => (
                    <tr key={employee.id}>
                      <td>{index + 1}</td>
                      <td>{employee.name}</td>
                      <td>{employee.jobTitles.title}</td>
                      <td>{employee.email}</td>
                      <td className="text-center">
                        <Button
                          as={Link}
                          to={`/employees/${employee.id}`}
                          variant="success"
                          size="sm"
                          className="me-2"
                        >
                          DETAILS
                        </Button>
                        <Button
                          as={Link}
                          to={`/employees/edit/${employee.id}`}
                          variant="primary"
                          size="sm"
                          className="me-2"
                        >
                          EDIT
                        </Button>
                        <Button
                          onClick={() => deleteEmployee(employee.id)}
                          variant="danger"
                          size="sm"
                        >
                          DELETE
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default EmployeeIndex;
