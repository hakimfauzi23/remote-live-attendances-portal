//import component Bootstrap React
import { Card, Container, Row, Col} from "react-bootstrap";
import { Link } from "react-router-dom";
import { FcSurvey, FcAlarmClock } from "react-icons/fc";

function Home() {
  return (
    <section>
      <div className="container-fluid">
        <Container>
          <Row className="text-center mb-5">
            <div className="hero-title">
              <h1 className="text-white">WORK FROM ANYWHERE</h1>
              <h2 className="text-white">ATTENDANCES PORTAL</h2>
            </div>
          </Row>
          <Row>
            <Col md={"2"}></Col>
            <Col
              md={"4"}
              as={Link}
              to="/check-attendance"
              style={{ textDecoration: "none" }}
            >
              <Card className="option card_red text-center">
                <div className="title">
                  <FcSurvey size={75} />
                  <h2>Check Attendance</h2>
                </div>
              </Card>
            </Col>
            <Col
              md={"4"}
              as={Link}
              to="/do-live-attendance"
              style={{ textDecoration: "none" }}
            >
              <Card className="option card_three text-center">
                <div className="title">
                  <FcAlarmClock size={75} />
                  <h2>Do Live Attendance</h2>
                </div>
              </Card>
            </Col>
            <Col md={"2"}></Col>
          </Row>
        </Container>
      </div>
    </section>
  );
}

export default Home;
