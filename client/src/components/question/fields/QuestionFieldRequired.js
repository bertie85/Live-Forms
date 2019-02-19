import {Component} from "react";
import React from "react";
import Label from "../../inputs/Label";

class QuestionFieldRequired extends Component {

  updateMirror = (e) => {
    this.props.setMirrorValue(e);
  };

  render() {
    return (
      <div className={"question--field-wrapper"}>

        {/* Label */}
        <Label idFor={this.props.id} text={this.props.label}/>

        <div className={"question--input-wrapper"}>
          <select className={"question--input"} id={this.props.id}
                  defaultValue={"false"} onChange={this.updateMirror}>
            <option value={"true"}>Yes</option>
            <option value={"false"}>No</option>
          </select>
        </div>
      </div>
    )
  }
}

export default QuestionFieldRequired;
