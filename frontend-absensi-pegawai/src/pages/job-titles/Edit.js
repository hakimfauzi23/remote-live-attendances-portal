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
import Select from "react-select";
const API_GATEWAY = process.env.REACT_APP_API_HOST;

function EditJobTitle() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [divisionId, setDivisionId] = useState("");
  const [divisionData, setDivisionData] = useState([]);
  const [selectedOption, setSelectedOption] = useState({});
  const [validation, setValidation] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  // Always Run These Req
  useEffect(() => {
    getJobTitleById();
    getDivisions();
  }, []);

  // Get Job Detail Data
  const getJobTitleById = async () => {
    const response = await axios.get(`${API_GATEWAY}/job-titles/${id}`);
    const data = await response.data.data;
    setTitle(data.title);
    setDescription(data.description);
    setDivisionId(data.division.id);
    setSelectedOption({
      value: data.division.id,
      label: data.division.title,
    });
  };

  // REACT-SELECT FOR DIVISION SELECTION
  const getDivisions = async (e) => {
    const response = await axios.get(`${API_GATEWAY}/divisions`);
    const data = await response.data.data;
    setDivisionData(data);
  };
  const options = divisionData.map((item) => {
    return {
      value: item.id,
      label: item.title,
    };
  });

  // Update Job Data
  const updateJobTitle = async (e) => {
    e.preventDefault();

    await axios
      .put(`${API_GATEWAY}/job-titles/${id}`, {
        title: title,
        description: description,
        divisionId: divisionId,
      })
      .then(() => {
        navigate("/divisions", {
          state: { msg: `Job title : ${title} has been updated` },
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

              <Form onSubmit={updateJobTitle}>
                <Form.Group className="mb-3">
                  <Form.Label>DIVISION</Form.Label>
                  <Select
                    value={selectedOption}
                    options={options}
                    onChange={(e) => {
                      setSelectedOption(e);
                      setDivisionId(e.value);
                    }}
                  />
                </Form.Group>

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
                    onClick={() => navigate(`/divisions`)}
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

export default EditJobTitle;
