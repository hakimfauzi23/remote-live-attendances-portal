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

function SettingIndex() {
  const location = useLocation();
  const [message, setMessage] = useState(
    location.state ? location.state.msg : ""
  );
  const [settings, setSettings] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  // To get all settings data
  const fetchData = async () => {
    const response = await axios.get(`${API_GATEWAY}/settings`);
    const data = await response.data.data;
    data.map((e) => (e.value = JSON.parse(e.value).value));
    setSettings(data);
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col md="{12}">
          <Card className="rounded shadow">
            <Card.Body>
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
                    <th>NAME</th>
                    <th>DESCRIPTION</th>
                    <th>VALUE</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {settings.map((setting, index) => (
                    <tr key={setting.id}>
                      <td>{index + 1}</td>
                      <td>{setting.name}</td>
                      <td>{setting.description}</td>
                      <td>{setting.value}</td>
                      <td className="text-center">
                        <Button
                          as={Link}
                          to={`/settings/edit/${setting.id}`}
                          variant="primary"
                          size="sm"
                          className="me-2"
                        >
                          EDIT
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

export default SettingIndex;
