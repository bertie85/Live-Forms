import { Component } from "react";
import React from "react";

class Label extends Component {
  render() {
    return (
      <div className={"question-field--label-wrapper"}>
        <label htmlFor={this.props.idFor}>
          {this.props.text}
        </label>
      </div>
    );
  }
}

export default Label;
