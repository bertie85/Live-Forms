import {Component} from "react";
import React from "react";
import Label from "./Label";

// TODO create component or two with these specific tasks and leave this one alone
// it will be able to accept the event type as prop (onBlur or keyDown) and the callback handler
class Number extends Component {

  eventHandler = (e) => {
    if ("handleCustomNumber" in this.props) {
      this.props.handleCustomNumber(e);
    }
  };

  handleBlur = (e) => {
    if ("handleRangeNumber" in this.props) {
      this.props.handleRangeNumber(e);
    }
  };

  handleChange = (e) => {
    if ("getMirrorLength" in this.props) {
      this.props.getMirrorLength(e);
    }
  };

  render() {
    return (
      <div className={"question--field-wrapper"}>

        {/* Label */}
        <Label idFor={this.props.id} text={this.props.label}/>

        {/* Input */}
        <div className={"question--input-wrapper"}>
          <input className={"question--input"} type={"number"}
                 id={this.props.id}
                 onKeyDown={this.eventHandler}
                 onBlur={this.handleBlur}
                 onChange={this.handleChange}/>
        </div>
      </div>
    );
  }
}

export default Number;
