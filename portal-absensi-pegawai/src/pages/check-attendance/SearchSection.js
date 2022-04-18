import { useState } from "react";
import {
  Card,
  Container,
  Row,
  Col,
  Form,
  Button,
  Table,
  Spinner,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import Select from "react-select";
import { Pagination } from "react-bootstrap";
import EmployeeSelect from "../../components/EmployeeSelect";
const API_GATEWAY = process.env.REACT_APP_API_HOST;

function SearchSection() {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let monthsOptions = months.map((month, index) => {
    return {
      value: index + 1,
      label: month,
    };
  });
  const d = new Date();

  // States
  const [selectedMonth, setSelectedMonth] = useState({
    value: d.getMonth() + 1,
    label: months[d.getMonth()],
  });
  const [selectedYear, setSelectedYear] = useState(`${d.getFullYear()}`);
  const [employee_id, setEmployeeId] = useState("");
  const [absences, setAbsences] = useState([]);
  const [rawResp, setRawResp] = useState({});
  const [spinner, setSpinner] = useState(false);

  // Get Absences Data
  const getAbsences = async (e) => {
    if (e.type === "submit") {
      e.preventDefault();
    }
    const response = await axios.get(`${API_GATEWAY}/absences/employee`, {
      params: {
        year: selectedYear,
        employee_id: employee_id,
        month: selectedMonth.value,
        size: 7,
        page: typeof e == "number" ? e : 0,
      },
    });
    const resp = await response.data;
    setSpinner(true);
    setTimeout(function () {
      const data = resp.absences;
      setRawResp(resp);
      setAbsences(data);
      setSpinner(false);
    }, 1000);
  };

  // Pagination
  let active = rawResp.currentPage;
  let items = [];
  for (let number = 0; number < rawResp.totalPages; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === active}
        onClick={(e) => getAbsences(number)}
      >
        {number + 1}
      </Pagination.Item>
    );
  }
  return (
    <section>
      <div className="container-fluid">
        <Container>
          <Card id="attendances-card">
            <Card.Header>
              <Link to={"/"}>Homepage</Link> / <b>Check Attendances</b>
            </Card.Header>
            <Card.Body className="mx-5">
              <Row>
                <Form onSubmit={getAbsences}>
                  <Row>
                    <Col md={"1"}></Col>
                    <Col md={"5"}>
                      <EmployeeSelect stateChanger={setEmployeeId} />
                    </Col>
                    <Col md={"2"}>
                      <Select
                        className="select-font"
                        value={selectedMonth}
                        options={monthsOptions}
                        placeholder="select month . . ."
                        onChange={(e) => setSelectedMonth(e)}
                      />
                    </Col>
                    <Col md={"2"}>
                      <Form.Control
                        type="text"
                        placeholder="Input Year"
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)}
                      />
                    </Col>
                    <Col md={"2"}>
                      <Button type="submit"> Submit</Button>
                    </Col>
                  </Row>
                </Form>
              </Row>
              <Row className="mt-5"></Row>
              <Row>
                <Table striped bordered hover responsive>
                  <thead className="text-center">
                    <tr>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Report</th>
                      <th>Location</th>
                    </tr>
                  </thead>
                  <tbody className="text-center">
                    {absences.length !== 0 ? (
                      spinner ? (
                        <tr>
                          <td colSpan={5}>
                            <Spinner animation="grow" variant="info" />
                          </td>
                        </tr>
                      ) : (
                        absences.map((data, index) => (
                          <tr key={data.id}>
                            <td>{data.date}</td>
                            <td>
                              {data.clock_in} - {data.clock_out}
                            </td>
                            <td>{data.report} </td>
                            <td>
                              <a
                                target="_blank"
                                rel="noreferrer"
                                href={`https://maps.google.com/?q=${data.loc_in}`}
                              >
                                Clock In
                              </a>
                              {` | `}
                              {data.loc_out ? (
                                <a
                                  target="_blank"
                                  rel="noreferrer"
                                  href={`https://maps.google.com/?q=${data.loc_out}`}
                                >
                                  Clock Out
                                </a>
                              ) : (
                                "Location Not Found"
                              )}
                            </td>
                          </tr>
                        ))
                      )
                    ) : (
                      <tr>
                        <td colSpan={5}>
                          {spinner ? (
                            <Spinner animation="grow" variant="info" />
                          ) : (
                            "No Records Yet."
                          )}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </Row>
              <Row>
                <Col>
                  <Pagination>{items}</Pagination>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Container>
      </div>
    </section>
  );
}

export default SearchSection;
