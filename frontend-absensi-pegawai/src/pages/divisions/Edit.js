import { useState, useEffect } from "react";
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
import { useNavigate, useParams, Link } from "react-router-dom";
const API_GATEWAY = process.env.REACT_APP_API_HOST;

function EditDivision() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [validation, setValidation] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getDivisionById();
  }, []);

  const getDivisionById = async () => {
    const response = await axios.get(`${API_GATEWAY}/divisions/${id}`);
    const data = await response.data.data;
    setTitle(data.title);
    setDescription(data.description);
  };

  const updateDivision = async (e) => {
    e.preventDefault();

    await axios
      .put(`${API_GATEWAY}/divisions/${id}`, {
        title: title,
        description: description,
      })
      .then(() => {
        navigate("/divisions", {
          state: { msg: `Division has been updated` },
        });
      })
      .catch((err) => {
        // setValidation(err);
        console.log(err);
      });
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col md="{12}">
          <Card className="border rounded shadow">
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

              <Form onSubmit={updateDivision}>
                <Form.Group className="mb-3">
                  <Form.Label>TITLE</Form.Label>
                  <Form.Control
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Masukkan Title"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>DESCRIPTION</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Masukkan Description"
                  />
                </Form.Group>

                <Form.Group>
                  <Button variant="success" type="submit">
                    UPDATE
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

export default EditDivision;
