import { useState, useEffect } from "react";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Card,
  Alert,
  Col,
  Row,
  Button,
  Table,
} from "react-bootstrap";
import axios from "axios";
const API_GATEWAY = process.env.REACT_APP_API_HOST;

function JobTitleDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const [divisionTitle, setDivisionTitle] = useState(
    location.state ? location.state.divisionTitle : ""
  );
  const [jobId, setJobId] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const { id } = useParams();

  useEffect(() => {
    getJobTitleByID();
  }, []);

  const getJobTitleByID = async () => {
    const response = await axios.get(`${API_GATEWAY}/job-titles/${id}`);
    const data = await response.data.data;
    setJobId(data.id);
    setJobTitle(data.title);
    setJobDescription(data.description);
  };

  const deleteJob = async (id) => {
    await axios
      .delete(`${API_GATEWAY}/job-titles/${id}`)
      .then(() => {
        navigate("/divisions", {
          state: {
            msg: `Job Title : ${jobTitle} from Division: ${divisionTitle}  has been deleted `,
          },
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
          <Card className="rounded shadow">
            <Card.Body className="mx-5 my-3">
              <Table responsive>
                <tbody>
                  <tr>
                    <td>Job Title</td>
                    <td className="col-md-2">:</td>
                    <td>{jobTitle}</td>
                  </tr>
                  <tr>
                    <td>Division</td>
                    <td>:</td>
                    <td>{divisionTitle}</td>
                  </tr>
                  <tr>
                    <td>Job Description</td>
                    <td>:</td>
                    <td>{jobDescription}</td>
                  </tr>
                </tbody>
              </Table>
              <Row className="mt-3">
                <Col>
                  <Button
                    as={Link}
                    to={`/job-titles/edit/${jobId}`}
                    variant="primary"
                    size="sm"
                    className="me-2"
                  >
                    EDIT
                  </Button>
                  <Button
                    onClick={() => deleteJob(jobId)}
                    variant="danger"
                    size="sm"
                    className="me-2"
                  >
                    DELETE
                  </Button>
                  <Button
                    as={Link}
                    to={`/divisions`}
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

export default JobTitleDetail;
