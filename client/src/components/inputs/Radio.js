import {Component} from "react";
import React from "react";
import Label from "./Label";

class Radio extends Component {

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
          <input className={"question--input"} type={"radio"} name={"radio-name"}
                 id={this.props.id}
                 onChange={this.updateMirror}
                 onBlur={this.getMirrorOptions}
          />
        </div>
      </div>
    );
  }
}

export default Radio;
