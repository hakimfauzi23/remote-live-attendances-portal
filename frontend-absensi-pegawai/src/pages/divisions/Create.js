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
import { Link } from "react-router-dom";
const API_GATEWAY = process.env.REACT_APP_API_HOST;

function CreateDivision() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [validation, setValidation] = useState({});
  const storeDivision = async (e, res) => {
    e.preventDefault();

    await axios
      .post(`${API_GATEWAY}/divisions`, {
        title: title,
        description: description,
      })
      .then((res, req) => {
        console.log(res);
        setTitle("");
        setDescription("");
        setMessage(
          `Division : ${res.data.data.title} has been added with ID : ${res.data.data.id}`
        );
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
              {message && (
                <Alert
                  variant="success"
                  onClose={() => setMessage("")}
                  dismissible
                >{`${message}`}</Alert>
              )}

              <Form onSubmit={storeDivision}>
                <Form.Group className="mb-3">
                  <Form.Label>TITLE</Form.Label>
                  <Form.Control
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Input New Title Division"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>DESCRIPTION</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Input New Title Desc"
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

export default CreateDivision;
