import { Component } from "react";
import { Modal, Button } from "react-bootstrap";

import check from "../../../images/checkmark.png";
import cross from "../../../images/crossmark.png";

import "./StudentFound.scss";

class StudentFound extends Component {
  calculatePercentageOfGoal = (total, goal) => {
    let percentage = total / goal;
    percentage *= 100;
    return percentage.toFixed(0);
  };

  percentColor = (currentTotal, goal) => {
    let percentage = currentTotal / goal;
    percentage *= 100;

    if (percentage >= 100) {
      return "goalReached";
    } else if (percentage >= 50 && percentage < 100) {
      return "halfway";
    } else if (percentage < 50) {
      return "underGoal";
    }
  };

  render() {
    const {
      isOpen,
      closeModal,
      studentFound,
      checkGraduationStatus,
      convertDOB,
    } = this.props;

    return (
      <>
        {studentFound ? (
          <Modal show={isOpen} onHide={closeModal}>
            <img
              src={studentFound.profilePhoto}
              alt={studentFound.names.preferredName}
            />
            <p
              className={checkGraduationStatus(studentFound)}
              id="onTrackModal"
            >
              On Track to Graduate
            </p>
            <Modal.Header id="modalHeader">
              <Modal.Title>
                {studentFound.names.preferredName}{" "}
                {studentFound.names.middleName} {studentFound.names.surname}
                <div>{studentFound.username}</div>
                <strong id="modalDOB">Birthday: </strong>
                {convertDOB(studentFound.dob)}
              </Modal.Title>
            </Modal.Header>

            <Modal.Body id="modalBody">
              <section className="showMoreSection">
                <section className="ShowMoreInfo">
                  <section className="codewars">
                    <strong>Codewars: </strong>
                    <br />
                    <br />
                    <p>
                      <strong className="grades">Current Total: </strong>
                      {studentFound.codewars.current.total}
                    </p>
                    <p>
                      <strong className="grades">Last Week: </strong>
                      {studentFound.codewars.current.lastWeek}
                    </p>
                    <p>
                      <strong className="grades">Goal: </strong>
                      {studentFound.codewars.goal.total}
                    </p>
                    <p
                      className={this.percentColor(
                        studentFound.codewars.current.total,
                        studentFound.codewars.goal.total
                      )}
                    >
                      <strong className="grades">
                        Percent of Goal Achieved:{" "}
                      </strong>
                      {this.calculatePercentageOfGoal(
                        studentFound.codewars.current.total,
                        studentFound.codewars.goal.total
                      )}
                      %
                    </p>
                  </section>
                  <section className="scores">
                    <strong>Scores: </strong>
                    <br />
                    <br />
                    <p>
                      <strong className="grades">Assessments: </strong>
                      {studentFound.cohort.scores.assessments * 100}%
                    </p>
                    <p>
                      <strong className="grades">Assignments: </strong>
                      {studentFound.cohort.scores.assignments * 100}%
                    </p>
                    <p>
                      <strong className="grades">Projects: </strong>
                      {studentFound.cohort.scores.projects * 100}%
                    </p>
                  </section>
                  <section className="certifications">
                    <strong>Certifications: </strong>
                    <br />
                    <br />
                    <p>
                      <strong className="grades">GitHub: </strong>
                      {studentFound.certifications.github ? (
                        <img src={check} alt="checkmark"></img>
                      ) : (
                        <img src={cross} alt="crossmark"></img>
                      )}
                    </p>
                    <p>
                      <strong className="grades">LinkedIn: </strong>
                      {studentFound.certifications.linkedin ? (
                        <img src={check} alt="checkmark"></img>
                      ) : (
                        <img src={cross} alt="crossmark"></img>
                      )}
                    </p>
                    <p>
                      <strong className="grades">Mock Interview: </strong>
                      {studentFound.certifications.mockInterview ? (
                        <img src={check} alt="checkmark"></img>
                      ) : (
                        <img src={cross} alt="crossmark"></img>
                      )}
                    </p>
                    <p>
                      <strong className="grades">Resume: </strong>
                      {studentFound.certifications.resume ? (
                        <img src={check} alt="checkmark"></img>
                      ) : (
                        <img src={cross} alt="crossmark"></img>
                      )}
                    </p>
                  </section>
                </section>
              </section>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={closeModal}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        ) : null}
      </>
    );
  }
}

export default StudentFound;
