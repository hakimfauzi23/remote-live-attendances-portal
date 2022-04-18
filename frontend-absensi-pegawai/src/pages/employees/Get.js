import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Card,
  Alert,
  Col,
  Row,
  Button,
  Figure,
  Table,
} from "react-bootstrap";
import axios from "axios";
const API_GATEWAY = process.env.REACT_APP_API_HOST;

function EmployeeDetail() {
  const [employee, setEmployee] = useState({});
  const [division, setDivision] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const { id } = useParams();

  useEffect(() => {
    getEmployeeByID();
  }, []);

  const getEmployeeByID = async () => {
    const response = await axios.get(`${API_GATEWAY}/employees/${id}`);
    const data = await response.data.data;
    setDivision(data.jobTitles.division.title);
    setJobTitle(data.jobTitles.title);
    setEmployee(data);
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col md="{12}">
          <Card className="rounded shadow">
            <Card.Body className="mx-5 my-3">
              <Row className="align-items-center">
                <Col className="text-center">
                  <Figure.Image
                    roundedCircle
                    width={175}
                    height={175}
                    src="https://eitrawmaterials.eu/wp-content/uploads/2016/09/person-icon.png"
                  />
                </Col>
                <Col md={9}>
                  <Table responsive className="text-center">
                    <tbody>
                      <tr>
                        <td>Name</td>
                        <td>:</td>
                        <td>{employee.name}</td>
                      </tr>
                      <tr>
                        <td>Division / Job Title</td>
                        <td>:</td>
                        <td>{`${division} / ${jobTitle}`}</td>
                      </tr>
                      <tr>
                        <td>Birthday</td>
                        <td>:</td>
                        <td>{`${employee.pob}, ${employee.dob}`}</td>
                      </tr>
                      <tr>
                        <td>Email</td>
                        <td>:</td>
                        <td>{employee.email}</td>
                      </tr>
                      <tr>
                        <td>Phone Number</td>
                        <td>:</td>
                        <td>{employee.phone_number}</td>
                      </tr>
                      <tr>
                        <td>Adresses</td>
                        <td>:</td>
                        <td>{employee.address}</td>
                      </tr>
                    </tbody>
                  </Table>
                </Col>
              </Row>
              <Row>
                <Col className="mt-4"></Col>
              </Row>
              <Row className="mt-3 text-center">
                <Col>
                  <Button
                    as={Link}
                    to={`/employees`}
                    variant="secondary"
                    size="sm"
                    className="me-2"
                  >
                    BACK
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default EmployeeDetail;
