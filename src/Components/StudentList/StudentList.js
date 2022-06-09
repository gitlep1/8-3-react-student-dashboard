import "./StudentList.scss";

import { Component } from "react";
import moment from "moment";

import { Button, Form } from "react-bootstrap";

import ShowMore from "./ShowMore";

import StudentFound from "./SearchStudents/StudentFound";

class StudentList extends Component {
  constructor() {
    super();
    this.state = {
      searchbox: "",
      isOpen: false,
      studentFound: null,
    };
  }

  checkGraduationStatus = (students) => {
    if (
      students.certifications.github &&
      students.certifications.linkedin &&
      students.certifications.mockInterview &&
      students.certifications.resume &&
      students.codewars.current.total > 600
    ) {
      return "success";
    } else {
      return "failure";
    }
  };

  renderStudentsAndTotal = () => {
    const { studentData, cohortCode } = this.props;

    let totalStudents = 0;
    let keyNum = 0;

    const students = studentData.map((students) => {
      let middleInitial = students.names.middleName.charAt(0).toUpperCase();
      students.comments = [];

      if (cohortCode === "All Students") {
        totalStudents++;

        return (
          <article key={keyNum++} className="studentCard">
            <img
              className="studentPhoto"
              src={students.profilePhoto}
              alt="studentPhoto"
            />
            <div id="onTrack" className={this.checkGraduationStatus(students)}>
              On Track to Graduate
            </div>
            <section className="studentInfo">
              <p className="studentName">
                <strong>
                  {students.names.preferredName} {middleInitial}.{" "}
                  {students.names.surname}
                </strong>
              </p>
              <p className="studentUsername">{students.username}</p>
              <p className="studentDOB">
                <strong className="DOB">Birthday: </strong>
                {this.convertDOB(students.dob)}
              </p>
            </section>
            <ShowMore students={students} cohortCode={cohortCode} />
          </article>
        );
      } else if (students.cohort.cohortCode === cohortCode) {
        totalStudents++;

        return (
          <article key={keyNum++} className="studentCard">
            <img
              className="studentPhoto"
              src={students.profilePhoto}
              alt="studentPhoto"
            />
            <div id="onTrack" className={this.checkGraduationStatus(students)}>
              On Track to Graduate
            </div>
            <section className="studentInfo">
              <p className="studentName">
                <strong>
                  {students.names.preferredName} {middleInitial}.{" "}
                  {students.names.surname}
                </strong>
              </p>
              <p className="studentUsername">{students.username}</p>
              <p className="studentDOB">
                <strong className="DOB">Birthday: </strong>
                {this.convertDOB(students.dob)}
              </p>
            </section>
            <ShowMore students={students} />
          </article>
        );
      }

      return null;
    });

    return (
      <>
        Total Students: <strong id="studentCount">{totalStudents}</strong>
        <div>
          <Form id="searchBox" onSubmit={this.handleSubmit}>
            <Form.Group className="mb-3" controlId="searchbox">
              <Form.Control
                type="text"
                name="searchbox"
                value={this.state.searchbox}
                onChange={this.handleChange}
                placeholder="Type a name"
              ></Form.Control>
            </Form.Group>
            <Button id="searchButton" type="submit" variant="dark">
              SEARCH
            </Button>
          </Form>
        </div>
        <section className="StudentList">{students}</section>
      </>
    );
  };

  convertDOB = (dob) => {
    const date = new Date(dob);
    const dateFormatted = moment(date).format("MMMM D, Y");
    return dateFormatted;
  };

  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    this.searchStudents(this.props.studentData);
  };

  searchStudents = (students) => {
    const { searchbox } = this.state;

    students.map((student) => {
      let middleInitial = student.names.middleName.charAt(0).toUpperCase();

      if (
        student.names.preferredName.toLowerCase() === searchbox.toLowerCase() ||
        student.names.middleName.toLowerCase() === searchbox.toLowerCase() ||
        student.names.surname.toLowerCase() === searchbox.toLowerCase() ||
        middleInitial.toLowerCase() === searchbox.toLowerCase()
      ) {
        return this.setState({
          studentFound: student,
        });
      }
      return this.state.studentFound;
    });

    this.openModal();
  };

  openModal = () => {
    this.setState({
      isOpen: true,
    });
  };

  closeModal = () => {
    this.setState({
      isOpen: false,
      searchbox: "",
    });
  };

  render() {
    const { cohortCode } = this.props;
    let readable = cohortCode.split(/([0-9]+)/).join(" ");

    return (
      <section className="studentListSection">
        <h1>{readable}</h1>
        {this.renderStudentsAndTotal()}
        <StudentFound
          studentFound={this.state.studentFound}
          isOpen={this.state.isOpen}
          closeModal={this.closeModal}
          checkGraduationStatus={this.checkGraduationStatus}
          convertDOB={this.convertDOB}
        />
      </section>
    );
  }
}

export default StudentList;
