import {Component} from "react";
import React from "react";
import Number from "./Number";

// TODO will need to clean this all up: create a generic Range comp and return
// that in a more specific one for the select options fields
// TODO ability to define date or any other kind of range
class Range extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rangeStart: 0,
      rangeEnd: 0,
    };
  }

  //TODO on enter pressed, focus off - update state
  handleChange = (e) => {
    const value = e.target.value || e.target.which;

    // TODO object chain: QuestionFieldSelectType -> SelectTypeOptions -> Range -> Number

    this.props.handleChangeMain(e, value);
  };

  render() {
    // return this.state.output;
    return (
      <div className={"question--input-wrapper"}>
        <Number
          className={"question--input-wrapper-secondary"}
          id={"question-field-range-1--" + this.props.questionId}
          label={"From"}
          handleRangeNumber={this.handleChange}/>

        <Number
          className={"question--input-wrapper-secondary"}
          id={"question-field-range-2--" + this.props.questionId}
          label={"To"}
          handleRangeNumber={this.handleChange}/>
      </div>
    )
  }
}

export default Range;
