import {Component} from "react";
import React from "react";
import Label from "./Label";

// TODO instead of defining text with an update mirror method, I should create a
// class called QuestionText which would have this method AND would return a <Text />
class Text extends Component {

  updateMirror = (e) => {
    if ("setMirrorValue" in this.props) {
      this.props.setMirrorValue(e);
    }
  };

  getMirrorOptions = (e) => {
    if ("getMirrorOption" in this.props) {
      const value = e.target.value || e.target.which;
      this.props.getMirrorOption(e, value, this.props.optionKey);
    }
  };

  render() {
    return (
      <div className={"question--field-wrapper"}>

        {/* Label */}
        <Label idFor={this.props.id} text={this.props.label}/>

        <div className={"question--input-wrapper"}>
          <input className={"question--input"} type={"text"}
                 id={this.props.id}
                 onChange={this.updateMirror}
                 onBlur={this.getMirrorOptions}
          />
        </div>
      </div>
    );
  }
}

export default Text;
