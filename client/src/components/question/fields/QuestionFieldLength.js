import {Component} from "react";
import React from "react";
import Number from "../../inputs/Number";

class QuestionFieldLength extends Component {

  updateMirror = (e) => {
    this.props.setMirrorValue(e);
  };

  render() {
    return (
      <Number id={this.props.id}
              label={this.props.label}
              getMirrorLength={this.updateMirror}/>
    )
  }
}
// TODO add support for word or character restriction as well if type is text
export default QuestionFieldLength;
