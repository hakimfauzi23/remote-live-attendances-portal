import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  Container,
  Row,
  Col,
  Figure,
  Form,
  Button,
  Table,
  Spinner,
} from "react-bootstrap";
import EmployeeSelect from "../../components/EmployeeSelect";
import AttendanceModal from "../../components/AttendanceModal";
import axios from "axios";
const API_GATEWAY = process.env.REACT_APP_API_HOST;

function AttendanceForm() {
  const [employee_id, setEmployeeId] = useState("");
  const [employee, setEmployee] = useState({});
  const [position, setPosition] = useState("");
  const [spinner, setSpinner] = useState(false);
  const [geolocation, setGeolocation] = useState({});
  const [report, setReport] = useState("");
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    if (employee_id) {
      getEmployee();
    }
    locationCoord();
  }, [employee_id]);

  const getEmployee = async () => {
    const response = await axios.get(`${API_GATEWAY}/employees/${employee_id}`);
    const data = await response.data.data;
    setSpinner(true);
    setTimeout(() => {
      setSpinner(false);
      setEmployee(data);
      setPosition({
        jobTitles: data.jobTitles.title ?? "",
        division: data.jobTitles.division.title ?? "",
      });
    }, 1000);
  };

  const locationCoord = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setGeolocation({
          lat: position.coords.latitude,
          lgt: position.coords.longitude,
        });
      });
    } else {
      alert("geolocation is not supported");
    }
  };

  return (
    <section>
      <div className="container-fluid">
        <Container>
          <Card id="live-attendances-card">
            <Card.Header>
              <Link to={"/"}>Homepage</Link> / <b>Do Live Attendance</b>
            </Card.Header>
            <Card.Body>
              <Row>
                <EmployeeSelect stateChanger={setEmployeeId} />
              </Row>
              <Row className="mt-5">
                <Col md={5} className="mb-4">
                  <Card className="bg-primary shadow">
                    <Card.Header className="text-center">
                      <Card.Title className="text-white">ID CARD</Card.Title>
                    </Card.Header>
                    <Card.Body className="text-center">
                      {employee_id ? (
                        !spinner ? (
                          <Row>
                            <Figure>
                              <Figure.Image
                                className="border shadow"
                                roundedCircle
                                width={140}
                                height={120}
                                src={
                                  employee.avatar
                                    ? employee.avatar
                                    : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png"
                                }
                              />
                            </Figure>
                            <Card.Text className="text-white">
                              {employee.name ? employee.name : "Name"}-
                              {employee.id ? `ID${employee.id}` : "ID"}
                            </Card.Text>
                            <Card.Text className="text-white">
                              {position
                                ? `${position.division} Division`
                                : "Division"}
                              /{position ? `${position.jobTitles}` : "Role"}
                            </Card.Text>
                          </Row>
                        ) : (
                          <Spinner animation="grow" variant="info" />
                        )
                      ) : (
                        <Row>
                          <Figure>
                            <Figure.Image
                              className="border shadow"
                              roundedCircle
                              width={140}
                              height={120}
                              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png"
                            />
                          </Figure>
                          <Card.Text className="text-white">Name-ID</Card.Text>
                          <Card.Text className="text-white">
                            Division/Role
                          </Card.Text>
                        </Row>
                      )}
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4} className="mb-4">
                  <Card className="text-center">
                    <Card.Title>YOUR LOCATION</Card.Title>
                    <iframe
                      width="100%"
                      height="278px"
                      src={`https://maps.google.com/maps?q=${geolocation.lat},${geolocation.lgt}&output=embed`}
                      frameborder="0"
                    ></iframe>
                  </Card>
                </Col>
                <Col className="text-center">
                  <Card className="mb-4">
                    <Form>
                      <Form.Control
                        as="textarea"
                        rows={10}
                        placeholder={"input your report . . ."}
                        onChange={(e) => setReport(e.target.value)}
                      />
                    </Form>
                  </Card>
                  {employee_id ? (
                    <Button
                      className="shadow"
                      variant="success"
                      onClick={() => setModalShow(true)}
                    >
                      Do Live Attendance
                    </Button>
                  ) : (
                    ""
                  )}
                </Col>
              </Row>
            </Card.Body>
          </Card>

          <AttendanceModal
            show={modalShow}
            onHide={() => setModalShow(false)}
            data={{
              employee_id: employee_id,
              geolocation: geolocation,
              report: report,
            }}
          />
        </Container>
      </div>
    </section>
  );
}

export default AttendanceForm;
