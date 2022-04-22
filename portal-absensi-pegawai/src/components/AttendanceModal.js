import React, { useState, useEffect } from "react";
import {
  Card,
  Container,
  Row,
  Col,
  Modal,
  Button,
  Spinner,
} from "react-bootstrap";
import axios from "axios";
const API_GATEWAY = process.env.REACT_APP_API_HOST;

function AttendanceModal(props) {
  const today = new Date();
  const currTime = today.toLocaleString("en-ZA", {
    timeZone: "Asia/Jakarta",
    hour12: false,
  });

  const currDate = currTime.split(", ")[0].split("/").join("-");
  const currClock = currTime.split(", ")[1];
  const currLoc = `${props.data.geolocation.lat},${props.data.geolocation.lgt}`;

  const [spinner, setSpinner] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [option, setOption] = useState("");
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [isClockedOut, setIsClockedOut] = useState(false);

  useEffect(() => {
    if (props.data.employee_id) {
      clockInCheck();
      clockOutCheck();
    }
  }, [props.data.employee_id]);

  // Check Clock In
  const clockInCheck = async () => {
    const response = await axios.get(
      `${API_GATEWAY}/absences/check-attendances`,
      {
        params: {
          type: 1,
          employee_id: props.data.employee_id,
          date: currDate,
        },
      }
    );

    const resp = await response.data.data;
    if (resp) {
      setIsClockedIn(true);
    } else {
      setIsClockedIn(false);
    }
  };

  // Check Clock Out
  const clockOutCheck = async () => {
    const response = await axios.get(
      `${API_GATEWAY}/absences/check-attendances`,
      {
        params: {
          type: 2,
          employee_id: props.data.employee_id,
          date: currDate,
        },
      }
    );

    const resp = await response.data.data;
    if (resp) {
      setIsClockedOut(true);
    } else {
      setIsClockedOut(false);
    }
  };

  console.log([isClockedIn, isClockedOut]);
  // Clock In
  const clockIn = async () => {
    setSpinner(true);
    await axios
      .post(`${API_GATEWAY}/absences/clock-in`, {
        employee_id: props.data.employee_id,
        date: currDate,
        clock_in: currClock,
        loc_in: currLoc,
        report: props.data.report,
      })
      .then((res, req) => {
        setTimeout(() => {
          setIsSuccess(true);
          setOption("Clock In");
          setSpinner(false);
        }, 1000);
      });
    clockInCheck();
  };

  // Clock Out
  const clockOut = async () => {
    setSpinner(true);
    await axios
      .put(`${API_GATEWAY}/absences/clock-out`, {
        employee_id: props.data.employee_id,
        date: currDate,
        clock_out: currClock,
        loc_out: currLoc,
        report: props.data.report,
      })
      .then((res, req) => {
        setTimeout(() => {
          setIsSuccess(true);
          setOption("Clock Out");
          setSpinner(false);
        }, 1000);
      });
    clockOutCheck();
  };

  function resetState() {
    setIsSuccess(false);
    setOption("");
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Attendances Options
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className="text-center">
          <p>
            &#128712; If location is not accurate please turn on your GPS and
            refresh the browser.
          </p>
        </Row>
        <Row>
          {!isSuccess ? (
            !spinner ? (
              <Col xs={12}>
                <div class="text-center">
                  {isClockedIn ? (
                    <Button
                      size="lg"
                      variant="danger"
                      onClick={clockIn}
                      disabled
                    >
                      Clocked In!
                    </Button>
                  ) : (
                    <Button size="lg" variant="success" onClick={clockIn}>
                      Clock In
                    </Button>
                  )}{" "}
                  {isClockedOut ? (
                    <Button
                      size="lg"
                      variant="danger"
                      onClick={clockOut}
                      disabled
                    >
                      Clocked Out!
                    </Button>
                  ) : (
                    <Button size="lg" variant="primary" onClick={clockOut}>
                      Clock Out
                    </Button>
                  )}
                </div>
              </Col>
            ) : (
              <Col className="text-center">
                <Spinner animation="grow" variant="primary" />
              </Col>
            )
          ) : (
            <Col className="text-center">
              <h4>{`You Have ${option} Successfully`} </h4>
            </Col>
          )}
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => {
            props.onHide();
            resetState();
          }}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AttendanceModal;
