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
import { useNavigate, useParams } from "react-router-dom";
const API_GATEWAY = process.env.REACT_APP_API_HOST;

function EditSetting() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");
  const [validation, setValidation] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getSettingById();
  }, []);

  const getSettingById = async () => {
    const response = await axios.get(`${API_GATEWAY}/settings/${id}`);
    const data = await response.data.data;
    setName(data.name);
    setDescription(data.description);
    setValue(JSON.parse(data.value).value);
  };

  const updateSetting = async (e) => {
    e.preventDefault();

    await axios
      .put(`${API_GATEWAY}/settings/${id}`, {
        value: `{"value":"${value}"}`,
      })
      .then(() => {
        navigate("/settings", {
          state: { msg: `${name} setting has been updated` },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col md="{12}">
          <Card className="border rounded shadow">
            <Card.Body>
              <Form onSubmit={updateSetting}>
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formHorizontalEmail"
                >
                  <Form.Label column sm={4}>
                    Update {name}
                  </Form.Label>
                  <Col sm={8}>
                    {name.toLowerCase().includes("clock") ? (
                      <Form.Control
                        className="text-center"
                        value={value}
                        type="time"
                        onChange={(e) => setValue(e.target.value)}
                      />
                    ) : (
                      <Form.Control
                        type="text"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder="Masukkan Title"
                      />
                    )}
                  </Col>
                </Form.Group>
                <Form.Group>
                  <Button variant="success" type="submit">
                    UPDATE
                  </Button>{" "}
                  <Button
                    onClick={() => navigate(`/settings`)}
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

export default EditSetting;
