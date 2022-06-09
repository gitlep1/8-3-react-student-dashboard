import { Component } from "react";
import { Button, Form } from "react-bootstrap";

import check from "../../images/checkmark.png";
import cross from "../../images/crossmark.png";

import "./ShowMore.scss";
import "../OneOnOne/OneOnOne.scss";

class ShowMore extends Component {
  constructor() {
    super();
    this.state = {
      showMore: false,
      commenterName: "",
      comment: "",
      commentArr: [],
      commentDatabase: {},
    };
  }

  showInfo = () => {
    this.setState({
      showMore: !this.state.showMore,
    });

    // this.checkIfShowing();
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

  calculatePercentageOfGoal = (total, goal) => {
    let percentage = total / goal;
    percentage *= 100;
    return percentage.toFixed(0);
  };

  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { students } = this.props;

    // const commentArrCopy = [...this.state.commentArr];
    const commentArrCopy = [...students.comments];
    const { commentArr, commentDatabase } = this.state;

    students.comments = commentArr;
    commentDatabase[students.id] = students.comments;

    commentArrCopy.push({
      commenterName: this.state.commenterName,
      comment: this.state.comment,
    });

    if (this.state.commenterName === "" || this.state.comment === "") {
      return alert("You must provide a name and a comment.");
    } else {
      this.setState({
        commentArr: commentArrCopy,
      });

      this.clearForm();
    }
  };

  clearForm = () => {
    this.setState({
      commenterName: "",
      comment: "",
    });
  };

  addComment = () => {
    const { commentArr } = this.state;

    let keyNum = 0;

    const comments = commentArr.map((comments) => {
      return (
        <li key={keyNum++} className="comments">
          {comments.commenterName} says, "{comments.comment}"
        </li>
      );
    });

    return comments;
  };

  // checkIfShowing = () => {
  //   const { cohortCode } = this.props;

  //   let currentCode = "All Students";
  //   if (cohortCode !== currentCode) {
  //     currentCode = cohortCode;
  //     this.setState({
  //       showMore: false,
  //     });
  //   }
  // };

  render() {
    const { students } = this.props;
    const { commenterName, comment } = this.state;

    return (
      <section className="showMoreSection">
        <div className="showMoreButton" id={students.id}>
          <Button variant="dark" onClick={() => this.showInfo(students)}>
            {this.state.showMore ? "Show Less..." : "Show More..."}
          </Button>
          {this.state.showMore ? (
            <div className={this.state.showMore ? "hidden" : null}>
              <section className="ShowMoreInfo">
                <section className="codewars">
                  <strong>Codewars: </strong>
                  <br />
                  <br />
                  <p>
                    <strong className="grades">Current Total: </strong>
                    {students.codewars.current.total}
                  </p>
                  <p>
                    <strong className="grades">Last Week: </strong>
                    {students.codewars.current.lastWeek}
                  </p>
                  <p>
                    <strong className="grades">Goal: </strong>
                    {students.codewars.goal.total}
                  </p>
                  <p
                    className={this.percentColor(
                      students.codewars.current.total,
                      students.codewars.goal.total
                    )}
                  >
                    <strong className="grades">
                      Percent of Goal Achieved:{" "}
                    </strong>
                    {this.calculatePercentageOfGoal(
                      students.codewars.current.total,
                      students.codewars.goal.total
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
                    {students.cohort.scores.assessments * 100}%
                  </p>
                  <p>
                    <strong className="grades">Assignments: </strong>
                    {students.cohort.scores.assignments * 100}%
                  </p>
                  <p>
                    <strong className="grades">Projects: </strong>
                    {students.cohort.scores.projects * 100}%
                  </p>
                </section>
                <section className="certifications">
                  <strong>Certifications: </strong>
                  <br />
                  <br />
                  <p>
                    <strong className="grades">GitHub: </strong>
                    {students.certifications.github ? (
                      <img src={check} alt="checkmark"></img>
                    ) : (
                      <img src={cross} alt="crossmark"></img>
                    )}
                  </p>
                  <p>
                    <strong className="grades">LinkedIn: </strong>
                    {students.certifications.linkedin ? (
                      <img src={check} alt="checkmark"></img>
                    ) : (
                      <img src={cross} alt="crossmark"></img>
                    )}
                  </p>
                  <p>
                    <strong className="grades">Mock Interview: </strong>
                    {students.certifications.mockInterview ? (
                      <img src={check} alt="checkmark"></img>
                    ) : (
                      <img src={cross} alt="crossmark"></img>
                    )}
                  </p>
                  <p>
                    <strong className="grades">Resume: </strong>
                    {students.certifications.resume ? (
                      <img src={check} alt="checkmark"></img>
                    ) : (
                      <img src={cross} alt="crossmark"></img>
                    )}
                  </p>
                </section>
              </section>
              <section className="OneOnOneSection">
                <h1 id="OneOnOneTitle">1 on 1 Notes</h1>
                <Form id="OneOnOneForm" onSubmit={this.handleSubmit}>
                  <Form.Group className="mb-3" controlId="form-CommenterName">
                    <Form.Label>Commenter Name</Form.Label>
                    <Form.Control
                      name="commenterName"
                      type="text"
                      value={commenterName}
                      onChange={this.handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="form-Comment">
                    <Form.Label>Comment</Form.Label>
                    <Form.Control
                      name="comment"
                      type="text"
                      value={comment}
                      onChange={this.handleChange}
                    />
                  </Form.Group>
                  <Button variant="dark" type="submit">
                    Add Note
                  </Button>
                </Form>
                <ul id="commentList">{this.addComment()}</ul>
              </section>
            </div>
          ) : null}
        </div>
      </section>
    );
  }
}

export default ShowMore;
