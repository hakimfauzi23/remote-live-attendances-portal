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
import { Link, useParams, useNavigate } from "react-router-dom";
import Select from "react-select";
const API_GATEWAY = process.env.REACT_APP_API_HOST;

function EditEmployee() {
  const [message, setMessage] = useState("");
  const [validation, setValidation] = useState({});
  const [jobTitles, setJobTitles] = useState([]);
  const [divisions, setDivisions] = useState([]);
  const [divisionId, setDivisionId] = useState("");
  const [jobTitleId, setJobTitleId] = useState("");
  const [selectedOption, setSelectedOption] = useState({});

  const [employeeData, setEmployeeData] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getJobTitles();
    getDivisions();
    getEmployeeById();
  }, []);

  const getJobTitles = async () => {
    const response = await axios.get(`${API_GATEWAY}/job-titles`);
    const data = await response.data.data;
    setJobTitles(data);
  };

  const getDivisions = async () => {
    const response = await axios.get(`${API_GATEWAY}/divisions`);
    const data = await response.data.data;
    setDivisions(data);
  };

  const getEmployeeById = async () => {
    const response = await axios.get(`${API_GATEWAY}/employees/${id}`);
    const data = await response.data.data;
    setEmployeeData(data);
    setSelectedOption({
      label: data.jobTitles.title,
      value: data.jobTitles.id,
    });
  };

  const options = divisions.map((item) => {
    const jobs = jobTitles.filter((e) => e.division.id == item.id);
    return {
      id: `${item.id}`,
      label: `${item.title} Division`,
      options: jobs.map((job) => {
        return { value: job.id, label: job.title };
      }),
    };
  });

  const updateEmployee = async (e, res) => {
    e.preventDefault();
    await axios
      .put(`${API_GATEWAY}/employees/${id}`, {
        name: employeeData.name,
        address: employeeData.address,
        pob: employeeData.pob,
        dob: employeeData.dob,
        email: employeeData.email,
        phone_number: employeeData.phone_number,
        jobTitleId: employeeData.jobTitleId,
      })
      .then((res, req) => {
        navigate(`/employees`, {
          state: {
            msg: `Employee : ${employeeData.name} data has been updated`,
          },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // On Change Handel Function
  function handleChange(e) {
    const value = e.target.value;
    setEmployeeData({
      ...employeeData,
      [e.target.name]: value,
    });
  }
  // JOB TITLE SELECT HANDLER

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
              <Form onSubmit={updateEmployee}>
                <Row>
                  <Form.Group className="mb-3">
                    <Form.Label>NAME</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={employeeData.name}
                      onChange={handleChange}
                      placeholder="Input Employee Name . . ."
                    />
                  </Form.Group>
                </Row>
                <Row>
                  <Col md={"3"}>
                    <Form.Group className="mb-3">
                      <Form.Label>Place Of Birth</Form.Label>
                      <Form.Control
                        type="text"
                        name="pob"
                        value={employeeData.pob}
                        onChange={handleChange}
                        placeholder="Input Employee Place of Birth (Town, state, etc) . . ."
                      />
                    </Form.Group>
                  </Col>
                  <Col md={"3"}>
                    <Form.Group className="mb-3">
                      <Form.Label>Date Of Birth</Form.Label>
                      <Form.Control
                        type="date"
                        name="dob"
                        value={employeeData.dob}
                        onChange={handleChange}
                        placeholder="Input New Title Desc"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={"6"}>
                    <Form.Group className="mb-3">
                      <Form.Label>ADDRESS</Form.Label>
                      <Form.Control
                        as="textarea"
                        name="address"
                        rows={3}
                        value={employeeData.address}
                        onChange={handleChange}
                        placeholder="Input Employee Adress . . ."
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={"4"}>
                    <Form.Group className="mb-3">
                      <Form.Label>EMAIL</Form.Label>
                      <Form.Control
                        type="text"
                        name="email"
                        value={employeeData.email}
                        onChange={handleChange}
                        placeholder="Input Employee Email . . ."
                      />
                    </Form.Group>
                  </Col>
                  <Col md={"4"}>
                    <Form.Group className="mb-3">
                      <Form.Label>PHONE NUMBER</Form.Label>
                      <Form.Control
                        type="text"
                        name="phone_number"
                        value={employeeData.phone_number}
                        onChange={handleChange}
                        placeholder="Input Employee Phone Number . . ."
                      />
                    </Form.Group>
                  </Col>
                  <Col md={"4"}>
                    <Form.Group className="mb-3">
                      <Form.Label>JOB TITLE</Form.Label>
                      <Select
                        value={selectedOption}
                        options={options}
                        name="jobTitleId"
                        onChange={(e) => {
                          setSelectedOption(e);
                          setEmployeeData({
                            ...employeeData,
                            jobTitleId: e.value,
                          });
                        }}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group>
                  <Button variant="success" type="submit">
                    SAVE
                  </Button>{" "}
                  <Button
                    as={Link}
                    to="/employees"
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

export default EditEmployee;
