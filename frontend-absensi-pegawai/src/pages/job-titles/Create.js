import { useState } from "react";
import {
  Card,
  Container,
  Row,
  Col,
  Form,
  Button,
  Alert,
} from "react-bootstrap";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
const API_GATEWAY = process.env.REACT_APP_API_HOST;

function CreateJobTitles(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [validation, setValidation] = useState({});
  const [divisionId, setDivisionId] = useState(
    location.state ? location.state.divisionId : ""
  );
  const [divisionTitle, setDivisionTitle] = useState(
    location.state ? location.state.divisionTitle : ""
  );

  const storeJobTitle = async (e) => {
    e.preventDefault();

    await axios
      .post(`${API_GATEWAY}/job-titles`, {
        title: title,
        description: description,
        divisionId: divisionId,
      })
      .then((res, req) => {
        navigate("/divisions", {
          state: {
            msg: `${title} has been added in ${divisionTitle} Division`,
          },
        });
      })
      .catch((err) => {
        setValidation(err.response.data);
      });
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col md="{12}">
          <Card className="border-0 rounded shadow">
            <Card.Body>
              {validation.errors && (
                <Alert variant="danger">
                  <ul class="mt-0 mb-0">
                    {validation.errors.map((error, index) => (
                      <li key={index}>{`${error.param} : ${error.msg}`}</li>
                    ))}
                  </ul>
                </Alert>
              )}
              <Form onSubmit={storeJobTitle}>
                <Form.Group className="mb-3">
                  <Form.Label>DIVISION</Form.Label>
                  <Form.Control
                    type="text"
                    value={divisionTitle}
                    onChange={(e) => setTitle(e.target.value)}
                    disabled
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>TITLE</Form.Label>
                  <Form.Control
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Input New Job Titles . . ."
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>DESCRIPTION</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Input New Job Title Description . . ."
                  />
                </Form.Group>
                <Form.Group>
                  <Button variant="success" type="submit">
                    SAVE
                  </Button>{" "}
                  <Button
                    as={Link}
                    to="/divisions"
                    variant="secondary"
                    type="submit"
                  >
                    BACK
                  </Button>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default CreateJobTitles;
