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

function DivisionIndex() {
  const location = useLocation();
  const [divisions, setDivisions] = useState([]);
  const [message, setMessage] = useState(
    location.state ? location.state.msg : ""
  );

  useEffect(() => {
    fetchData();
  }, []);

  // To get all divisions data
  const fetchData = async () => {
    const response = await axios.get(`${API_GATEWAY}/divisions`);
    const data = await response.data.data;
    setDivisions(data);
  };

  // To Delete division data
  const deleteDivision = async (id) => {
    await axios.delete(`${API_GATEWAY}/divisions/${id}`);
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
                to="/divisions/create"
                variant="success"
                className="mb-3"
              >
                ADD DIVISION
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
                    <th>TITLE</th>
                    <th>DESCRIPTION</th>
                    <th>JOB TITLE(S)</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {divisions.map((division, index) => (
                    <tr key={division.id}>
                      <td>{index + 1}</td>
                      <td>{division.title}</td>
                      <td>{division.description}</td>
                      <td>
                        <ul>
                          {division.jobTitles.map((job, index) => (
                            <li key={job.id}>
                              <Link
                                to={{ pathname: `/job-titles/${job.id}` }}
                                state={{ divisionTitle: division.title }}
                              >
                                {job.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </td>
                      <td className="text-center">
                        <Link
                          to={{
                            pathname: `/job-titles/create`,
                          }}
                          state={{
                            divisionId: division.id,
                            divisionTitle: division.title,
                          }}
                        >
                          <Button variant="success" size="sm" className="me-2">
                            ADD JOB TITLE
                          </Button>
                        </Link>
                        <Button
                          as={Link}
                          to={`/divisions/edit/${division.id}`}
                          variant="primary"
                          size="sm"
                          className="me-2"
                        >
                          EDIT
                        </Button>
                        <Button
                          onClick={() => deleteDivision(division.id)}
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

export default DivisionIndex;
